import { Card, CardContent, Typography, InputBase } from "@mui/material";
export default function Pricing() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" mb="0.25rem">
          Pricing
        </Typography>
        <InputBase fullWidth sx={{ border: "1px solid red" }} />
      </CardContent>
    </Card>
  );
}
