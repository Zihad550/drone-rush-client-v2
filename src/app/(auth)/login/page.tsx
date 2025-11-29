import LoginForm from "@/components/auth/login-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="flex flex-col justify-center">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Login
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LoginForm />
              </CardContent>
            </Card>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-[400px]">
              <Image
                src="/assets/login.jpg"
                alt="Login"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
