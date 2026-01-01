"use client";

import { useState, useEffect } from "react";
import Image, { ImageProps } from "next/image";

interface ProjectImageProps extends Omit<ImageProps, "src" | "onError"> {
  src: string | null | undefined;
}

const DEFAULT_PROJECT_IMAGE = "/images/projects/default_project.png";

export default function ProjectImage({ src, alt, ...props }: ProjectImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(DEFAULT_PROJECT_IMAGE);

  useEffect(() => {
    if (src && src.trim() !== "") {
      setImgSrc(src);
    } else {
      setImgSrc(DEFAULT_PROJECT_IMAGE);
    }
  }, [src]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt}
      onError={() => {
        if (imgSrc !== DEFAULT_PROJECT_IMAGE) {
          setImgSrc(DEFAULT_PROJECT_IMAGE);
        }
      }}
    />
  );
}
