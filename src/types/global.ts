export interface IOption {
  value: string | number;
  label: string;
}

export interface IError {
  data: {
    message: string;
    stack?: string;
    success: boolean;
  };
  status: number;
}

export interface IMeta {
  limit: number;
  page: number;
  total: number;
  totalPage: number;
}

export interface IResponse<T> {
  data?: T;
  meta?: IMeta;
  error?: IError;
  success: boolean;
  message: string;
}

export interface IQueryParam {
  name: string;
  value: boolean | React.Key;
}
