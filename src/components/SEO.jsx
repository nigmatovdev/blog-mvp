import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title, 
  description, 
  image = '/og-image.jpeg', // Default OG image
  type = 'website',
  pathname
}) => {
  const siteUrl = import.meta.env.VITE_SITE_URL || 'https://otabekmahkamov.com';
  const canonicalUrl = pathname ? `${siteUrl}${pathname}` : siteUrl;
  const siteTitle = 'Otabek Mahkamov';
  const pageTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      {/* Basic meta tags */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:site_name" content={siteTitle} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={`${siteUrl}${image}`} />
      <meta property="og:image:alt" content={pageTitle} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${image}`} />

      {/* Additional meta tags */}
      <meta name="robots" content="index,follow" />
      <meta name="googlebot" content="index,follow" />
    </Helmet>
  );
};

export default SEO; 