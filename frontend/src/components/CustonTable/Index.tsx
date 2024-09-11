 
import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CustomGridColDef, TableSimpleProps } from "./@types";

export const TableSimple = ({ rows, columns, props }: TableSimpleProps) => {
  const columnsConverter = (columns: CustomGridColDef[]) => {
    if (!columns) {
      return [];
    }

    return columns.map((column) => {
      switch (column.customType) {
        default:
          return column;
      }
    });
  };

  return (
    <Paper
      component="div"
      elevation={0}
      sx={{ width: "100%", overflow: "auto", padding: 2, borderRadius: "12px" }}
    >
      <DataGrid
        sx={{
          "&::-webkit-scrollbar": {
            width: "12px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#4caf50",
            borderRadius: "12px",
          },
          "&::-webkit-scrollbar-track": {
            backgroundColor: "#f1f1f1",
          },
        }}
        {...props}
        rows={rows || []}
        columns={columnsConverter(columns)}
        rowsPerPageOptions={[5, 10, 25, 50]}
        hideFooter
        autoHeight
        disableColumnMenu
      />
    </Paper>
  );
};
