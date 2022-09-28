import { Card, CardContent, Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { TextInput } from "../components/TextInput";

export default function BasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Card>
      <CardContent>
        <Box mb="1rem">
          <TextInput
            hasError={Boolean(errors.title)}
            label="Title"
            validationMessage={errors.title?.message as string}
            {...register("title", { required: "This field cannot be empty" })}
          />
        </Box>
        <Box mb="1rem">
          <TextInput {...register("description")} multiline rows={8} />
        </Box>
        <Box mb="1rem">
          <TextInput
            {...register("slug", { required: "This field cannot be empty" })}
            hasError={Boolean(errors.slug)}
            label="Slug"
            validationMessage={errors.slug?.message as string}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
