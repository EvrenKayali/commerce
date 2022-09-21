import { DragEndEvent } from "@dnd-kit/core";
import { Card, CardContent, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";
import { useFormContext } from "react-hook-form";
import SortableImageList, { Image } from "../components/SortableImageList";

interface props {
  images: Image[];
  onFileDrop: (files: Image[]) => void;
  onSortingEnd: (event: DragEndEvent) => void;
}

export default function Images({ images, onFileDrop, onSortingEnd }: props) {
  const { setValue, register } = useFormContext();

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
      onFileDrop(newImages);
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
          <SortableImageList onDragEnd={onSortingEnd} images={[...images]} />
          <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
      </CardContent>
    </Card>
  );
}
