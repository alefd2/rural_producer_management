import {
  Box,
  Button,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Theme,
} from "@mui/material";
import { Eye, EyeClosed } from "@phosphor-icons/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "@mui/system";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [savePassword, setSavePassword] = useState<boolean>(false);

  const theme = useTheme<Theme>();
  const { authClient } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (user && password) {
      localStorage.setItem("user", JSON.stringify(user));

      if (savePassword) {
        localStorage.setItem("password", JSON.stringify(password));
      }

      setLoading(true);
      await authClient(user, password);
      navigate("/home");
      setLoading(false);
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSavePassword = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;
    setSavePassword(checked);

    if (!checked) {
      localStorage.removeItem("password");
    }
  };

  useEffect(() => {
    const userStorage = localStorage.getItem("user");
    const passwordStorage = localStorage.getItem("password");

    if (userStorage) {
      setUser(JSON.parse(userStorage));
    }

    if (passwordStorage) {
      setSavePassword(true);
      setPassword(JSON.parse(passwordStorage));
    }
  }, []);

  return (
    <Box
      height="100vh"
      width="100vw"
      display="flex"
      alignItems="center"
      flexDirection="column"
      justifyContent="center"
      sx={{
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* box background */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        zIndex={-1}
        sx={{
          backgroundColor: "#F5F5F5",
          backgroundRepeat: "no-repeat",
          backdropFilter: "opacity(0.5)",
        }}
      />
      <Box
        onSubmit={handleSubmit}
        component="form"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flex={1}
      >
        <Card
          elevation={0}
          sx={{
            padding: theme.spacing(6),
            margin: theme.spacing(2),
            width: theme.spacing(60),
            borderRadius: "16px",
            position: "relative",
            zIndex: 1,
          }}
        >
          <Grid container direction="column" spacing={3}>
            <Grid item>
              <TextField
                fullWidth
                required
                label="Usuário"
                id="user"
                name="user"
                value={user}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setUser(event.target.value)
                }
                variant="outlined"
                color="primary"
                InputProps={{
                  style: {
                    background: "rgba(182, 182, 182, 0.199)",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "#616161",
                  },
                }}
                sx={{
                  marginTop: theme.spacing(1),
                  "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "2px",
                      borderColor: "transparent",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: theme.palette.text.primary,
                  },
                }}
              />
            </Grid>

            <Grid item>
              <TextField
                fullWidth
                required
                label="Senha"
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                variant="outlined"
                color="primary"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleTogglePasswordVisibility}>
                        {showPassword ? <EyeClosed /> : <Eye />}
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    background: "rgba(182, 182, 182, 0.199)",
                  },
                }}
                InputLabelProps={{
                  sx: {
                    color: "#616161 ",
                  },
                }}
                sx={{
                  marginTop: theme.spacing(1),
                  "& .MuiOutlinedInput-root": {
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderWidth: "2px",
                      borderColor: "transparent",
                    },
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                  "& .MuiOutlinedInput-input": {
                    color: theme.palette.text.primary,
                  },
                }}
              />
            </Grid>

            <Grid item>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={savePassword}
                    onChange={handleSavePassword}
                  />
                }
                label={"Salvar senha"}
              />
            </Grid>
            <Grid item>
              <Button
                fullWidth
                type="submit"
                color="primary"
                variant="contained"
                disabled={loading}
              >
                Login
              </Button>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Box>
  );
};
