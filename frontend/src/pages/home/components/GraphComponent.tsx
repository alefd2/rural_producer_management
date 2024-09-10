import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from "chart.js";
import { Box } from "@mui/system";
import { Typography } from "@mui/material";

ChartJS.register(Title, Tooltip, Legend, ArcElement);

interface PieChartProps {
  title: string;
  data: {
    labels: string[];
    datasets: {
      data: number[];
      backgroundColor: string[];
    }[];
  };
}

export const PieChartComponent = ({ data, title }: PieChartProps) => {
  const options = {
    plugins: {
      legend: {
        display: true,
        position: "right" as const,
        align: "center" as const,
      },
      tooltip: {
        enabled: true,
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <Box
      sx={{
        padding: "20px",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        borderRadius: "15px",
        background: "#fff",
        boxShadow: "0px 0px 11.8px 0px rgba(81, 150, 255, 0.08)",
        "&:hover": {
          boxShadow: "0px 0px 11.8px 0px rgba(81, 151, 255, 0.288)",
        },
      }}
    >
      <Typography mb={2} variant="body2">
        {title}
      </Typography>

      <Box sx={{ width: "100%", height: 300 }}>
        <Pie data={data} options={options} />
      </Box>
    </Box>
  );
};
