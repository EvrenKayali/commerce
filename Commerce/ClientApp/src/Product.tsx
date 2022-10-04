import { Typography, Stack, Box, Snackbar, Alert } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { serialize } from "object-to-formdata";
import React, { useRef, useState } from "react";
import { useForm, FormProvider, Controller } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import {
  ProductFormModel,
  useAddProductMutation,
  useProduct,
  useUpdateProductMutation,
} from "./api/api";
import { Image } from "./components/SortableImageList";
import BasicInfo from "./product/BasicInfo";
import Images from "./product/Images";
import { Save } from "@mui/icons-material";
import { useQueryClient } from "@tanstack/react-query";
import Options from "./product/Options";
import { Status } from "./product/Status";
import { Organization } from "./product/Organization";
import { ClientProductOption } from "./components/OptionInput";
import { Variants } from "./product/Variants";

function cartesianProduct<T>(...allEntries: T[][]): T[][] {
  return allEntries.reduce<T[][]>(
    (results, entries) =>
      results
        .map((result) => entries.map((entry) => [...result, entry]))
        .reduce((subResults, result) => [...subResults, ...result], []),
    [[]]
  );
}

function generateVariants(cartasian: string[][]) {
  return cartasian.map((i) => i.join(" / ")).map((x) => ({ name: x }));
}

export const Product: React.FC = () => {
  let params = useParams();
  const productId = parseInt(params.productId as string);

  const { data: product } = useProduct({ id: productId });

  interface props {
    productId?: number;
    formData?: ProductFormModel;
    header: string;
  }

  function Form({ formData, header, productId }: props) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const formRef = useRef<HTMLFormElement>(null);
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
            navigate(`/product/${data?.id}`);
          },
        });
      }
    };

    const eee = methods
      .watch("options")
      ?.map((opt) => opt.values.filter((val) => Boolean(val)));

    const prod = eee ? cartesianProduct(...eee) : [];

    methods.setValue("variants", generateVariants(prod));

    return (
      <Box>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} ref={formRef}>
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
                  images={methods.getValues("images") || []}
                  onChange={(imgs, files) => handleImageChange(imgs, files)}
                />
                {/* <Pricing /> */}
                <Controller
                  name="options"
                  render={({ field }) => (
                    <Options
                      onEdit={(idx) => {
                        const currentVals = [
                          ...(methods.getValues(
                            "options"
                          ) as ClientProductOption[]),
                        ];

                        currentVals[idx].editMode = true;
                        methods.setValue("options", currentVals);
                      }}
                      onDelete={(idx) => {
                        const filtered = methods
                          .getValues("options")
                          ?.filter((_, i) => idx !== i);
                        methods.setValue("options", filtered);
                      }}
                      options={
                        methods.getValues("options") as ClientProductOption[]
                      }
                      onChange={(val) => methods.setValue("options", val)}
                    />
                  )}
                />
                <Variants
                  items={methods.getValues("variants") ?? []}
                  images={methods.getValues("images")}
                />
              </Stack>
              <Stack spacing={2} minWidth="30rem">
                <Status />
                <Organization />
              </Stack>
            </Box>
          </form>
          <ul>
            {methods.watch("imageFiles")?.map((f) => (
              <li key={f.name}>{f.name}</li>
            ))}
          </ul>
        </FormProvider>
        <Snackbar
          open={alert}
          autoHideDuration={2000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
        >
          <Alert
            onClose={handleClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Product Savedl successfully
          </Alert>
        </Snackbar>
      </Box>
    );
  }

  return !productId || product ? (
    <Form
      productId={productId}
      formData={product}
      header={productId ? "Edit Product" : "Add Product"}
    />
  ) : null;
};
