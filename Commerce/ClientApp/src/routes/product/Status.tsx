import { Card, CardContent, MenuItem, Select, Typography } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export function Status() {
  const { control } = useFormContext();
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb="0.25rem">
          Product Status
        </Typography>
        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <Select
              size="small"
              fullWidth
              value={field.value}
              onChange={field.onChange}
            >
              <MenuItem value="Draft">Draft</MenuItem>
              <MenuItem value="Active">Active</MenuItem>
            </Select>
          )}
        />

        <Typography variant="body2" mt=".25rem">
          This product will be shown in the web page
        </Typography>
      </CardContent>
    </Card>
  );
}
