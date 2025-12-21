import Image from "next/image";
import Link from "next/link";
import RegisterForm from "@/components/auth/register-form";
import SectionContainer from "@/components/shared/SectionContainer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegisterPage() {
  return (
    <SectionContainer paddingX={false} className="py-10 relative">
      <Link
        href="/"
        className="absolute top-4 left-4 text-foreground hover:text-primary transition-colors"
      >
        Back to Home
      </Link>
      <div className="flex justify-center items-center min-h-[80vh]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
          <div className="flex flex-col justify-center">
            <Card className="w-full">
              <CardHeader>
                <CardTitle className="text-2xl font-bold text-center">
                  Register
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RegisterForm />
              </CardContent>
            </Card>
          </div>
          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full h-[400px]">
              <Image
                src="/assets/login.jpg"
                alt="Register"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
