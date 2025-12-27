"use client";

import { useState, useEffect } from "react";
import { useLazyLoad } from "@/hooks/useLazyLoad";

interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
  onLoad?: () => void;
}

export default function LazyImage({
  src,
  alt,
  placeholder,
  className = "",
  onLoad
}: LazyImageProps) {
  const { elementRef, isLoaded } = useLazyLoad();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isLoaded) {
      onLoad?.();
    }
  }, [isLoaded, onLoad]);

  return (
    <img
      ref={elementRef}
      data-src={src}
      src={placeholder || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E"}
      alt={alt}
      className={`transition-all duration-300 ${
        isLoaded ? "blur-0" : "blur-sm"
      } ${error ? "opacity-50" : ""} ${className}`}
      onError={() => setError(true)}
    />
  );
}
