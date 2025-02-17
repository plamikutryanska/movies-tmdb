import "./globals.css";
import { MoviesProvider } from "./context/MoviesContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
          <div className="min-h-screen flex flex-col">
            <header className="sticky top-0 bg-white shadow-md z-10 py-6 text-center text-xl font-semibold">Movies TMDB</header>
            <MoviesProvider>
              <main className="flex-grow p-6 bg-customGradient">{children}</main>
            </MoviesProvider>
            <footer className="bg-white p-4  text-center">© 2025 Movies TMDB</footer>
          </div>
      </body>
    </html>
  );
}
