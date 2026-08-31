import React, { useState } from "react";

export type ImageContext =
  | "mausoleum"
  | "chapel"
  | "park"
  | "service"
  | "product"
  | "family"
  | "general";

const CONTEXT_FALLBACKS: Record<ImageContext, string> = {
  mausoleum: "/images/memorial_estate_card_1778053361538.png",
  chapel: "/images/chapel.jpg",
  park: "/images/hero-park.jpg",
  service: "/images/hero_funeral_services_1778053324342.png",
  product: "/images/flowers.jpg",
  family: "/images/family-comfort.jpg",
  general: "/images/og-capetrust.png",
};

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  context?: ImageContext;
  fallbackSrc?: string;
}

export function SafeImage({
  src,
  alt = "",
  context = "general",
  fallbackSrc,
  className,
  onError,
  ...props
}: SafeImageProps) {
  const defaultFallback = fallbackSrc || CONTEXT_FALLBACKS[context] || CONTEXT_FALLBACKS.general;
  const [imgSrc, setImgSrc] = useState<string>(src || defaultFallback);
  const [hasError, setHasError] = useState<boolean>(false);

  // Update image source if prop changes
  React.useEffect(() => {
    setImgSrc(src || defaultFallback);
    setHasError(false);
  }, [src, defaultFallback]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    if (!hasError) {
      setHasError(true);
      setImgSrc(defaultFallback);
    }
    if (onError) {
      onError(e);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
}
