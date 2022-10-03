import { Box } from "@mui/material";
import React, { useState } from "react";
import { TextInput } from "./TextInput";

export function OptionInput() {
  const [optionName, setOptionName] = useState("");
  const [optionValues, setOptionValues] = useState<string[]>([""]);

  const handleEnter = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter") {
      setOptionValues([...optionValues, ""]);
    }
  };
  return (
    <Box>
      <TextInput
        label="Option name"
        value={optionName}
        onChange={(e) => setOptionName(e.currentTarget.value)}
      />

      {optionValues.map((val, idx) => (
        <TextInput value={val} onKeyDown={handleEnter} />
      ))}
    </Box>
  );
}
