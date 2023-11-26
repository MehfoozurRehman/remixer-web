import Helmet from "react-helmet";
import { useMemo } from "react";

export default function Head({
  title,
  description,
  url,
  image,
  children,
  type,
  siteName,
  domain,
  card,
  author,
  keywords,
  robots,
}) {
  const metaTags = useMemo(
    () =>
      [
        { name: "title", content: title },
        { name: "description", content: description },
        { name: "url", content: url },
        { name: "image", content: image },
        { name: "author", content: author },
        { name: "keywords", content: keywords },
        { name: "robots", content: robots },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:image", content: image },
        type && { property: "og:type", content: type },
        siteName && { property: "og:site_name", content: siteName },
        domain && { property: "twitter:domain", content: domain },
        card && { property: "twitter:card", content: card },
      ].filter(Boolean),
    [
      title,
      description,
      url,
      image,
      type,
      siteName,
      domain,
      card,
      author,
      keywords,
      robots,
    ]
  );

  return (
    <Helmet>
      {metaTags.map((tag, index) => (
        <meta key={tag.name || tag.property || index} {...tag} />
      ))}
      <link rel="icon" href={image} />
      <link rel="apple-touch-icon" href={image} />
      <meta name="theme-color" content="#000000" />
      {children}
    </Helmet>
  );
}
