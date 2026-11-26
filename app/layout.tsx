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
  metadataBase: new URL('https://kanisius.dev'),
  title: "Kanisius Bagaskara | ML Engineer & Data Scientist",
  description: "ML Engineer & Data Scientist building real-time F1 analytics, ML systems, web applications, and 3D vision. Based in Jakarta, Indonesia.",
  keywords: ["Machine Learning Engineer", "Data Scientist", "F1 Analytics", "Python", "PyTorch", "MLOps", "AI", "Deep Learning", "Indonesia", "Real-time Analytics", "Computer Vision", "NLP", "TypeScript", "Next.js", "Supabase", "3D Reconstruction", "Kanisius Bagaskara"],
  authors: [{ name: "Kanisius Bagaskara", url: "https://github.com/knsiuss" }],
  creator: "Kanisius Bagaskara",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://kanisius.dev",
    siteName: "Kanisius Bagaskara Portfolio",
    title: "Kanisius Bagaskara | ML Engineer & Data Scientist",
    description: "ML Engineer & Data Scientist building real-time F1 analytics, ML systems, web applications, and 3D vision. Deep Learning researcher and AI educator.",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kanisius Bagaskara, Machine Learning Engineer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    creator: "@grey_stardust",
    title: "Kanisius Bagaskara | ML Engineer & Data Scientist",
    description: "ML Engineer & Data Scientist building real-time F1 analytics, ML systems, web applications, and 3D vision.",
    images: ["/opengraph-image"],
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
  themeColor: [
    { media: '(prefers-color-scheme: dark)', color: '#282c20' },
    { media: '(prefers-color-scheme: light)', color: '#f4f4ed' },
  ],
  colorScheme: 'dark light',
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
      description: "ML Engineer & Data Scientist building real-time F1 analytics, ML systems, web applications, and 3D vision.",
      url: "https://kanisius.dev",
      image: "https://kanisius.dev/logo.svg",
      email: "mailto:kanisius@novar.me",
      // Phone number intentionally omitted — it would be published in public JSON-LD
      // and trivially scraped by bots/spam. Email + LinkedIn are sufficient for contact.
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
      sameAs: [
        "https://github.com/knsiuss",
        "https://linkedin.com/in/kanisiusbagas1212",
        "https://huggingface.co/knss12",
        "https://x.com/grey_stardust",
        "https://www.instagram.com/p_knsss/",
      ],
      knowsAbout: [
        "Machine Learning",
        "Deep Learning",
        "Data Science",
        "Python",
        "PyTorch",
        "MLOps",
        "F1 Analytics",
        "Computer Vision",
        "Natural Language Processing",
        "TypeScript",
        "Next.js",
        "Supabase",
        "3D Reconstruction",
      ],
      award: [
        "Rising Star Top 100",
        "Stanford Machine Learning Specialization",
        "Google Gemini Certified Educator",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://kanisius.dev/#website",
      url: "https://kanisius.dev",
      name: "Kanisius Bagaskara Portfolio",
      description: "Portfolio of Kanisius Bagaskara, ML Engineer and Data Scientist",
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
      className={`${anton.variable} ${spaceGrotesk.variable} ${inter.variable}`}
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

