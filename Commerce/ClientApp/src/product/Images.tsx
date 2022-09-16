import {
  Card,
  CardContent,
  ImageList,
  ImageListItem,
  Typography,
  Box,
  Grid,
} from "@mui/material";
import { minWidth } from "@mui/system";
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
    noClick: true,
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
          <Grid p="1rem" container spacing={2}>
            {images?.map((image, idx) => {
              return (
                <Grid item key={idx}>
                  <img
                    src={image.preview}
                    alt=""
                    style={{
                      width: "150px",
                      height: "150px",
                      objectFit: "cover",
                    }}
                  />
                </Grid>
              );
            })}
          </Grid>
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </CardContent>
    </Card>
  );
}
