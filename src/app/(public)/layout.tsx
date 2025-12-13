import Footer from "@/components/shared/footer/footer";
import NavBar from "@/components/shared/nav-bar/nav-bar";
import { Toaster } from "@/components/ui/sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavBar />
      {children}
      <Toaster />
      <Footer />
    </div>
  );
}
