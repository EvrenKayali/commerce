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
import { ClientProductOption, OptionInput } from "../components/OptionInput";

export default function Options({
  options,
  onChange,
}: {
  onChange: (options: ClientProductOption[]) => void;
  options?: ClientProductOption[];
}) {
  const handleVariantChecked = (checked: boolean) => {
    if (!checked) {
      onChange([]);
    } else {
      onChange([{ name: "", values: [""], editMode: true }]);
    }
  };

  const handleEdit = (idx: number) => {
    //closes other edits. Change from here...
    const modifiedOptions = options?.map((opt, index) => ({
      ...opt,
      editMode: index === idx,
    }));
    modifiedOptions && onChange(modifiedOptions);
  };

  const handleRemove = (idx: number) => {
    options && onChange(options?.filter((_, i) => idx !== i));
  };

  const handleOptionChange = (val: ClientProductOption, idx: number) => {
    const opts = [...(options ?? [])];
    opts[idx] = val;

    onChange(opts);
  };

  const handleOptionAdd = () => {
    const opts = [...(options ?? [])];
    onChange([...opts, { name: "", values: [""], editMode: true }]);
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
                checked={Boolean(options?.length)}
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
        {Boolean(options?.length) && (
          <Box my="1rem">
            <Divider />
            {options?.map((opt, idx) => (
              <Box mt="1rem" key={idx}>
                <OptionInput
                  onDelete={() => handleRemove(idx)}
                  onEdit={() => handleEdit(idx)}
                  option={opt}
                  editMode={opt.editMode}
                  onCompleteEdit={(val) =>
                    handleOptionChange(val as ClientProductOption, idx)
                  }
                />
                <Divider sx={{ mt: "1rem" }} />
              </Box>
            ))}
            <Box>
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
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
