import { ArrowDropDown } from "@mui/icons-material";
import {
  Box,
  Button,
  ButtonProps,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { useRef, useState } from "react";

interface props extends ButtonProps {
  options: string[];
  onActionClick: (action: string) => void;
}
export function ActionButton({
  options,
  children,
  onActionClick,
  ...buttonProps
}: props) {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box>
        <Button
          onClick={handleToggle}
          ref={anchorRef}
          endIcon={<ArrowDropDown />}
          {...buttonProps}
        >
          {children}
        </Button>
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
                    <MenuItem
                      key={option}
                      onClick={() => onActionClick(option)}
                    >
                      {option}
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
