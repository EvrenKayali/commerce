import { Card, CardContent, Typography, Box, Stack } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { TextInput } from "../../components/TextInput";
export default function Pricing() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb="1rem">
          Pricing
        </Typography>
        <Stack direction="row">
          <Box width="50%" mr="1rem" mb="1rem">
            <TextInput
              hasError={Boolean(errors.title)}
              label="Price"
              validationMessage={errors.title?.message as string}
              {...register("price")}
            />
          </Box>
          <Box width="50%">
            <TextInput
              hasError={Boolean(errors.title)}
              label="Compare at price"
              validationMessage={errors.title?.message as string}
              {...register("compareAtPrice")}
            />
          </Box>
        </Stack>
        <Box width="50%" mr="1rem">
          <TextInput
            hasError={Boolean(errors.title)}
            label="Cost per item"
            validationMessage={errors.title?.message as string}
            {...register("costPerItem")}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
