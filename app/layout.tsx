import type { Metadata, Viewport } from "next";
import { GoogleAnalytics } from "@/components/Analytics";
import BackToTop from "@/components/ui/BackToTop";
import { ThemeProvider } from "@/components/ThemeProvider";
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
  description: "ML Engineer & Data Scientist specializing in real-time F1 analytics, deep learning, and production MLOps pipelines. Google Student Ambassador Top 200. Based in Jakarta, Indonesia.",
  keywords: ["Machine Learning Engineer", "Data Scientist", "F1 Analytics", "Google Student Ambassador", "Python", "PyTorch", "TensorFlow", "MLOps", "AI", "Deep Learning", "Indonesia", "Real-time Analytics", "Computer Vision", "NLP", "Kanisius Bagaskara"],
  authors: [{ name: "Kanisius Bagaskara", url: "https://github.com/knsiuss" }],
  creator: "Kanisius Bagaskara",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kanisius.dev",
    siteName: "Kanisius Bagaskara Portfolio",
    title: "Kanisius Bagaskara | ML Engineer & Data Scientist",
    description: "Machine Learning Engineer building real-time F1 analytics and scalable ML architectures. Deep Learning researcher, Google Student Ambassador, and AI educator.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Kanisius Bagaskara - Machine Learning Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanisius Bagaskara | ML Engineer & Data Scientist",
    description: "Machine Learning Engineer building real-time F1 analytics and scalable ML architectures.",
    images: ["/og-image.jpg"],
    creator: "@maxquincy18",
  },
  verification: {
    google: "hqAZ8rtWx92tpMkiCwDi6imswCTZ7WLBq_lVDUnlpJE",
  },
  alternates: {
    canonical: "https://kanisius.dev",
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
      "@id": "https://kanisius.dev/#person",
      name: "Kanisius Bagaskara",
      givenName: "Kanisius",
      familyName: "Bagaskara",
      jobTitle: "Machine Learning Engineer",
      description: "Machine Learning Engineer building real-time F1 analytics and production ML systems. Google Student Ambassador.",
      url: "https://kanisius.dev",
      image: "https://kanisius.dev/assets/profile.jpg",
      email: "mailto:maxvy1218@gmail.com",
      telephone: "+6285183268643",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Jakarta",
        addressCountry: "Indonesia",
      },
      alumniOf: [
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
        "https://github.com/knsiuss",
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
      "@id": "https://kanisius.dev/#website",
      url: "https://kanisius.dev",
      name: "Kanisius Bagaskara Portfolio",
      description: "Portfolio of Kanisius Bagaskara - ML Engineer & Data Scientist",
      publisher: {
        "@id": "https://kanisius.dev/#person",
      },
    },
    {
      "@type": "WebPage",
      "@id": "https://kanisius.dev/#webpage",
      url: "https://kanisius.dev",
      name: "Kanisius Bagaskara | ML Engineer & Data Scientist",
      isPartOf: {
        "@id": "https://kanisius.dev/#website",
      },
      about: {
        "@id": "https://kanisius.dev/#person",
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
      suppressHydrationWarning
    >
      <head>
        <meta name="google-site-verification" content="hqAZ8rtWx92tpMkiCwDi6imswCTZ7WLBq_lVDUnlpJE" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased bg-background text-foreground overflow-x-hidden transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
          <BackToTop />
          <GoogleAnalytics />
        </ThemeProvider>
      </body>
    </html>
  );
}

