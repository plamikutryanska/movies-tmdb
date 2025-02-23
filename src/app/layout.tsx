'use client'
import "./globals.css";
import { MoviesProvider } from "./context/MoviesContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <div className="min-h-screen flex flex-col">
            <header className="header">Movies TMDB</header>
            <QueryClientProvider client={queryClient}>
              <MoviesProvider>
                <main className="flex-grow p-6 bg-customGradient">{children}</main>
              </MoviesProvider>
            </QueryClientProvider>
            <footer className="bg-white p-4  text-center">© 2025 Movies TMDB</footer>
          </div>
      </body>
    </html>
  );
}
