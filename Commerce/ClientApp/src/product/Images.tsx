import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { AddAPhoto } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import SortableImageList, { Image } from "../components/SortableImageList";

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
      id: file.name,
      fileName: file.name,
      isNew: true,
    }));
    setFiles(acceptedFiles);
    setImages([...images, ...newImageFiles]);
  }

  function handleImageDelete(id: string | number) {
    setImages(images.filter((img) => img.id !== id));
    setFiles(files.filter((file) => file.name !== id));
  }

  function handleSortEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        return newOrder;
      });
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
          <SortableImageList
            onDragEnd={handleSortEnd}
            images={images}
            onDelete={handleImageDelete}
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
