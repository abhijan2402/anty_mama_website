import "./globals.css";
import ReduxProvider from "./providers/ReduxProvider";
import { AuthProvider } from "./providers/AuthProvider";
import { BrandProvider } from "./providers/BrandProvider";
import { CartProvider } from "./providers/CartProvider";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>
          <AuthProvider>
            <BrandProvider>
              <CartProvider>
                {children}
                <Toaster richColors position="top-right" />
              </CartProvider>
            </BrandProvider>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
