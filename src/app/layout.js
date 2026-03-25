import "./globals.css";

export const metadata = {
  title: "paste. — drop your code, grab a link",
  description: "Minimal paste bin. Share HTML snippets with a single cinematic link.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
