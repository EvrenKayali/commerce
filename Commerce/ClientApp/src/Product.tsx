import { Typography, Box, Button } from "@mui/material";
import { useForm, FormProvider } from "react-hook-form";
import BasicInfo from "./product/BasicInfo";
import Images from "./product/Images";
import Pricing from "./product/Pricing";
import Variants from "./product/Variants";

type FormValues = {
  title: string;
  description: string;
  variants: {
    name: string;
    value: string;
  }[];
};

export const Product: React.FC = () => {
  const methods = useForm<FormValues>({
    mode: "onBlur",
  });

  const onSubmit = (data: FormValues) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <Box width="900px" margin="0 auto">
          <Typography variant="h5">Add Product</Typography>
          <BasicInfo />
          <Images />
          <Pricing />
          <Variants />
        </Box>
        <Button type="submit">Save</Button>
      </form>
    </FormProvider>
  );
};
