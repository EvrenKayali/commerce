import { AddAPhoto } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import SortableImageList, { Image } from "../components/SortableImageList";
import { uid } from "../utils/uid";

interface props {
  defaultImages: Image[];
  onChange?: (files: File[]) => void;
}

export default function Images({ defaultImages }: props) {
  const { setValue } = useFormContext();
  const [images, setImages] = useState<Image[]>(defaultImages);
  const [files, setFiles] = useState<File[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    noClick: true,
    onDrop: handleFileDrop,
  });

  useEffect(() => {
    setValue("imageFiles", files);
    setValue(
      "images",
      images.map((img, idx) => ({ ...img, id: 0, order: idx }))
    );
  }, [files, images, setValue]);

  function handleFileDrop(acceptedFiles: File[]) {
    const newImageFiles = acceptedFiles.map((file) => ({
      src: URL.createObjectURL(file),
      id: uid(),
      fileName: file.name,
      isNew: true,
    }));
    setFiles(acceptedFiles);
    setImages([...images, ...newImageFiles]);
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" mb="0.25rem">
          Images
        </Typography>
        <div
          {...getRootProps()}
          style={{
            border: "1px dashed #ccc",
            padding: Boolean(images.length) ? "0" : "2rem",
          }}
        >
          <input {...getInputProps()} />
          <SortableImageList
            onChange={(imgs) => setImages(imgs)}
            onDragEnd={(imgs) => setImages(imgs)}
            images={images}
          />
          {Boolean(images.length) || (
            <>
              <Box display="flex" justifyContent="center" alignItems="center">
                <AddAPhoto sx={{ fontSize: "10rem" }} color="primary" />
              </Box>
              <Typography variant="body2" textAlign={"center"}>
                Drag and drop images files to add new photes
              </Typography>
            </>
          )}
        </div>
        <ul>
          {files.map((f) => (
            <li key={f.name}>{f.name}</li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
