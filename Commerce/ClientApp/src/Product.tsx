import { Typography, Button, Stack, Box } from "@mui/material";
import { serialize } from "object-to-formdata";
import React, { useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import { addProductWithImages, getProduct, updateProduct } from "./api/api";
import { Image } from "./components/SortableImageList";
import BasicInfo from "./product/BasicInfo";
import Images from "./product/Images";

type FormValues = {
  id: number;
  title: string;
  description: string;
  slug: string;
  imageFiles?: File[] | null;
  images: Image[];
  variants?: {
    name: string;
    value: string;
  }[];
};

interface props {
  productId?: number;
  formData?: FormValues;
  header: string;
}

function Form({ formData, header, productId }: props) {
  const formRef = useRef<HTMLFormElement>(null);
  const methods = useForm<FormValues>({
    defaultValues: formData,
  });

  function handleImageChange(imgs: Image[], files?: File[]) {
    methods.setValue("images", imgs);
    methods.setValue("imageFiles", files || null);
  }

  const onSubmit = async (data: FormValues) => {
    const formData = serialize(data, {
      noFilesWithArrayNotation: true,
      indices: true,
    });

    if (productId && productId > 0) {
      await updateProduct(formData);
    } else {
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
              images={methods.getValues("images")}
              onChange={(imgs, files) => handleImageChange(imgs, files)}
            />
            {/* <Pricing />
            <Variants /> */}
          </Stack>
          <Button type="submit">Save</Button>
        </form>
        <ul>
          {methods.watch("imageFiles")?.map((f) => (
            <li key={f.name}>{f.name}</li>
          ))}
        </ul>
      </FormProvider>
    </Box>
  );
}

export const Product: React.FC = () => {
  const [vals, setVals] = useState<FormValues | undefined>();
  let params = useParams();
  const productId = parseInt(params.productId as string);

  useEffect(() => {
    const fetchData = async (productId: number) => {
      const result = await getProduct(productId);
      setVals(result);
    };
    if (productId) {
      fetchData(productId);
    } else {
      setVals({
        title: "",
        description: "",
        slug: "",
        id: 0,
        images: [],
      });
    }
  }, [productId]);

  return vals ? (
    <Form
      productId={productId}
      formData={vals}
      header={productId ? "Edit Product" : "Add Product"}
    />
  ) : null;
};
