import { Typography, Button, Stack, Box } from "@mui/material";
import { serialize } from "object-to-formdata";
import React, { useRef } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useParams } from "react-router-dom";
import {
  addProductWithImages,
  GetProductByIdResponse,
  updateProduct,
  useProduct,
} from "./api/api";
import { Image } from "./components/SortableImageList";
import BasicInfo from "./product/BasicInfo";
import Images from "./product/Images";

interface props {
  productId?: number;
  formData?: GetProductByIdResponse;
  header: string;
}

function Form({ formData, header, productId }: props) {
  const formRef = useRef<HTMLFormElement>(null);
  const methods = useForm<GetProductByIdResponse>({
    defaultValues: formData,
  });

  function handleImageChange(imgs: Image[], files?: File[]) {
    methods.setValue("images", imgs);
    methods.setValue("imageFiles", files || null);
  }

  const onSubmit = async (data: GetProductByIdResponse) => {
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
              images={methods.getValues("images") || []}
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
  let params = useParams();
  const productId = parseInt(params.productId as string);

  const { data: product } = useProduct({ id: productId });

  return !productId || product ? (
    <Form
      productId={productId}
      formData={product}
      header={productId ? "Edit Product" : "Add Product"}
    />
  ) : null;
};
