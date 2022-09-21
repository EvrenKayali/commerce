import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { Typography, Button, Stack, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import { addProductWithImages, getProduct } from "./api/api";
import { Image } from "./components/SortableImageList";
import BasicInfo from "./product/BasicInfo";
import Images from "./product/Images";
import Pricing from "./product/Pricing";
import Variants from "./product/Variants";

type FormValues = {
  id: number;
  title: string;
  description: string;
  slug: string;
  images?: FileList;
  variants?: {
    name: string;
    value: string;
  }[];
};

interface props {
  formData?: FormValues;
  header: string;
  images: Image[];
  onFileDrop: (files: Image[]) => void;
  onSortingEnd: (event: DragEndEvent) => void;
}

function Form({ formData, header, images, onFileDrop, onSortingEnd }: props) {
  const formRef = useRef<HTMLFormElement>(null);
  const methods = useForm<FormValues>({
    defaultValues: formData,
  });

  const onSubmit = async (data: FormValues) => {
    console.log(new FormData(formRef.current!).values());

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      Array.from(data.images as FileList).forEach((img) => {
        formData.append("images", img);
      });
      await addProductWithImages(formData);
    }
  };
  return (
    <Box maxWidth="60rem">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
          <Stack spacing={2}>
            <Box display="flex" justifyContent="space-between">
              <Typography variant="h5">{header}</Typography>
              <Button variant="contained" type="submit">
                Save
              </Button>
            </Box>
            <BasicInfo />
            <Images
              onSortingEnd={onSortingEnd}
              onFileDrop={onFileDrop}
              images={images}
            />
            <Pricing />
            <Variants />
          </Stack>
          <Button type="submit">Save</Button>
        </form>
      </FormProvider>
    </Box>
  );
}

export const Product: React.FC = () => {
  const [vals, setVals] = useState<FormValues | undefined>();
  const [images, setImages] = useState<Image[]>([]);
  let params = useParams();
  const productId = parseInt(params.productId as string);

  function handleSortEnd(event: DragEndEvent) {
    const { active, over } = event;

    console.log(event);

    if (active.id !== over?.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  function handleFileDrop(newImages: Image[]) {
    setImages([...images, ...newImages]);
  }

  useEffect(() => {
    const fetchData = async (productId: number) => {
      const result = await getProduct(productId);
      setVals(result);
      setImages(result.images);
    };
    if (productId) {
      fetchData(productId);
    } else {
      setVals({ title: "", description: "", slug: "", id: 0 });
    }
  }, [productId]);

  return vals ? (
    <Form
      images={images}
      onSortingEnd={handleSortEnd}
      onFileDrop={handleFileDrop}
      formData={vals}
      header={productId ? "Edit Product" : "Add Product"}
    />
  ) : null;
};
