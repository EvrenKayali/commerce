import { ArrowDropDown } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import { ProductOption } from "../../api/api";

export type VariantSelectionType = "none" | "all";

interface props {
  options?: ProductOption[];
  onChange: (value: VariantSelectionType) => void;
}

export function VariantSelection({ onChange }: props) {
  return (
    <Box display="flex" alignItems="center" mb="1rem">
      <Typography variant="body2" sx={{ mr: ".50rem" }}>
        Select
      </Typography>
      <Link
        component="button"
        underline="none"
        variant="body2"
        sx={{ mr: ".50rem" }}
        onClick={() => {
          onChange("all");
        }}
      >
        all
      </Link>
      <Link
        component="button"
        underline="none"
        variant="body2"
        sx={{ mr: ".50rem" }}
        onClick={() => {
          onChange("none");
        }}
      >
        none
      </Link>
      <Link
        component="button"
        underline="none"
        variant="body2"
        sx={{ mr: ".50rem" }}
      >
        color
        <ArrowDropDown fontSize="small"></ArrowDropDown>
      </Link>
    </Box>
  );
}
