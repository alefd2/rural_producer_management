/* eslint-disable @typescript-eslint/no-explicit-any */
import { Pagination, Paper } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { CustonTableProps, TableSimpleProps } from "./@types";

export const CustonTable = ({
  rows,
  columns,
  setCurrentPage,
  currentPage,
  height = 640,
  props,
}: CustonTableProps) => {
  const columnsConverter = (columns: GridColDef[]) => {
    if (!columns) {
      return [];
    }

    return columns.map((column) => ({
      ...column,
      renderCell: (params: GridRenderCellParams<any>) =>
        params.value || "vazio",
    }));
  };
  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setCurrentPage(value);
  };

  return (
    <div
      style={{
        height: height,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
      }}
    >
      <DataGrid
        sx={{
          borderRadius: "16px",
          background: "#fff",
          padding: "20px",
          border: "none",
          scrollbarWidth: "thin",
        }}
        {...props}
        rows={rows.data || []}
        columns={columnsConverter(columns)}
        hideFooter
      />
      <Pagination
        sx={{
          display: "flex",
          justifyContent: "end",
          alignItems: "center",
          borderRadius: "16px",
          background: "#fff",
          padding: "10px",
          border: "none",
        }}
        defaultPage={1}
        count={Math.ceil(rows.totalRecords / 10) || 0}
        page={currentPage}
        onChange={handlePageChange}
      />
    </div>
  );
};

export const TableSimple = ({ rows, columns, props }: TableSimpleProps) => {
  const columnsConverter = (columns: GridColDef[]) => {
    if (!columns) {
      return [];
    }

    return columns.map((column) => ({
      ...column,
      renderCell: (params: GridRenderCellParams<any>) =>
        params.value || "vazio",
    }));
  };

  return (
    <Paper component="div" sx={{ width: "100%", overflow: "auto", padding: 2 }}>
      <DataGrid
        sx={{
          "&::-webkit-scrollbar": {
            width: "12px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#4caf50",
            borderRadius: "6px",
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
