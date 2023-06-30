import React, { useState, useEffect } from "react";
import imageInputStyles from "./ImageInput.module.css";

export const ImageInput: React.FC<{
  imgSrc: string;
  onImageUpdate: Function;
}> = (props) => {
  const [imageUrl, setImageUrl] = useState(props.imgSrc);

  useEffect(() => {
    setImageUrl(props.imgSrc);
  }, [props.imgSrc])

  const imageChangeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    if (
      (event.target as HTMLInputElement).files &&
      (event.target as HTMLInputElement).files!.length > 0
    ) {
      const file = (event.target as HTMLInputElement).files![0];
      const reader = new FileReader();

      // Set the onload event listener to handle when the file is loaded
      reader.onload = function (event) {
        let base64String: string = event.target?.result as string;

        setImageUrl(base64String); // The Base64 string representation of the image
        props.onImageUpdate(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={imageInputStyles["image-input"]}>
      <div className="mb-4 d-flex justify-content-center">
        <img src={imageUrl} alt="Product" />
      </div>
      <div className="d-flex justify-content-center">
        <div className="btn btn-primary btn-rounded">
          <label className="form-label text-white m-1" htmlFor="customFile1">
            Select picture
          </label>
          <input
            onChange={imageChangeHandler}
            accept="image/*"
            type="file"
            className="form-control d-none"
            id="customFile1"
          />
        </div>
      </div>
    </div>
  );
};
