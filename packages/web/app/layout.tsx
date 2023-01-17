import Script from 'next/script';

import './global.scss';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <head>
        <script src="flexible.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
