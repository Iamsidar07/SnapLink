export const validateURL = (url) => {
  const urlPattern = new RegExp(
    /^(?:http|https?):\/\/(?:\w+\.)+\w{2,}(?:\/\S*)?$/i,
  );

  return urlPattern.test(url);
};

export function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const month = months[monthIndex];
  return `${day} ${month}`;
}
export function constructMetadata({
  title = "Simple and Fast URL 🔗 Shortner",
  description = "ShortURL is a free tool to shorten URLs and generate short links URL shortener allows to create a shortened link making it easy to share",
  image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}) {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "Snaplink",
      images: [
        {
          url: image,
          width: 1024,
          height: 1024
        },
      ],
      locale: "en-US",
      type: "website"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
      creator: "@iamsidar07",
    },
    icons,
    metadataBase: new URL("https://snaplink-xegc.vercel.app"),
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
