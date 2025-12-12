const BACKEND_API_URL =
  process.env.NEXT_PUBLIC_BASE_API_URL || "http://localhost:5000/api/v1";

interface FetchResult<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  status?: number;
}

interface RetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  retryOn?: number[];
}

// Default retry configuration
const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxRetries: 2,
  retryDelay: 1000,
  retryOn: [408, 429, 500, 502, 503, 504], // Request Timeout, Too Many Requests, Server Errors
};

// Helper function to determine if an error is retryable
const isRetryableError = (status: number, retryOn: number[]): boolean => {
  return retryOn.includes(status);
};

// Helper function to wait for retry delay
const wait = (ms: number): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Enhanced server fetch helper with retry logic
const serverFetchHelper = async (
  endpoint: string,
  options: RequestInit & { retryOptions?: RetryOptions },
): Promise<Response> => {
  const { headers, retryOptions = {}, ...restOptions } = options;
  const config = { ...DEFAULT_RETRY_OPTIONS, ...retryOptions };

  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= config.maxRetries; attempt++) {
    try {
      // Prepare headers with cookies for server-side requests
      const requestHeaders = new Headers(headers as HeadersInit);

      // Include cookies when running on server (server components/actions)
      if (typeof window === "undefined") {
        try {
          const { cookies: getCookies } = await import("next/headers");
          const cookieStore = await getCookies();
          const allCookies = cookieStore.getAll();
          if (allCookies.length > 0) {
            const cookieString = allCookies
              .map((c) => `${c.name}=${c.value}`)
              .join("; ");
            requestHeaders.set("Cookie", cookieString);
          }
        } catch (error) {
          // Handle cookie access errors gracefully (e.g., in middleware)
          console.warn("Failed to access cookies:", error);
        }
      }

      const response = await fetch(`${BACKEND_API_URL}${endpoint}`, {
        credentials: "include", // Send cookies automatically (client-side)
        headers: requestHeaders,
        ...restOptions,
      });

      // If successful, return the response
      if (response.ok) {
        return response;
      }

      // Handle 401 by attempting token refresh (only once per request)
      if (
        response.status === 401 &&
        endpoint !== "/auth/refresh-token" &&
        attempt === 0
      ) {
        try {
          // Try to refresh token
          const refreshResponse = await fetch(
            `${BACKEND_API_URL}/auth/refresh-token`,
            {
              method: "POST",
              credentials: "include",
            },
          );
          if (refreshResponse.ok) {
            // Token refreshed, retry the original request
            continue;
          }
        } catch (_refreshError) {
          // Refresh failed, continue with error
        }
      }

      // If not retryable or max retries reached, return the response
      if (
        !isRetryableError(response.status, config.retryOn) ||
        attempt === config.maxRetries
      ) {
        return response;
      }

      // Store the error for potential retry
      lastError = new Error(`HTTP ${response.status}: ${response.statusText}`);

      // Wait before retrying (except on the last attempt)
      if (attempt < config.maxRetries) {
        await wait(config.retryDelay * 2 ** attempt); // Exponential backoff
      }
    } catch (_error) {
      lastError = _error instanceof Error ? _error : new Error(String(_error));

      // For network errors, retry if not the last attempt
      if (attempt < config.maxRetries) {
        await wait(config.retryDelay * 2 ** attempt);
        continue;
      }

      // If this was the last attempt, throw the error
      throw lastError;
    }
  }

  // This should never be reached, but just in case
  throw lastError || new Error("Request failed after all retries");
};

// Structured response wrapper
const createStructuredResponse = async <T = unknown>(
  response: Response,
): Promise<FetchResult<T>> => {
  try {
    const data = await response.json();

    if (response.ok) {
      return {
        success: true,
        data,
        status: response.status,
      };
    } else {
      return {
        success: false,
        error: data.message || `Request failed with status ${response.status}`,
        status: response.status,
      };
    }
  } catch (_error) {
    // If JSON parsing fails, return a generic error
    return {
      success: false,
      error: "Invalid response format",
      status: response.status,
    };
  }
};

// Legacy serverFetch for backward compatibility
export const serverFetch = {
  get: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "GET" }),

  post: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "POST" }),

  put: async (endpoint: string, options: RequestInit = {}): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PUT" }),

  patch: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "PATCH" }),

  delete: async (
    endpoint: string,
    options: RequestInit = {},
  ): Promise<Response> =>
    serverFetchHelper(endpoint, { ...options, method: "DELETE" }),
};

// New structured fetch methods
export const structuredFetch = {
  get: async <T = unknown>(
    endpoint: string,
    options: RequestInit & { retryOptions?: RetryOptions } = {},
  ): Promise<FetchResult<T>> => {
    const response = await serverFetchHelper(endpoint, {
      ...options,
      method: "GET",
    });
    return createStructuredResponse<T>(response);
  },

  post: async <T = unknown>(
    endpoint: string,
    options: RequestInit & { retryOptions?: RetryOptions } = {},
  ): Promise<FetchResult<T>> => {
    const response = await serverFetchHelper(endpoint, {
      ...options,
      method: "POST",
    });
    return createStructuredResponse<T>(response);
  },

  put: async <T = unknown>(
    endpoint: string,
    options: RequestInit & { retryOptions?: RetryOptions } = {},
  ): Promise<FetchResult<T>> => {
    const response = await serverFetchHelper(endpoint, {
      ...options,
      method: "PUT",
    });
    return createStructuredResponse<T>(response);
  },

  patch: async <T = unknown>(
    endpoint: string,
    options: RequestInit & { retryOptions?: RetryOptions } = {},
  ): Promise<FetchResult<T>> => {
    const response = await serverFetchHelper(endpoint, {
      ...options,
      method: "PATCH",
    });
    return createStructuredResponse<T>(response);
  },

  delete: async <T = unknown>(
    endpoint: string,
    options: RequestInit & { retryOptions?: RetryOptions } = {},
  ): Promise<FetchResult<T>> => {
    const response = await serverFetchHelper(endpoint, {
      ...options,
      method: "DELETE",
    });
    return createStructuredResponse<T>(response);
  },
};
