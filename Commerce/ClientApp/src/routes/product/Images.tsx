import { AddAPhoto } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import SortableImageList, { Image } from "../../components/SortableImageList";
import { uid } from "../../utils/uid";

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
    onChange &&
      onChange(
        imgs.map((i, idx) => ({ ...i, order: idx })),
        filteredFiles
      );
  }

  function handleFileDrop(acceptedFiles: File[]) {
    if (onChange) {
      const newImages = acceptedFiles.map((file) => ({
        src: URL.createObjectURL(file),
        id: uid(),
        fileName: file.name,
        isNew: true,
      }));

      setFiles(acceptedFiles);
      const imgs = [...images, ...newImages].map((i, idx) => ({
        ...i,
        order: idx,
      }));

      onChange(imgs, [...files, ...acceptedFiles]);
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb="0.25rem">
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
                Drop image files to here
              </Typography>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
