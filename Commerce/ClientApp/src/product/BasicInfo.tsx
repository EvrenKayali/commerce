import { Card, CardContent, Box, Typography, InputBase } from "@mui/material";
import { useFormContext } from "react-hook-form";

export default function BasicInfo() {
  const { register } = useFormContext();
  return (
    <Card sx={{ width: "50rem", marginBottom: "1rem" }}>
      <CardContent>
        <Box mb="1rem">
          <Typography mb="0.25rem">Title</Typography>
          <InputBase
            {...register("title")}
            fullWidth
            sx={{
              border: "1px solid #ccc",
              borderRadius: "0.2rem",
              padding: "0.25rem",
            }}
          />
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
      </CardContent>
    </Card>
  );
}
