import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";

export default function Images() {
  const { setValue, register } = useFormContext();
  const [images, setImages] = useState<any[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      setValue("images", acceptedFiles);
      setImages([...images, ...newImages]);
    },
  });

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" mb="0.25rem">
          Images
        </Typography>
        <div {...getRootProps()} style={{ border: "1px dashed #ccc" }}>
          <input {...getInputProps()} {...register("images")} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>

        {images?.map((image, idx) => {
          return (
            <img
              key={idx}
              src={image.preview}
              alt=""
              style={{ width: "200px", height: "200px", objectFit: "cover" }}
            />
          );
        })}
      </CardContent>
    </Card>
  );
}
