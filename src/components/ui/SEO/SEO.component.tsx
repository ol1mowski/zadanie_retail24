import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
  const location = useLocation();
  const currentPath = `${location.pathname}${location.search}${location.hash}`;

  const defaultOgTitle = ogTitle || title;
  const defaultOgDescription = ogDescription || description;
  const defaultTwitterTitle = twitterTitle || title;
  const defaultTwitterDescription = twitterDescription || description;
  const defaultOgUrl = ogUrl || currentPath;
  const defaultCanonicalUrl = canonicalUrl || currentPath;

  useEffect(() => {
    document.title = title;

    const updateMetaTag = (
      name: string,
      content: string,
      property?: string
    ) => {
      const selector = property
        ? `meta[property="${property}"]`
        : `meta[name="${name}"]`;
      let meta = document.querySelector(selector) as HTMLMetaElement;

      if (!meta) {
        meta = document.createElement('meta');
        if (property) {
          meta.setAttribute('property', property);
        } else {
          meta.setAttribute('name', name);
        }
        document.head.appendChild(meta);
      }

      meta.setAttribute('content', content);
    };

    updateMetaTag('description', description);
    if (keywords) {
      updateMetaTag('keywords', keywords);
    }

    updateMetaTag('og:title', defaultOgTitle, 'og:title');
    updateMetaTag('og:description', defaultOgDescription, 'og:description');
    updateMetaTag('og:type', ogType, 'og:type');
    updateMetaTag('og:url', defaultOgUrl, 'og:url');

    updateMetaTag('twitter:card', twitterCard, 'twitter:card');
    updateMetaTag('twitter:title', defaultTwitterTitle, 'twitter:title');
    updateMetaTag(
      'twitter:description',
      defaultTwitterDescription,
      'twitter:description'
    );

    if (noIndex) {
      updateMetaTag('robots', 'noindex, nofollow');
    }

    if (canonicalUrl) {
      let canonical = document.querySelector(
        'link[rel="canonical"]'
      ) as HTMLLinkElement;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', defaultCanonicalUrl);
    }

    return () => {
      document.title = 'Stopwatch App';
    };
  }, [
    title,
    description,
    keywords,
    defaultOgTitle,
    defaultOgDescription,
    ogType,
    defaultOgUrl,
    twitterCard,
    defaultTwitterTitle,
    defaultTwitterDescription,
    noIndex,
    defaultCanonicalUrl,
    canonicalUrl,
  ]);

  return null;
};
