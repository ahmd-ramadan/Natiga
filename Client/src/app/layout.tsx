import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 200 300 400 500 600 700 200 300 400 500 600 700 900",
});

const title = "اقْرَأ وَارْتَقِ التعليمي 👨🏻‍🎓👩🏻‍🎓";
const description = "عرض نتيجة امتحانات مركز اقْرَأ وَارْتَقِ التعليمي 👨🏻‍🎓👩🏻‍🎓";
export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: ['/favicon.ico?v=4'],
    // icon: ['/android-chrome-192*192?v=4'],
    apple: ['/apple-touch-icon.png?v=4'],
    shortcut: ['/apple-touch-icon.png']
  },
  openGraph: {
      title,
      description,
      type: 'website',
      url: process.env.NEXT_PUBLIC_DOMAIN,
      images: [{ url: "/logo.png", width: 800, height: 600, alt: 'Image description' }]
  },
  twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ["/logo.png"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
