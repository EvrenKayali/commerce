import { ArrowDropDown } from "@mui/icons-material";
import {
  Box,
  ClickAwayListener,
  Grow,
  Link,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { BoxProps } from "@mui/system";
import { useRef, useState } from "react";

interface props extends BoxProps {
  text: string;
  options: string[];
  value: string[];
  onOptionChange: (values: string[]) => void;
}

export function LinkSelect({
  text,
  options,
  value,
  onOptionChange,
  ...boxProps
}: props) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleChange = (option: string, checked: boolean) => {
    if (checked) {
      onOptionChange([...(value || []), option]);
    } else {
      onOptionChange(value!.filter((v) => v !== option));
    }
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box {...boxProps}>
        <Link
          fontSize="1rem"
          ref={anchorRef}
          onClick={handleToggle}
          component="button"
          underline="none"
          sx={{ display: "flex", alignItems: "Center" }}
          type="button"
        >
          {text}
          <ArrowDropDown
            fontSize="medium"
            color="primary"
            sx={{ padding: 0 }}
          />
        </Link>
        <Popper
          sx={{
            zIndex: 1,
          }}
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === "bottom" ? "center top" : "center bottom",
              }}
            >
              <Paper>
                <MenuList autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem key={option}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            onChange={(_, checked) =>
                              handleChange(option, checked)
                            }
                            checked={value.some((v) => v === option)}
                          />
                        }
                        label={option}
                      />
                    </MenuItem>
                  ))}
                </MenuList>
              </Paper>
            </Grow>
          )}
        </Popper>
      </Box>
    </ClickAwayListener>
  );
}
