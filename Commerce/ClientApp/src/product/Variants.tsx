import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  InputBase,
  FormControl,
  FormControlLabel,
  Checkbox,
  Divider,
} from "@mui/material";
import { useState } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";

export default function Variants() {
  const [hasVariants, setHasVariants] = useState(false);
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "variants",
    control: control,
  });

  const handleVariantChecked = (checked: boolean) => {
    if (checked && !Boolean(fields?.length)) {
      append({
        name: "",
        value: "",
      });
    }
    setHasVariants(checked);
  };
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" mb="0.25rem">
          Variants
        </Typography>
        <FormControl>
          <FormControlLabel
            control={
              <Checkbox
                checked={hasVariants}
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
        {hasVariants && (
          <Box my="1rem">
            <Divider />
            <Typography mt="1rem" variant="h6">
              Options
            </Typography>
            {fields.map((field, index) => {
              return (
                <Box key={field.id}>
                  <Box my="1rem">
                    <Typography mb="0.5rem">Option {index + 1}</Typography>
                    <InputBase
                      {...register(`variants.${index}.name`)}
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: ".2rem",
                      }}
                    />
                    <InputBase
                      {...register(`variants.${index}.value`)}
                      sx={{
                        border: "1px solid #ccc",
                        borderRadius: ".2rem",
                        width: "25rem",
                        marginLeft: "1rem",
                      }}
                    />
                    <Button onClick={() => remove(index)}>Remove</Button>
                  </Box>
                  <Divider />
                </Box>
              );
            })}

            <Button
              onClick={() =>
                append({
                  name: "",
                  value: "",
                })
              }
              variant="outlined"
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
