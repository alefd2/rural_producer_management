/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "../../components/Snackbar";
import { useApi } from "../../contexts/ApiContext";
import { CreateProducersParams, CreateProducersResponse } from "./@types";
import { AxiosError } from "axios";

const useCreateProducers = () => {
  const queryClient = useQueryClient();
  const { setSuccess, setError } = useSnackbar();
  const { post } = useApi();

  return useMutation<
    CreateProducersResponse,
    AxiosError,
    CreateProducersParams
  >(
    ({ producers }): Promise<AxiosError | any> => {
      return post("/producers", producers);
    },
    {
      onSuccess: (_, { closeModal }) => {
        queryClient.invalidateQueries(["producers"]);
        setSuccess("Produtor criado com sucesso");
        closeModal();
      },
      onError: (err: AxiosError) => {
        const error = err.message || "Erro desconhecido";
        setError(error);
      },
    }
  );
};

export default useCreateProducers;
