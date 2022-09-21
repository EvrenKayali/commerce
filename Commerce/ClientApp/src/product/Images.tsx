import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Card, CardContent, Typography } from "@mui/material";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import SortableImageList, { Image } from "../components/SortableImageList";

export default function Images() {
  const { setValue, register } = useFormContext();

  const [images, setImages] = useState<Image[]>([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    noClick: true,
    onDrop: (acceptedFiles) => {
      const newImages = acceptedFiles.map((file) => ({
        src: URL.createObjectURL(file),
        id: file.name,
      }));
      setValue("images", acceptedFiles);
      setImages([...images, ...newImages]);
    },
  });

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" mb="0.25rem">
          Images
        </Typography>
        <div {...getRootProps()} style={{ border: "1px dashed #ccc" }}>
          <input {...getInputProps()} {...register("images")} />
          <SortableImageList onDragEnd={handleDragEnd} images={[...images]} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </CardContent>
    </Card>
  );
}
