/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "../../components/Snackbar";
import { useApi } from "../../contexts/ApiContext";
import { CreateProducersParams, CreateProducersResponse } from "./@types";
import { AxiosError } from "axios";

const useUpdateProducers = () => {
  const queryClient = useQueryClient();
  const { setSuccess, setError } = useSnackbar();
  const { patch } = useApi();

  return useMutation<
    CreateProducersResponse,
    AxiosError,
    CreateProducersParams
  >(
    ({ producers }): Promise<AxiosError | any> => {
      return patch(`/producers/${producers.id}`, producers);
    },
    {
      onSuccess: (_, { closeModal }) => {
        queryClient.invalidateQueries(["producers"]);
        setSuccess("Produtor atualizado com sucesso");
        closeModal();
      },
      onError: (error) => {
        console.log(error);
        if (error.message) {
          const errorMessage = error.message || "Erro desconhecido";
          setError(`Erro ao atualizar produtor: ${errorMessage}`);
          return;
        }
        setError("Erro ao atualizar produtor: Erro desconhecido");
      },
    }
  );
};

export default useUpdateProducers;
