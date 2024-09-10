import { ReactNode } from "react";
import { Card, Typography } from "@mui/material";
import { Box } from "@mui/system";

interface CustonCardProps {
  destaque?: string;
  name: string;
  content: string;
  width?: string;
  CustonIcon: ReactNode;
}

export const CustonCard = ({
  destaque,
  name,
  content,
  width = "100%",
  CustonIcon,
}: CustonCardProps) => {
  const destaque_ = destaque ? destaque : "#fff";

  return (
    <Card
      sx={{
        padding: "15px",
        width: width,
        maxWidth: "30%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        borderRadius: "15px",
        background: destaque_,
        boxShadow: "0px 0px 11.8px 0px rgba(81, 150, 255, 0.08)",
        "&:hover": {
          boxShadow: "0px 0px 11.8px 0px rgba(81, 151, 255, 0.288)",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "10px",
          alignItems: "flex-start",
        }}
      >
        {CustonIcon}
        <Box>
          <Typography color="#5B5B5B" fontSize={16}>
            {name}
          </Typography>
          <Typography variant="h4">{content}</Typography>
        </Box>
      </Box>
    </Card>
  );
};
