import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogType?: string;
  ogUrl?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  noIndex?: boolean;
  canonicalUrl?: string;
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  keywords,
  ogTitle,
  ogDescription,
  ogType = 'website',
  ogUrl,
  twitterCard = 'summary',
  twitterTitle,
  twitterDescription,
  noIndex = false,
  canonicalUrl,
}) => {
  const defaultOgTitle = ogTitle || title;
  const defaultOgDescription = ogDescription || description;
  const defaultTwitterTitle = twitterTitle || title;
  const defaultTwitterDescription = twitterDescription || description;
  const defaultOgUrl = ogUrl || window.location.href;
  const defaultCanonicalUrl = canonicalUrl || window.location.href;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonicalUrl && <link rel="canonical" href={defaultCanonicalUrl} />}

      {/* Open Graph */}
      <meta property="og:title" content={defaultOgTitle} />
      <meta property="og:description" content={defaultOgDescription} />
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={defaultOgUrl} />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={defaultTwitterTitle} />
      <meta name="twitter:description" content={defaultTwitterDescription} />

      {/* Robots */}
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
    </Helmet>
  );
};
