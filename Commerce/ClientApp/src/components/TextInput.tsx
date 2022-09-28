import { InputBase, InputBaseProps, Typography } from "@mui/material";
import React from "react";

interface props extends InputBaseProps {
  label?: string;
  hasError?: boolean;
  validationMessage?: string;
}

export const TextInput = React.forwardRef(
  ({ label, hasError, validationMessage, ...attributes }: props, ref) => {
    return (
      <>
        {label && <Typography mb="0.25rem">{label}</Typography>}

        <InputBase
          ref={ref}
          {...attributes}
          fullWidth
          sx={{
            border: hasError ? "1px solid  red" : "1px solid #ccc",
            borderRadius: "0.2rem",
            padding: "0.25rem",
            "& > *": {
              ml: ".25rem",
            },
          }}
        />
        {validationMessage && (
          <Typography variant="body2" color="error">
            {validationMessage}
          </Typography>
        )}
      </>
    );
  }
);
