/* eslint-disable @typescript-eslint/no-unused-vars */
import { CircularProgress, Grid, Typography } from "@mui/material";
import { Box, useTheme } from "@mui/system";
import useGetAllDashboard from "../../hooks/useDashboards/useGetAllData";
import { CustonCard } from "../../components/Card";
import { Farm } from "@phosphor-icons/react";
import { PieChartComponent } from "./components/GraphComponent";

export function HomePage() {
  const theme = useTheme();
  const { data, isLoading } = useGetAllDashboard();

  const {
    totalFarms = 0,
    totalAreaInHectares = 0,
    farmsByState = [],
    farmsByCrops = [],
    landUse = { arableAreaInHectares: 0, vegetationAreaInHectares: 0 },
  } = data || {};

  const landUseData = {
    labels: ["Área Agricultável", "Vegetação"],
    datasets: [
      {
        data: [landUse.arableAreaInHectares, landUse.vegetationAreaInHectares],
        backgroundColor: [
          theme.palette.success.main,
          theme.palette.warning.main,
        ],
      },
    ],
  };

  const stateData = {
    labels: farmsByState.map((item) => item.state),
    datasets: [
      {
        data: farmsByState.map((item) => item.count),
        backgroundColor: ["#ec8686", "#36e5eb", "#f3d999"],
      },
    ],
  };

  const cropsData = {
    labels: farmsByCrops.map((item) => item.crop),
    datasets: [
      {
        data: farmsByCrops.map((item) => item.count),
        backgroundColor: [
          "#ec8686",
          "#36e5eb",
          "#f3d999",
          "#a1f399",
          "#99b1f3",
          "#f399e4",
        ],
      },
    ],
  };

  return (
    <>
      <Box mb={4}>
        <Typography mb={0} variant="h6" color="primary">
          Bem-vindo à plataforma de gestão
        </Typography>
        <Typography mb={0} variant="body2" color="secondary">
          Deixamos tudo atualizado para você!
        </Typography>
      </Box>
      {isLoading && <CircularProgress />}
      <Grid
        display={"flex"}
        flexDirection={"row"}
        width={"100%"}
        height={110}
        gap={1}
        marginBottom={1}
      >
        <CustonCard
          content={String(totalFarms)}
          name={"Quantidade de fazendas"}
          CustonIcon={<Farm size={25} color={"#008b55"} />}
        />
        <CustonCard
          content={String(totalAreaInHectares)}
          name={"Total de hectares/Fazenda"}
          CustonIcon={<Farm size={25} color={"#008b55"} />}
        />
      </Grid>

      <Grid
        container
        spacing={2}
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          marginTop: 3,
        }}
      >
        <Grid item xs={12} md={4}>
          <Box sx={{ padding: 2 }}>
            {farmsByState.length > 0 ? (
              <PieChartComponent
                data={stateData}
                title="Distribuição por Estado"
              />
            ) : (
              <Typography variant="body2">Nenhum dado disponível</Typography>
            )}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <Box sx={{ padding: 2 }}>
            {farmsByCrops.length > 0 ? (
              <PieChartComponent
                data={cropsData}
                title="Distribuição por Cultura"
              />
            ) : (
              <Typography variant="body2">Nenhum dado disponível</Typography>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ padding: 2 }}>
            <PieChartComponent
              data={landUseData}
              title="Distribuição do Uso do Solo"
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
