import { DeleteForever } from "@mui/icons-material";
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
  IconButton,
} from "@mui/material";
import { useState } from "react";
import {
  Control,
  FieldValues,
  useFieldArray,
  useFormContext,
  UseFormRegister,
} from "react-hook-form";
import { TextInput } from "../components/TextInput";

function OptionValueInput({
  index,
  control,
  register,
}: {
  index: number;
  control: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues>;
}) {
  const { fields, remove, append } = useFieldArray({
    name: `options[${index}].values`,
    control,
  });

  return (
    <Box>
      <Typography mt="0.5rem">Option values</Typography>
      {fields.map((item, k) => (
        <Box mt=".5rem" key={k} display="flex">
          <TextInput {...register(`options[${index}].values[${k}]`)} />
          <IconButton onClick={() => remove(index)}>
            <DeleteForever />
          </IconButton>
        </Box>
      ))}
      <Box>
        <Button
          onClick={() => {
            append(" ");
          }}
        >
          Add value
        </Button>
      </Box>
    </Box>
  );
}

export default function Options() {
  const [hasOptions, setHasOptions] = useState(false);
  const { control, register } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    name: "options",
    control: control,
  });

  const handleVariantChecked = (checked: boolean) => {
    if (checked && !Boolean(fields?.length)) {
      append({
        name: "",
        values: [" "],
      });
    }
    setHasOptions(checked);
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

            {fields.map((field, index) => {
              return (
                <Box key={field.id}>
                  <Box my="1rem">
                    <Typography mb="0.5rem">Option name</Typography>
                    <Box display="flex">
                      <TextInput {...register(`options.${index}.name`)} />
                      <IconButton onClick={() => remove(index)}>
                        <DeleteForever />
                      </IconButton>
                    </Box>

                    <OptionValueInput
                      index={index}
                      {...{ control, register }}
                    />
                  </Box>
                  <Divider />
                </Box>
              );
            })}

            <Button
              onClick={() =>
                append({
                  name: "",
                  values: [" "],
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
