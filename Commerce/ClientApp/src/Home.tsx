import { Button, Card, CardContent } from "@mui/material";
import { useState } from "react";
import { ProductOption } from "./api/api";
import { OptionInput } from "./components/OptionInput";

export default function Home() {
  const [options, setOptions] = useState<ProductOption[]>([]);

  const handleOptionChange = (opt: ProductOption, idx: number) => {
    const opts = [...options];
    opts[idx] = opt;

    setOptions(opts);
  };
  return (
    <>
      <h3>Hello World!!!!</h3>
      <Card sx={{ width: "60rem" }}>
        <CardContent>
          {options.map((opt, idx) => (
            <OptionInput
              option={opt}
              onCompleteEdit={(opt) => {
                handleOptionChange(opt, idx);
              }}
            />
          ))}
        </CardContent>

        <Button
          onClick={() => setOptions([...options, { name: "", values: [""] }])}
        >
          Add New
        </Button>
      </Card>
    </>
  );
}
