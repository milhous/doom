import './global.scss';
import {getCurLang} from '@libs/i18n/server';

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  const lng = getCurLang();

  return (
    <html lang={lng}>
      <head>
        <script src="/flexible.js" defer />
      </head>
      <body>{children}</body>
    </html>
  );
}
