import { Typography } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid/Grid";

function ErrorPage() {
  return (
    <Grid
      sx={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "100px",
      }}
    >
      <Grid>
        <Typography sx={{ color: "#727272" }} variant="h1" gutterBottom>
          Oops!
        </Typography>
        <Typography sx={{ color: "#727272" }} variant="h5" gutterBottom>
          Algo deu errado.
        </Typography>
        <Typography sx={{ color: "#727272" }} variant="h5" gutterBottom>
          Por favor, tente novamente mais tarde.
        </Typography>
      </Grid>
    </Grid>
  );
}

export default ErrorPage;
