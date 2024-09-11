/* eslint-disable @typescript-eslint/no-explicit-any */
import { Add } from "@mui/icons-material";
import { Button, Grid, Paper, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { ChangeEvent } from "react";

interface ToolsBarProps {
  hasStatusFilter?: boolean;
  statusCurrentValue?: any;
  setStatusFilterActive?: (event: ChangeEvent<{ value: unknown }>) => void;
  textSearch?: string;
  changeTextBysearch?: (value: string) => void;
  showInputSearch?: boolean;
  buttonSearch?: () => void;
  textButton?: string;
  showButton?: boolean;
  clickButtonNew?: () => void;
  inputLabel?: string;
  inputHelperText?: string;
}

export const ToolsBar = ({
  textSearch,
  changeTextBysearch,
  showInputSearch = true,
  buttonSearch,
  textButton = "Novo",
  showButton = true,
  clickButtonNew,
  inputLabel = "Pesquisar ",
  inputHelperText = "Pesquisar por id ou pelo nome do registro",
}: ToolsBarProps) => {
  return (
    <Box
      component={Paper}
      padding={2}
      borderRadius={4}
      elevation={0}
      display="flex"
      alignItems="center"
      justifyContent={"space-between"}
    >
      <Grid display={"flex"} gap={2} flexDirection={"row"}>
        {showInputSearch && (
          <Box>
            <TextField
              type="search"
              label={inputLabel}
              size="small"
              value={textSearch}
              onChange={(e) => {
                changeTextBysearch?.(e.target.value);
                buttonSearch?.();
              }}
              autoComplete="current-password"
              helperText={inputHelperText}
            />
          </Box>
        )}
      </Grid>

      {showButton && (
        <Button
          startIcon={<Add />}
          variant="contained"
          sx={{ borderRadius: "12px" }}
          onClick={() => clickButtonNew?.()}
        >
          {textButton}
        </Button>
      )}
    </Box>
  );
};
