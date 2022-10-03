import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  FormControl,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { ProductOption } from "../api/api";
import { OptionInput } from "../components/OptionInput";

export default function Options({
  options,
  onChange,
}: {
  onChange: (options: ProductOption[]) => void;
  options?: ProductOption[];
}) {
  const [hasOptions, setHasOptions] = useState(false);

  const handleVariantChecked = (checked: boolean) => {
    setHasOptions(checked);
  };

  const handleOptionChange = (val: ProductOption, idx: number) => {
    const opts = [...(options ?? [])];
    opts[idx] = val;

    onChange(opts);
  };

  const handleOptionAdd = () => {
    const a = [...(options ?? []), { name: "", values: [""] }];
    onChange(a);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb="0.25rem">
          Options
        </Typography>
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={hasOptions}
                onChange={(_, checked) => handleVariantChecked(checked)}
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
        {hasOptions && (
          <Box my="1rem">
            <Divider />
            {options?.map((opt, idx) => (
              <OptionInput
                option={opt}
                key={idx}
                onCompleteEdit={(val) => handleOptionChange(val, idx)}
              />
            ))}
            <Button
              variant="outlined"
              onClick={handleOptionAdd}
              sx={{
                borderColor: "#ccc",
                color: "#000",
                marginTop: "1rem",
              }}
            >
              Add another option
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
