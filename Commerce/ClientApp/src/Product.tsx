import { Typography, Button, Stack, Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import { addProductWithImages, getProduct } from "./api/api";
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

function Form({ formData, header }: { formData?: FormValues; header: string }) {
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

    // await uploadFileImages(data.images, data.slug);

    // const { images, ...productDataWithoutImages } = data;

    // await addProduct({ ...productDataWithoutImages });
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
            <Images />
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
      setVals({ title: "", description: "", slug: "", id: 0 });
    }
  }, [productId]);

  return vals ? (
    <Form formData={vals} header={productId ? "Edit Product" : "Add Product"} />
  ) : null;
};
