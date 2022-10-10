import { Box, Checkbox, Link, Stack, Typography } from "@mui/material";
import { grey } from "@mui/material/colors";
import { ProductOption } from "../../api/api";
import { ActionButton } from "../../components/ActionButton";
import { LinkSelect } from "../../components/LinkSelect";

export type VariantSelectionType = "none" | "all" | ProductOption[];

function SelectCheckbox({
  selectedCount,
  variantCount,
  onChange,
}: {
  selectedCount: number;
  variantCount: number;
  onChange: (val: VariantSelectionType) => void;
}) {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={{
        border: `${Boolean(selectedCount) ? `1px solid ${grey[500]}` : "none"}`,
        minHeight: "2.25rem",
        borderTopLeftRadius: ".25rem",
        borderBottomLeftRadius: ".25rem",
        width: "auto",
      }}
    >
      <Checkbox
        checked={selectedCount === variantCount}
        indeterminate={selectedCount > 0 && selectedCount < variantCount}
        onChange={(_, checked) => onChange(checked ? "all" : "none")}
        sx={{ padding: "0 .5rem 0 .5rem", margin: 0 }}
      />
      {Boolean(selectedCount) && (
        <Typography component="span" fontSize="0.875rem" mr=".5rem">
          {selectedCount} Selected
        </Typography>
      )}
    </Box>
  );
}

interface props {
  options?: ProductOption[];
  selectedVariantCount: number;
  variantCount: number;
  selectedOptions?: ProductOption[];
  onChange: (value: VariantSelectionType) => void;
  onActionClick: (action: string) => void;
}

export function VariantSelection({
  options,
  selectedVariantCount,
  variantCount,
  selectedOptions,
  onActionClick,
  onChange,
}: props) {
  const handleSelectionChange = (optionName: string, values: string[]) => {
    const removed = selectedOptions?.filter((o) => o.name !== optionName);
    onChange([...(removed || []), { name: optionName, values }]);
  };

  return (
    <Stack>
      <Stack direction="row" alignItems="center" mb="1rem" spacing={2}>
        <Typography sx={{ mr: ".50rem" }}>Select</Typography>
        <Link
          fontSize="medium"
          component="button"
          underline="none"
          onClick={() => {
            onChange("all");
          }}
          type="button"
        >
          all
        </Link>
        <Link
          fontSize="medium"
          component="button"
          underline="none"
          onClick={() => {
            onChange("none");
          }}
          type="button"
        >
          none
        </Link>
        {options?.map((o, idx) => (
          <LinkSelect
            key={idx}
            value={
              selectedOptions?.find((f) => f.name === o.name)?.values || []
            }
            options={o.values}
            text={o.name.toLowerCase()}
            onOptionChange={(values) => handleSelectionChange(o.name, values)}
          />
        ))}
      </Stack>
      <Stack direction="row">
        <SelectCheckbox
          selectedCount={selectedVariantCount}
          variantCount={variantCount}
          onChange={onChange}
        />
        {Boolean(selectedVariantCount) && (
          <ActionButton
            options={["Edit Image"]}
            variant="outlined"
            sx={{
              borderRadius: 0,
              borderTopRightRadius: ".25rem",
              borderBottomRightRadius: ".25rem",
              borderLeft: 0,
              borderColor: grey[500],
              color: "#000",
              m: 0,
              textTransform: "none",
            }}
            onActionClick={onActionClick}
          >
            Actions
          </ActionButton>
        )}
      </Stack>
    </Stack>
  );
}
