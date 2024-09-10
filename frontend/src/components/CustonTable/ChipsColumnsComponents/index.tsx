/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable prefer-const */
import { styled } from "@mui/material";
import { Box, Stack } from "@mui/system";
import { FlowArrow } from "@phosphor-icons/react";

interface DefaultBadgeProps {
  data: string[];
}

// FullWidthChip sem necessidade de tipagem adicional
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FullWidthChip = styled(Stack)(({ theme }) => ({
  padding: "4px",
  display: "flex",
  borderRadius: "6px",
  border: "1px dashed rgba(0, 0, 0, 0.26) ",
  "&hover": {
    background: "rgba(0, 0, 0, 1.651)",
  },
}));

// eslint-disable-next-line react-refresh/only-export-components
const DefaultBadge = ({ data }: DefaultBadgeProps) => {
  return (
    <>
      {data.map((data, index) => (
        <Stack
          key={index}
          sx={{
            backgroundColor: "#44756226",
            padding: "4px 6px",
            borderRadius: "8px",
          }}
          mr={1}
          direction="row"
          spacing={1}
        >
          <FlowArrow
            size={18}
            onClick={() => console.log(data)}
            style={{ cursor: "pointer" }}
          />
          <Box sx={{ fontSize: "12px" }} color="info">
            {data}
          </Box>
        </Stack>
      ))}
    </>
  );
};

// Exportando os componentes com a tipagem
export const ChipList = {
  DefaultBadge,
};
