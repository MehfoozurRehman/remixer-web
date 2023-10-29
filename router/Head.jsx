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
  const metaData = useMemo(() => {
    const metaArray = [
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
    ];

    if (type) metaArray.push({ property: "og:type", content: type });
    if (siteName)
      metaArray.push({ property: "og:site_name", content: siteName });
    if (domain) metaArray.push({ property: "twitter:domain", content: domain });
    if (card) metaArray.push({ property: "twitter:card", content: card });

    return metaArray;
  }, [
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
  ]);

  return (
    <Helmet>
      {metaData
        .filter((meta) => meta.content)
        .map((meta, index) => (
          <meta key={meta.name || meta.property || index} {...meta} />
        ))}
      <link rel="icon" href={image} />
      <link rel="apple-touch-icon" href={image} />
      <meta name="theme-color" content="#000000" />
      {children}
    </Helmet>
  );
}
