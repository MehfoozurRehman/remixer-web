import { Helmet } from "react-helmet";
import { memo } from "react";

const Head = ({ title, description, url, image, children }) => (
  <Helmet>
    <meta name="title" content={title} />
    <meta name="description" content={description} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:image" content={image} />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:image" content={image} />
    <link rel="icon" href={image} />
    <link rel="apple-touch-icon" href={image} />
    <meta name="theme-color" content="#000000" />
    {children}
  </Helmet>
);

export default memo(Head);
