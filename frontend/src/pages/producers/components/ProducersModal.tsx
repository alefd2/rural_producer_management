/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  Typography,
  TextField as MUITextField,
  Autocomplete,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { TextField as FormikTextField } from "formik-mui";
import * as yup from "yup";
import useCreateProducers from "../../../hooks/useProducers/useCreateProducers";
import { Producers } from "../../../hooks/useProducers/@types";
import useUpdateProducers from "../../../hooks/useProducers/useEditProducers";
import { AuthContextType } from "../../../contexts/@types";
import { useAuth } from "../../../contexts/AuthContext";

interface ProducersModalProps {
  isPassChange: boolean;
  open: boolean;
  handleClose: () => void;
  producers?: Producers;
}

// Tipagem para valores iniciais
const initialProducerValues: Producers = {
  arableAreaInHectares: 0,
  areaInHectares: 0,
  vegetationAreaInHectares: 0,
  city: "",
  document: "",
  farmNAme: "",
  plantedCrops: [],
  producerName: "",
  state: "",
  usersId: "",
};

const allowedCrops = [
  "Soja",
  "Milho",
  "Algodão",
  "Café",
  "Cana de Açúcar",
] as const;

const schemaValidation = yup.object().shape({
  arableAreaInHectares: yup
    .number()
    .required("O campo é obrigatório")
    .min(0, "O valor deve ser maior ou igual a 0"),
  areaInHectares: yup
    .number()
    .required("O campo é obrigatório")
    .min(0, "O valor deve ser maior ou igual a 0"),
  vegetationAreaInHectares: yup
    .number()
    .required("O campo é obrigatório")
    .min(0, "O valor deve ser maior ou igual a 0"),
  city: yup.string().required("O campo é obrigatório"),
  state: yup
    .string()
    .required("O campo é obrigatório")
    .length(2, "O campo deve ter exatamente 2 caracteres"),
  document: yup.string().required("O campo é obrigatório"),
  farmNAme: yup.string().required("O campo é obrigatório"),
  producerName: yup.string().required("O campo é obrigatório"),
  // plantedCrops: yup.string().required("O campo é obrigatório"),
  // usersId: yup.string().required("O campo é obrigatório"),
});

export const ProducersModal = ({
  open,
  handleClose,
  producers = initialProducerValues,
}: ProducersModalProps) => {
  const { authLoginResponse } = useAuth() as AuthContextType;
  const { mutate: addProducer, isLoading: isLoadingAddProducer } =
    useCreateProducers();

  const { mutate: updateProducer, isLoading: isLoadingUpdateProducer } =
    useUpdateProducers();

  const handleSubmitData = (newProducerValues: Producers) => {
    if (newProducerValues?.id) {
      updateProducer({ producers: newProducerValues, closeModal: handleClose });
      return;
    }

    newProducerValues.usersId = authLoginResponse.userId;
    console.log(newProducerValues);

    addProducer({ producers: newProducerValues, closeModal: handleClose });
  };

  const initialValues = { ...initialProducerValues, ...producers };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmitData}
        validationSchema={schemaValidation}
      >
        {({ setFieldValue, values, handleSubmit, errors }) => (
          <Form>
            <DialogTitle>
              {producers.id ? producers.farmNAme : " Novo usuário"}
            </DialogTitle>
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
                    name="producerName"
                    component={FormikTextField}
                    label="Produtor"
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    name="farmNAme"
                    component={FormikTextField}
                    label="Nome da fazenda"
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    name="document"
                    component={FormikTextField}
                    label="Documento"
                  />
                </Grid>{" "}
                <Grid item>
                  <Field
                    fullWidth
                    name="city"
                    component={FormikTextField}
                    label="Cidade"
                  />
                </Grid>{" "}
                <Grid item>
                  <Field
                    fullWidth
                    name="state"
                    component={FormikTextField}
                    label="Estado"
                  />
                </Grid>{" "}
                <Grid item>
                  <Autocomplete
                    multiple
                    options={allowedCrops}
                    value={values.plantedCrops as string[]}
                    onChange={(event, newValue) => {
                      setFieldValue(
                        "plantedCrops",
                        Array.isArray(newValue) ? newValue : []
                      );
                    }}
                    renderInput={(params) => (
                      <MUITextField
                        {...params}
                        label="Culturas"
                        placeholder="Selecione as culturas"
                      />
                    )}
                    disableCloseOnSelect
                    getOptionLabel={(option) => option as string}
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    name="areaInHectares"
                    component={FormikTextField}
                    label="Fazenda/hectares"
                    type="number"
                    InputProps={{ inputProps: { min: 0, step: "any" } }}
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    name="arableAreaInHectares"
                    component={FormikTextField}
                    label="Área Arável"
                    type="number"
                    InputProps={{ inputProps: { min: 0, step: "any" } }}
                  />
                </Grid>
                <Grid item>
                  <Field
                    fullWidth
                    name="vegetationAreaInHectares"
                    component={FormikTextField}
                    label="Vegetação/hectares"
                    type="number"
                    InputProps={{ inputProps: { min: 0, step: "any" } }}
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
                disabled={isLoadingAddProducer || isLoadingUpdateProducer}
              >
                {producers.id ? "Salvar" : "Inserir"}
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};
