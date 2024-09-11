import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField as FormikTextField } from "formik-mui";
import { useState } from "react";
import * as yup from "yup";
import useCreateUser from "../../../hooks/useUsers/useCreateUsers";
import useUpdateUser from "../../../hooks/useUsers/useEditUsers";
import { User } from "../../../hooks/useUsers/@types";

interface UserModalProps {
  isPassChange: boolean;
  open: boolean;
  handleClose: () => void;
  user?: User;
}

// Tipagem para valores iniciais
const initialUserValues: User = {
  id: "",
  name: "",
  password: "",
  active: true,
  createdAt: "",
  updatedAt: "",
};

const schemaValidation = yup.object().shape({
  name: yup
    .string()
    .required("O campo é obrigatório")
    .min(5, "O campo deve ter no mínimo 5 caracteres"),
  password: yup.string().required("O campo é obrigatório").min(3),
});

export const UserModal = ({
  open,
  handleClose,
  user = initialUserValues,
}: UserModalProps) => {
  const { mutate: addUser, isLoading: isLoadingAddUser } = useCreateUser();
  const { mutate: updateUser, isLoading: isLoadingUpdateUser } =
    useUpdateUser();

  const handleSubmituser = (newUserValues: User) => {
    if (newUserValues?.id) {
      updateUser({ user: newUserValues, closeModal: handleClose });
      return;
    }

    addUser({ user: newUserValues, closeModal: handleClose });
  };

  const initialValues = { ...initialUserValues, ...user };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmituser}
        validationSchema={schemaValidation}
      >
        {({ handleSubmit }) => (
          <Form>
            <DialogTitle>{user.id ? user.name : " Novo usuário"}</DialogTitle>
            <Divider />

            <DialogContent>
              <Grid
                paddingTop={4}
                paddingBottom={2}
                container
                direction="column"
                spacing={2}
              >
                <Typography
                  paddingX={2}
                  paddingBottom={2}
                  variant="body2"
                  color={"primary"}
                >
                  Modo de edição
                </Typography>
                <Grid item>
                  <Field
                    fullWidth
                    name="name"
                    component={FormikTextField}
                    label="Nome do usuário"
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    name="password"
                    component={FormikPasswordField}
                    label="Defina uma senha"
                  />
                </Grid>
              </Grid>
            </DialogContent>
            <Divider />
            <DialogActions>
              <Button variant="outlined" color="error" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                onClick={() => handleSubmit}
                disabled={isLoadingAddUser || isLoadingUpdateUser}
              >
                {user.id ? "Salvar" : "Inserir"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

interface FormikPasswordFieldProps {
  field: any;
  form: any;
  [key: string]: any;
}

const FormikPasswordField = ({ field, ...props }: FormikPasswordFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      {...field}
      {...props}
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleTogglePasswordVisibility}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
