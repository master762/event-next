import "./globals.css";

// const manrope = Manrope({
//   subsets: ["cyrillic", "latin"],
//   weight: ["400", "500", "600", "700"],
// });

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <head>
        <title>project</title>
        <link rel="icon" href="/logo.svg" />
      </head>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
