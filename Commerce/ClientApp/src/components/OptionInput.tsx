import { DeleteForever } from "@mui/icons-material";
import { Box, Button, Chip, IconButton, Typography } from "@mui/material";
import React, { useState } from "react";
import { ProductOption } from "../api/api";
import { TextInput } from "./TextInput";

export type ClientProductOption = ProductOption & { editMode?: boolean };

export function OptionInput({
  option,
  editMode,
  onCompleteEdit,
  onEdit,
  onDelete,
}: {
  editMode?: boolean;
  option: ClientProductOption;
  onCompleteEdit: (val: ProductOption) => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [optionName, setOptionName] = useState(option.name);
  const [optionValues, setOptionValues] = useState<string[]>(option.values);

  const remove = (index: number) => {
    setOptionValues(optionValues.filter((_, i) => i !== index));
  };

  const change = (val: string, index: number) => {
    var modified = optionValues.map((item, idx) => {
      if (idx === index) item = val;
      return item;
    });

    setOptionValues(modified);
  };

  const handleEnter = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const lastInputIsEmpty = Boolean(optionValues[optionValues.length - 1]);
    const isLetter =
      (e.key >= "a" && e.key <= "z") || (e.key >= "A" && e.key <= "Z");
    const isNumber = e.key >= "0" && e.key <= "9";
    const validKey = isLetter || isNumber;

    if (lastInputIsEmpty && validKey) setOptionValues([...optionValues, ""]);
  };

  const handleEditComplete = () => {
    setOptionValues(optionValues.filter((val) => val));
    onCompleteEdit({ name: optionName, values: optionValues });
  };

  const handleEditStart = () => {
    setOptionValues([...optionValues, ""]);
    onEdit();
  };

  return (
    <>
      {editMode && (
        <>
          <Typography sx={{ marginBottom: ".25rem" }}>Option name</Typography>
          <Box display="flex">
            <TextInput
              value={optionName}
              onChange={(e) => setOptionName(e.currentTarget.value)}
            />
            <IconButton onClick={onDelete} tabIndex={-1}>
              <DeleteForever />
            </IconButton>
          </Box>

          <Box mt="1rem">
            <Typography sx={{ marginBottom: ".25rem" }}>
              Option values
            </Typography>
            {optionValues.map((val, idx) => (
              <Box mb=".5rem" display="flex" key={idx}>
                <TextInput
                  placeholder="add another value"
                  value={val}
                  onKeyDown={handleEnter}
                  onChange={(e) => {
                    change(e.currentTarget.value, idx);
                  }}
                />
                {idx !== optionValues.length - 1 && (
                  <IconButton onClick={() => remove(idx)} tabIndex={-1}>
                    <DeleteForever />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
          <Button variant="outlined" onClick={handleEditComplete}>
            Done
          </Button>
        </>
      )}
      {editMode || (
        <>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Typography>
              <strong>{optionName}</strong>
            </Typography>
            <Button variant="outlined" size="small" onClick={handleEditStart}>
              Edit
            </Button>
          </Box>

          {optionValues.map((val, idx) => (
            <Chip size="small" key={idx} label={val} sx={{ mr: ".5rem" }} />
          ))}
        </>
      )}
    </>
  );
}
