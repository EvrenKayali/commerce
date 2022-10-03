import { Card, CardContent, MenuItem, Select, Typography } from "@mui/material";

export function Status() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb="0.25rem">
          Product Status
        </Typography>
        <Select defaultValue={true} size="small" fullWidth>
          <MenuItem value="false">Draft</MenuItem>
          <MenuItem value="true">Active</MenuItem>
        </Select>
        <Typography variant="body2" mt=".25rem">
          This product will be shown in the web page
        </Typography>
      </CardContent>
    </Card>
  );
}
