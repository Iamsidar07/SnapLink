const config = {
  domain: process.env.NEXT_PUBLIC_DOMAIN,
  mongodbUri: process.env.MONGODB_URI,
  productHuntBadge:
    "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=453724&theme=dark",
  dubMetatagEndpointUrl: "https://app.dub.co/api/metatags",
  locationEndpoint: "https://ipapi.co/json/",
  googleClientSecret: process.env.GOOGLE_SECRET,
  googleClientId: process.env.GOOGLE_ID,
};

export default config;
