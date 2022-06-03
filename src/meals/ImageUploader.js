import React, { useState, useCallback } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Typography } from "@material-ui/core";
import '../css/form.css';
import { useDropzone } from "react-dropzone";
import {uploadedImage, setImage} from '../UploadedImage';
import Button from '@mui/material/Button';


const ImageUploader = () => {
  const [myFiles, setMyFiles] = useState([]);
  const [clickable, setClickable] = useState(false);
  const [src, setSrc] = useState("");

  

  const onDrop = useCallback(async (acceptedFiles) => {
    if (!acceptedFiles[0]) return;

    try {
      setMyFiles([...acceptedFiles]);
      setClickable(true);
      handlePreview(acceptedFiles);
      console.log(acceptedFiles[0])
      setImage(acceptedFiles[0])
      console.log(uploadedImage)
    } catch (error) {
      alert(error);
    }
  }, []);

  const onDropRejected = () => {
    alert("画像のみ受け付けることができます。");
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    onDropRejected,
  });

  const handlePreview = (files) => {
    if (files === null) {
      return;
    }
    const file = files[0];
    if (file === null) {
      return;
    }

    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSrc(reader.result);
    };

    console.log(reader.result)
  };

  return (
    <div {...getRootProps()}>
      <input name="image" {...getInputProps()} />
      {myFiles.length === 0 ? (
        <Button>アップロード</Button>
      ) : (
        <div class="image_uploader">
          {myFiles.map((file) => (
            <React.Fragment key={file.name}>
              <img src={src} />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
export default ImageUploader;