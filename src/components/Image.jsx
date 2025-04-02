import { IKImage } from "imagekitio-react";

export default function Image({ src, className, w, h, alt }) {
  // console.log("ImageKit URL Endpoint:", import.meta.env.VITE_IK_URL_ENDPOINT);
  return (
    <IKImage
      urlEndpoint={import.meta.env.VITE_IK_URL_ENDPOINT}
      src={src}
      className={className}
      loading="lazy"
      lqip={{ active: true, quality: 20 }}
      alt={alt}
      width={w}
      height={h}
      transformation={[
        {
          width: w,
          height: h,
        },
      ]}
    />
  );
}
