import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef, GridRowsProp } from "@mui/x-data-grid";
import { TableSimple } from "../../components/CustonTable/Index";

export function UsersPage() {
  const rows: GridRowsProp = [
    {
      id: 1,
      user_name: "John Doe",
      key_entity: "12345",
      email: "john.doe@example.com",
      type: "Admin",
      company_name: "Company A",
    },
    {
      id: 2,
      user_name: "Jane Smith",
      key_entity: "67890",
      email: "jane.smith@example.com",
      type: "User",
      company_name: "Company B",
    },
  ];
  const columns: GridColDef[] = [
    { field: "id", headerName: "Código", width: 100 },
    { field: "user_name", headerName: "Usuário", width: 250 },
    { field: "key_entity", headerName: "Chave entidade", width: 220 },
    { field: "email", headerName: "Email", width: 220 },
    { field: "type", headerName: "Tipo", width: 160 },
    { field: "company_name", headerName: "Empresa", width: 180 },
  ];
  return (
    <>
      <Box mb={6}>
        <Typography mb={1} variant="h4">
          Usuários
        </Typography>

        <TableSimple rows={rows} columns={columns} />
      </Box>
    </>
  );
}
