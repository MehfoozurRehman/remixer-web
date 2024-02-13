import { memo, useMemo } from "react";

import { Helmet } from "react-helmet";

const Head = memo(
  ({
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
  }) => {
    const metaTags = useMemo(() => {
      const tags = [
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
        { property: "og:type", content: type },
        { property: "og:site_name", content: siteName },
        { property: "twitter:domain", content: domain },
        { property: "twitter:card", content: card },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: image },
      ];

      return tags;
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
);

export default Head;
