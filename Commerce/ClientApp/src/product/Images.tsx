import { AddAPhoto } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import SortableImageList, { Image } from "../components/SortableImageList";
import { uid } from "../utils/uid";

interface props {
  images: Image[];
  onChange?: (images: Image[], files?: File[]) => void;
}

export default function Images({ images, onChange }: props) {
  const [files, setFiles] = useState<File[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    noClick: true,
    onDrop: handleFileDrop,
  });

  function handleImageChange(imgs: Image[]) {
    const imgFileNames = imgs.map((img) => img.fileName);
    const filteredFiles = files.filter((f) => imgFileNames.includes(f.name));
    onChange && onChange(imgs, filteredFiles);
  }

  function handleFileDrop(acceptedFiles: File[]) {
    if (onChange) {
      const newImageFiles = acceptedFiles.map((file) => ({
        src: URL.createObjectURL(file),
        id: uid(),
        fileName: file.name,
        isNew: true,
      }));
      setFiles(acceptedFiles);
      onChange([...images, ...newImageFiles], acceptedFiles);
    }
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
          <SortableImageList onChange={handleImageChange} images={images} />
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
      </CardContent>
    </Card>
  );
}
