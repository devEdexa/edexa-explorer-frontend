import React, { useState, useEffect } from "react";
import { Image } from "@chakra-ui/react";

const AutoRotateImage = () => {
  const [imageIndex, setImageIndex] = useState(0);
  const images: any = [
    "https://edexa-general.s3.ap-south-1.amazonaws.com/adsBlue.png",
    "https://edexa-general.s3.ap-south-1.amazonaws.com/adsWhite.png",
  ]; // Replace with your actual image URLs

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Change the image every 5 seconds
      setImageIndex((prevIndex: any) => (prevIndex + 1) % images.length);
    }, 5000);

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [imageIndex]); // Empty dependency array ensures the effect runs only once on mount

  const openImageLink = () => {
    const link = "https://presale.edexa.io/"; // Replace with the actual link
    window.open(link, "_blank", "noopener noreferrer");
  };

  return (
    <Image
      src={images[imageIndex]}
      alt={`Image ${imageIndex + 1}`}
      onClick={() => openImageLink()}
      style={{ cursor: "pointer" }}
    />
  );
};

export default AutoRotateImage;
