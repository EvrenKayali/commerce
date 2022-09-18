import { Typography, Button, Stack, Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import { addProduct, getProduct, uploadFileImages } from "./api/api";
import BasicInfo from "./product/BasicInfo";
import Images from "./product/Images";
import Pricing from "./product/Pricing";
import Variants from "./product/Variants";

type FormValues = {
  id: number;
  title: string;
  description: string;
  images?: FileList;
  variants?: {
    name: string;
    value: string;
  }[];
};

function Form({ formData }: { formData?: FormValues }) {
  const methods = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: formData,
  });

  const onSubmit = async (data: FormValues) => {
    await uploadFileImages(data.images);

    const { images, ...productDataWithoutImages } = data;

    await addProduct(productDataWithoutImages);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h5">Add Product</Typography>
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
      setVals({ title: "", description: "", id: 0 });
    }
  }, [productId]);

  return vals ? <Form formData={vals} /> : null;
};
