import { Image, Placeholder, Transformation } from "cloudinary-react";
import { useEffect, useState } from "react";

interface CloudinaryImageProps {
  alt: string;
  folders: string;
  imageHeight: string;
  imageName: string;
  imageWidth: string;
}

export const CloudinaryImage = ({ alt, folders, imageHeight, imageName, imageWidth }: CloudinaryImageProps) => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    setHeight(imageHeight);
    setWidth(imageWidth);
  }, [imageHeight, imageWidth]);

  if (imageHeight && imageWidth) {
    return (
      <Image publicId={`ChatiZZe/${folders}/${imageName}`} secure alt={alt} loading="lazy">
        <Transformation rawTransformation={`w_${width ? width : "auto"},h_${height ? height : "auto"},c_fill`} />
        <Placeholder type="blur" />
      </Image>
    );
  }

  return null;
};
