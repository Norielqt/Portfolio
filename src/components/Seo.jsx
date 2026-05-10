import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://www.norielfulgencio.com";
const DEFAULT_IMAGE = `${SITE_URL}/NorielFulgencio_icon.jpg`;

/**
 * Per-page SEO. Drop <Seo .../> at the top of any page component.
 *
 * Props:
 *  - title:        full <title> (recommended <= 60 chars)
 *  - description:  meta description (<= 155 chars)
 *  - path:         pathname for canonical + og:url, e.g. "/services"
 *  - image:        absolute URL for og/twitter image (optional)
 *  - type:         og:type, defaults to "website"
 *  - noindex:      if true, sets robots to noindex
 *  - jsonLd:       optional object or array to inject as application/ld+json
 */
export default function Seo({
  title,
  description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noindex = false,
  jsonLd,
}) {
  const url = `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
  const ldArray = jsonLd
    ? Array.isArray(jsonLd)
      ? jsonLd
      : [jsonLd]
    : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta
        name="robots"
        content={
          noindex
            ? "noindex, nofollow"
            : "index, follow, max-image-preview:large"
        }
      />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {ldArray.map((data, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(data)}
        </script>
      ))}
    </Helmet>
  );
}
