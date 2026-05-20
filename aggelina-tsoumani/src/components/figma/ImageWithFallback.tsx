"use client";

import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  style,
}: ImageWithFallbackProps) {
  const [errored, setErrored] = useState(false);
  const fallback = `https://placehold.co/800x600/EDEAE4/8B7B6A?text=${encodeURIComponent(alt)}`;

  return (
    <img
      src={errored ? fallback : src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setErrored(true)}
    />
  );
}
