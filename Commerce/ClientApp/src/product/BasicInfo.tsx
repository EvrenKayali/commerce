import { Card, CardContent, Box } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { TextInput } from "../components/TextInput";

export default function BasicInfo() {
  const {
    register,
    watch,
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
            {...register("title", {
              required: "This field cannot be empty",
              maxLength: {
                value: 200,
                message: "Title length cannot be more than 50 charecters",
              },
            })}
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
            disabled
            value={watch("title").toLowerCase().split(" ").join("-")}
          />
        </Box>
      </CardContent>
    </Card>
  );
}
