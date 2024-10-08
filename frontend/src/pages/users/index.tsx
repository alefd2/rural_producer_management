import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { TableSimple } from "../../components/CustonTable/Index";
import { Edit } from "@mui/icons-material";
import { useState } from "react";
import useGetAllUsers from "../../hooks/useUsers/useGetAllUsers";
import { UserModal } from "./components/UserModal";

export function UsersPage() {
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [userEdit, setUserEdit] = useState();
  const [isPassChange] = useState(false);
  // const debouncedFilter = useDebouncedValue(filter, 500);
  const { data = [] } = useGetAllUsers();

  // const { mutate: deleteUser } = useDeleteUser();

  const handleClose = () => setUserModalOpen(false);

  const handleModalEdit = (user: any) => {
    setUserModalOpen(true);
    setUserEdit(user);
  };

  const columns: GridColDef[] = [
    { field: "id", headerName: "Código", width: 300 },
    { field: "name", headerName: "Usuário", width: 250 },
    // { field: "password", headerName: "Chave entidade", width: 250 },
    // { field: "createdAt", headerName: "Criação", width: 250 },
    // { field: "updatedAt", headerName: "Última atualização", width: 250 },
    {
      field: "",
      headerName: "Ações",
      width: 220,
      renderCell: ({ row }: GridRenderCellParams) => (
        <Box>
          <IconButton onClick={() => handleModalEdit(row)}>
            <Edit />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box mb={6}>
        <Typography mb={1} variant="h4">
          Usuários
        </Typography>
      </Box>
      <UserModal
        handleClose={handleClose}
        open={userModalOpen}
        isPassChange={isPassChange}
        user={userEdit}
      />
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <TableSimple rows={data} columns={columns} />
      </Box>
    </>
  );
}
