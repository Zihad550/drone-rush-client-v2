import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import ForgotPasswordForm from "@/components/auth/forgot-password-form";
import SectionContainer from "@/components/shared/SectionContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ForgotPasswordPage() {
  return (
    <SectionContainer
      paddingX={false}
      className="py-10 relative bg-gradient-to-br from-background to-muted/20 min-h-screen"
    >
      <Link
        href="/login"
        className="absolute top-4 left-4 flex items-center text-foreground hover:text-primary transition-all duration-200 hover:scale-105"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Login
      </Link>
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="flex flex-col justify-center">
            <Card className="w-full shadow-lg border-0 bg-gradient-to-br from-card to-card/95 transition-all duration-300 hover:shadow-xl hover:scale-[1.01]">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Forgot Password
                </CardTitle>
                <p className="text-muted-foreground mt-2">
                  No worries! Enter your email and we'll send you reset
                  instructions.
                </p>
              </CardHeader>
              <CardContent>
                <ForgotPasswordForm />
              </CardContent>
            </Card>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-[400px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg flex items-center justify-center overflow-hidden">
              <svg
                viewBox="0 0 400 300"
                className="w-full h-full max-w-sm max-h-64"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-labelledby="forgot-password-illustration"
              >
                <title id="forgot-password-illustration">
                  Illustration of password reset email
                </title>
                <rect
                  x="50"
                  y="80"
                  width="300"
                  height="180"
                  rx="20"
                  fill="currentColor"
                  className="text-muted-foreground/20"
                />
                <path
                  d="M100 120 L200 140 L300 120 L300 220 L100 220 Z"
                  fill="currentColor"
                  className="text-muted-foreground/30"
                />
                <circle
                  cx="200"
                  cy="160"
                  r="20"
                  fill="currentColor"
                  className="text-primary"
                />
                <path
                  d="M190 150 L200 170 L210 150"
                  stroke="currentColor"
                  strokeWidth="3"
                  className="text-card"
                />
                <path
                  d="M150 100 L150 70 L180 70 L180 100"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  className="text-primary"
                />
                <circle
                  cx="180"
                  cy="60"
                  r="8"
                  fill="currentColor"
                  className="text-primary"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
