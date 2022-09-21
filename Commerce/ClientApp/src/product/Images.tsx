import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { AddAPhoto } from "@mui/icons-material";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import SortableImageList, { Image } from "../components/SortableImageList";

interface props {
  defaultImages: Image[];
}

export default function Images({ defaultImages }: props) {
  const { setValue, register } = useFormContext();
  const [images, setImages] = useState<Image[]>(defaultImages);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    noClick: true,
    onDrop: (acceptedFiles) => {
      const newImageFiles = acceptedFiles.map((file) => ({
        src: URL.createObjectURL(file),
        id: file.name,
        fileName: file.name,
        isNew: true,
      }));
      setValue("imageFiles", acceptedFiles);
      setImages([...images, ...newImageFiles]);
      const oldImges = images.map((img, idx) => ({
        ...img,
        id: 0,
        order: idx,
      }));
      const newImages = newImageFiles.map((img, idx) => ({
        ...img,
        id: 0,
        order: idx,
      }));

      console.log([...oldImges, ...newImages]);

      setValue("images", [...oldImges, ...newImages]);
    },
  });

  function handleSortEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);
        const newOrder = arrayMove(items, oldIndex, newIndex);
        setValue(
          "images",
          newOrder.map((img, idx) => ({ ...img, id: 0, order: idx }))
        );
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
          <input {...getInputProps()} {...register("imageFiles")} />
          <SortableImageList onDragEnd={handleSortEnd} images={images} />
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
