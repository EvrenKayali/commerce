import {
  Typography,
  Card,
  CardContent,
  Box,
  InputBase,
  FormControl,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import { width } from "@mui/system";
import { useState } from "react";

export const Product: React.FC = () => {
  const [hasVariants, setHasVariants] = useState(false);
  return (
    <Box width="900px" margin="0 auto">
      <Typography variant="h5">Add Product</Typography>
      <Card sx={{ width: "50rem", marginBottom: "1rem" }}>
        <CardContent>
          <Box mb="1rem">
            <Typography mb="0.25rem">Title</Typography>
            <InputBase
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
              fullWidth
              multiline
              rows={8}
              sx={{ border: "1px solid #ccc", borderRadius: "0.2rem" }}
            />
          </Box>
        </CardContent>
      </Card>
      <Card sx={{ width: "50rem", marginBottom: "1rem" }}>
        <CardContent>
          <Typography variant="h5" mb="0.25rem">
            Images
          </Typography>
          <InputBase fullWidth sx={{ border: "1px solid red" }} />
        </CardContent>
      </Card>
      <Card sx={{ width: "50rem", marginBottom: "1rem" }}>
        <CardContent>
          <Typography variant="h5" mb="0.25rem">
            Variants
          </Typography>
          <FormControl>
            <FormControlLabel
              control={
                <Checkbox
                  checked={hasVariants}
                  onChange={(e, checked) => setHasVariants(checked)}
                />
              }
              label={
                <Typography>
                  This product has multiple options like, different size or
                  colors.
                </Typography>
              }
            />
          </FormControl>
          {hasVariants && (
            <Box my="1rem">
              <Divider />
              <Typography my="1rem" variant="h6">
                Options
              </Typography>
              <Typography mb="0.5rem">Option 1</Typography>
              <InputBase
                sx={{ border: "1px solid #ccc", borderRadius: ".2rem" }}
              />
              <InputBase
                sx={{
                  border: "1px solid #ccc",
                  borderRadius: ".2rem",
                  width: "25rem",
                  marginLeft: "1rem",
                }}
              />
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};
