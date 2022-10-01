import { Card, CardContent, MenuItem, Select, Typography } from "@mui/material";

export function Status() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" mb="0.25rem">
          Product Status
        </Typography>
        <Select defaultValue={true} size="small" fullWidth>
          <MenuItem value="true">Active</MenuItem>
          <MenuItem value="false">Inactive</MenuItem>
        </Select>
        <Typography variant="body2" mt=".25rem">
          This product will be shown in the web page
        </Typography>
      </CardContent>
    </Card>
  );
}
