import { Typography, Stack, Box, Snackbar, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { serialize } from "object-to-formdata";
import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  ProductFormModel,
  useAddProductMutation,
  useUpdateProductMutation,
} from "../../api/api";
import { Image } from "../../components/SortableImageList";
import BasicInfo from "./BasicInfo";
import Images from "./Images";
import { Save } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import { Status } from "./Status";
import { Organization } from "./Organization";
import { VariantsFormPart } from "./Variants";
import { OptionsFormPart } from "./Options";

interface props {
  productId?: number;
  formData?: ProductFormModel;
  header: string;
}

export function ProductForm({ formData, header, productId }: props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const methods = useForm<ProductFormModel>({
    defaultValues: formData,
  });

  const [alert, setAlert] = useState(false);

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setAlert(false);
  };

  function handleImageChange(imgs: Image[], files?: File[]) {
    methods.setValue("images", imgs);
    methods.setValue("imageFiles", files || null);
  }

  const { mutate: addProduct, status: addStatus } = useAddProductMutation();
  const { mutate: updateProduct, status: updateStatus } =
    useUpdateProductMutation();

  const onSubmit = async (data: ProductFormModel) => {
    console.log(data);
    data.images = data.images?.map((i) => ({ ...i, id: i.isNew ? 0 : i.id }));
    const formData = serialize(data, {
      noFilesWithArrayNotation: true,
      indices: true,
    });
    if (productId && productId > 0) {
      updateProduct(formData, {
        onSuccess: () => {
          setAlert(true);
          methods.setValue("imageFiles", null);
          queryClient.invalidateQueries(["Product", productId]);
          queryClient.invalidateQueries(["Products"]);
        },
      });
    } else {
      addProduct(formData, {
        onSuccess: (data) => {
          methods.setValue("imageFiles", null);
          queryClient.invalidateQueries(["Products"]);
          navigate(`/products/${data?.id}`);
        },
      });
    }
  };

  return (
    <Box pb="2rem">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Box display="flex" justifyContent="space-between" mb="1rem">
            <Typography variant="h5">{header}</Typography>
            <LoadingButton
              variant="contained"
              type="submit"
              loading={updateStatus === "loading" || addStatus === "loading"}
              endIcon={<Save />}
              loadingPosition="end"
            >
              Save
            </LoadingButton>
          </Box>
          <Box display="flex">
            <Stack spacing={2} width="50%" mr="2rem">
              <BasicInfo />
              <Images
                images={methods.watch("images") || []}
                onChange={(imgs, files) => handleImageChange(imgs, files)}
              />
              <OptionsFormPart />
              <VariantsFormPart
                options={methods.watch("options")?.filter((o) => o.name)}
              />
            </Stack>
            <Stack spacing={2} minWidth="30rem">
              <Status />
              <Organization />
            </Stack>
          </Box>
        </form>
      </FormProvider>
      <Snackbar
        open={alert}
        autoHideDuration={2000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: "100%" }}>
          Product Savedl successfully
        </Alert>
      </Snackbar>
    </Box>
  );
}
