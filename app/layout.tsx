import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@/components/Analytics";
import { Anton, Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-lando",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-tech",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kanisius Bagaskara | ML Engineer & Data Scientist",
  description: "Machine Learning Engineer building real-time F1 analytics and production ML systems. Google Student Ambassador, Stanford ML Certified, passionate about AI education.",
  keywords: ["Machine Learning Engineer", "Data Scientist", "F1 Analytics", "Google Student Ambassador", "Python", "PyTorch", "TensorFlow", "MLOps", "AI", "Deep Learning", "Indonesia"],
  authors: [{ name: "Kanisius Bagaskara", url: "https://github.com/maxvyquincy9393" }],
  creator: "Kanisius Bagaskara",
  publisher: "Kanisius Bagaskara",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kanisiusbagas.vercel.app",
    siteName: "Kanisius Bagaskara Portfolio",
    title: "Kanisius Bagaskara | ML Engineer & Data Scientist",
    description: "Building real-time F1 analytics and production ML systems. Google Student Ambassador, Stanford ML Certified.",
    images: [
      {
        url: "/assets/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kanisius Bagaskara - ML Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanisius Bagaskara | ML Engineer & Data Scientist",
    description: "Building real-time F1 analytics and production ML systems. Google Student Ambassador.",
    images: ["/assets/og-image.jpg"],
    creator: "@maxquincy18",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://kanisiusbagas.vercel.app",
  },
  category: "technology",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050505",
  colorScheme: "dark",
};

// Schema.org JSON-LD
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://kanisiusbagas.vercel.app/#person",
      name: "Kanisius Bagaskara",
      givenName: "Kanisius",
      familyName: "Bagaskara",
      jobTitle: "Machine Learning Engineer",
      description: "Machine Learning Engineer building real-time F1 analytics and production ML systems. Google Student Ambassador.",
      url: "https://kanisiusbagas.vercel.app",
      image: "https://kanisiusbagas.vercel.app/assets/profile.jpg",
      email: "mailto:maxvy1218@gmail.com",
      telephone: "+6285183268643",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Tangerang",
        addressCountry: "Indonesia",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Universitas Pamulang",
        },
        {
          "@type": "EducationalOrganization",
          name: "Stanford University",
          sameAs: "https://www.stanford.edu",
        },
      ],
      worksFor: {
        "@type": "Organization",
        name: "Google",
        sameAs: "https://www.google.com",
      },
      sameAs: [
        "https://github.com/maxvyquincy9393",
        "https://linkedin.com/in/kanisiusbagas1212",
        "https://x.com/maxquincy18",
      ],
      knowsAbout: [
        "Machine Learning",
        "Deep Learning",
        "Data Science",
        "Python",
        "PyTorch",
        "TensorFlow",
        "MLOps",
        "F1 Analytics",
        "Computer Vision",
        "Natural Language Processing",
      ],
      award: [
        "Google Student Ambassador Top 200",
        "Stanford Machine Learning Specialization",
        "Google Gemini Certified Educator",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://kanisiusbagas.vercel.app/#website",
      url: "https://kanisiusbagas.vercel.app",
      name: "Kanisius Bagaskara Portfolio",
      description: "Portfolio of Kanisius Bagaskara - ML Engineer & Data Scientist",
      publisher: {
        "@id": "https://kanisiusbagas.vercel.app/#person",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://kanisiusbagas.vercel.app/#webpage",
      url: "https://kanisiusbagas.vercel.app",
      name: "Kanisius Bagaskara | ML Engineer & Data Scientist",
      isPartOf: {
        "@id": "https://kanisiusbagas.vercel.app/#website",
      },
      about: {
        "@id": "https://kanisiusbagas.vercel.app/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en" 
      className={`${anton.variable} ${spaceGrotesk.variable} ${inter.variable} scroll-smooth`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased bg-[#050505] text-white overflow-x-hidden">
        {children}
        <GoogleAnalytics />
      </body>
    </html>
  );
}
