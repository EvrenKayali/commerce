import { Card, CardContent, Box, Typography, InputBase } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function BasicInfo() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <Card>
      <CardContent>
        <Box mb="1rem">
          <Typography mb="0.25rem">Title</Typography>
          <InputBase
            {...register("title", { required: "This field cannot be empty" })}
            fullWidth
            sx={{
              border: errors.title ? "1px solid  red" : "1px solid #ccc",
              borderRadius: "0.2rem",
              padding: "0.25rem",
            }}
          />
          {errors.title && errors.title.type === "required" && (
            <Typography variant="body2" color="error">
              {errors.title.message as string}
            </Typography>
          )}
        </Box>
        <Box mb="1rem">
          <Typography mb="0.25rem">Description</Typography>
          <InputBase
            {...register("description")}
            fullWidth
            multiline
            rows={8}
            sx={{ border: "1px solid #ccc", borderRadius: "0.2rem" }}
          />
        </Box>
        <Box mb="1rem">
          <Typography mb="0.25rem">Slug</Typography>
          <InputBase
            {...register("slug", { required: "This field cannot be empty" })}
            fullWidth
            sx={{
              border: errors.slug ? "1px solid  red" : "1px solid #ccc",
              borderRadius: "0.2rem",
              padding: "0.25rem",
            }}
          />
          {errors.slug && errors.slug.type === "required" && (
            <Typography variant="body2" color="error">
              {errors.slug.message as string}
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}
