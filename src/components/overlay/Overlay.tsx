import React, { MouseEventHandler, MutableRefObject, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { CloudinaryImage } from "../image/CloudinaryImage";
import useWindowDimensions from "../../utils/hooks/useWindowDimensions";
import "./Overlay.css";
import { imageClasses } from "../../utils/cloudinary/image-types";

interface OverlayProps {
  id?: string;
  src: string;
  alt: string;
  imgClassName?: string;
  imageType?: string;
  type?: string;
  text: string;
  link?: string;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
  linkClassName?: string;
  buttonClassName?: string;
  pictureRef?: any;
  cldI?: boolean;
  folders?: string;
  imageName?: string;
  children: any;
}
export const Overlay = ({
  id = "",
  src = "",
  alt = "",
  imgClassName = "",
  imageType = "listImage",
  type = "button",
  text = "",
  link = "",
  onClick = undefined,
  linkClassName = "",
  buttonClassName = "",
  pictureRef = undefined,
  children,
  cldI = false,
  folders = "",
  imageName = ""
}: OverlayProps) => {
  const [className, setClassName] = useState<string>("");
  const [imHeight, setImHeight] = useState<number>(0);
  const [imWidth, setImWidth] = useState<number>(0);

  const ref = useRef() as MutableRefObject<any>;
  const { width } = useWindowDimensions();

  let component;

  useEffect(() => {
    if (width > 0) {
      switch (imageType) {
        case "listImage":
          setClassName("Image-L");
          setImHeight(imageClasses.listImage(width).height);
          setImWidth(imageClasses.listImage(width).width);
          break;
        case "similarProduct":
          setClassName("Image-S-P");
          setImHeight(imageClasses.similarProduct(width).height);
          setImWidth(imageClasses.similarProduct(width).width);
          break;
        case "none":
          setClassName("");
          break;
        case "main.vertical":
          setImHeight(imageClasses.main.vertical(width).height);
          setImWidth(imageClasses.main.vertical(width).width);
          setClassName("");
          break;
        case "main.horizontal":
          setImHeight(imageClasses.main.horizontal(width).height);
          setImWidth(imageClasses.main.horizontal(width).width);
          setClassName("");
          break;
        default:
          setClassName("Image-L");
          break;
      }
    }
  }, [width]);

  function onFocus() {
    if (ref && ref.current) {
      ref.current.addEventListener("focus", ref.current.classList.add("Opacity-1"));
    }
  }

  function onFocusOut() {
    if (ref && ref.current) {
      ref.current.addEventListener("focusout", ref.current.classList.remove("Opacity-1"));
    }
  }

  if (type === "link") {
    component = (
      <Link to={link} className={linkClassName} onFocus={() => onFocus()} onBlur={() => onFocusOut()}>
        {text}
      </Link>
    );
  } else if (type === "button") {
    component = (
      <button onClick={onClick} className={buttonClassName} onFocus={() => onFocus()} onBlur={() => onFocusOut()}>
        {text}
      </button>
    );
  } else if (type === "text") {
    component = <p>{text}</p>;
  } else {
    component = component = <p>{text}</p>;
  }

  return (
    // eslint-disable-next-line max-len
    <div
      className={`ov-c ${imgClassName === "main.vertical" || imgClassName === "main.horizontal" ? "f-h" : ""} ${className} ${
        imgClassName ? imgClassName : ""
      } ${width < 769 ? "N-P" : " "}`}
      ref={pictureRef && pictureRef}
      id={id ? id : undefined}
    >
      {/* eslint-disable-next-line max-len */}
      <div
        className={`ov flex j-c-c a-i-c f-f-c-n f-w ${className} ${imgClassName ? imgClassName : ""} ${width < 769 ? "n-p" : " "}`}
        ref={ref}
        style={{ width: imWidth, height: imHeight }}
      >
        {component}
        {children ? children : null}
      </div>

      {cldI ? (
        <CloudinaryImage
          imageWidth={imWidth.toString()}
          imageHeight={imHeight.toString()}
          folders={folders}
          imageName={imageName}
          alt={alt}
        />
      ) : (
        <img src={src} loading="lazy" alt={alt} className={`${className} ${imgClassName}`} />
      )}
    </div>
  );
};
