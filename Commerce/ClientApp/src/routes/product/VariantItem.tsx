import { AddPhotoAlternate } from "@mui/icons-material";
import { Box, Checkbox, Typography } from "@mui/material";
import { Variant } from "../../api/api";

interface props {
  variant: Variant;
  selected: boolean;
  onImageAdd: () => void;
  onVariantSelect: (checked: boolean, name: string) => void;
}
export function VariantItem({
  variant,
  selected,
  onImageAdd,
  onVariantSelect,
}: props) {
  return (
    <Box display="flex" alignItems="center" justifyContent="space-between">
      <Box display="flex" alignItems="center">
        <Checkbox
          sx={{ padding: "0 .5rem 0 .5rem" }}
          checked={selected}
          onChange={(_, checked) => onVariantSelect(checked, variant.key)}
        />
        {!variant.imageSrc ? (
          <Box
            onClick={onImageAdd}
            width="75px"
            height="75px"
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{ border: "1px dashed black", cursor: "pointer" }}
            mr="1rem"
          >
            <AddPhotoAlternate fontSize="large" />
          </Box>
        ) : (
          <img
            onClick={onImageAdd}
            src={variant.imageSrc}
            alt=""
            style={{
              width: "75px",
              height: "75px",
              objectFit: "cover",
              marginRight: "1rem",
              cursor: "pointer",
            }}
          />
        )}

        <Typography>{variant.name}</Typography>
      </Box>
      <Typography>Lorem ipsum</Typography>
    </Box>
  );
}
