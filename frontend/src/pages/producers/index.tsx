/* eslint-disable @typescript-eslint/no-explicit-any */
import { Delete, Edit } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { GridRenderCellParams } from "@mui/x-data-grid";
import { ProducersModal } from "./components/ProducersModal";
import { useState } from "react";
import useGetAllProducers from "../../hooks/useProducers/useGetAllProducers";
import { TableSimple } from "../../components/CustonTable/Index";
import { ToolsBar } from "../../components/toolsBar";
import { CustomGridColDef } from "../../components/CustonTable/@types";
import useDeleteProducers from "../../hooks/useProducers/useDeleteProducers";
import { useModal } from "../../components/ConfirmModal";

export function ProducersPage() {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [dataEdit, setDataEdit] = useState();
  const { mutate: deleteProducer } = useDeleteProducers();
  const { data = [] } = useGetAllProducers();

  const { confirm } = useModal();

  const handleClose = () => setModalOpen(false);

  const handleModalEdit = (user: any) => {
    setModalOpen(true);
    setDataEdit(user);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
    setDataEdit(undefined);
  };

  const columns: CustomGridColDef[] = [
    // { field: "id", headerName: "Código", width: 300 },
    { field: "producerName", headerName: "Produtores", width: 250 },
    { field: "farmNAme", headerName: "Fazenda", width: 180 },
    { field: "document", headerName: "Documento", width: 180 },
    { field: "city", headerName: "Cidade", width: 120 },
    { field: "state", headerName: "Estado", width: 120 },
    {
      field: "plantedCrops",
      headerName: "Culturas",
      width: 180,
    },
    { field: "areaInHectares", headerName: "Fazenda/hectares", width: 150 },
    { field: "arableAreaInHectares", headerName: "Área Arável", width: 150 },
    {
      field: "vegetationAreaInHectares",
      headerName: "Vegetação/hectares",
      width: 150,
    },
    {
      field: "",
      headerName: "Ações",
      width: 220,
      renderCell: ({ row }: GridRenderCellParams) => (
        <Box>
          <IconButton onClick={() => handleModalEdit(row)}>
            <Edit />
          </IconButton>
          <IconButton
            color="error"
            onClick={() => {
              confirm({
                title: "Confirmar Ação",
                message: `Deseja continuar? O registro com nome [${row.producerName}] será deletado!`,
                cancelLabel: "Cancelar",
                okFunction: () => deleteProducer({ producers: row }),
              });
            }}
          >
            <Delete />
          </IconButton>
        </Box>
      ),
    },
  ];

  return (
    <>
      <Box mb={6}>
        <Typography mb={1} variant="h4">
          Produtores
        </Typography>
      </Box>
      <Box display={"flex"} flexDirection={"column"} gap={2}>
        <ProducersModal
          handleClose={handleClose}
          open={modalOpen}
          producers={dataEdit}
          isPassChange
        />

        <ToolsBar
          hasStatusFilter={false}
          clickButtonNew={handleOpenModal}
          textButton="Adicionar novo produtor"
          showInputSearch={false}
        />
        <TableSimple rows={data} columns={columns} />
      </Box>
    </>
  );
}
