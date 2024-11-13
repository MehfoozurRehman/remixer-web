import { Helmet } from "react-helmet";
import { memo } from "react";

const Head = ({ title, description, url, image, children }) => {
  const metaTags = [
    { name: "title", content: title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
    { property: "og:image", content: image },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "theme-color", content: "#000000" },
  ].filter((tag) => tag.content);

  return (
    <Helmet>
      {metaTags.map((tag, index) => (
        <meta key={index} {...tag} />
      ))}
      <link rel="icon" href={image} />
      <link rel="apple-touch-icon" href={image} />
      {children}
    </Helmet>
  );
};

export default memo(Head);
