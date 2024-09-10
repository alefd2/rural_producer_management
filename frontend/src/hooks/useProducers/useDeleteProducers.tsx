/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "../../components/Snackbar";
import { useApi } from "../../contexts/ApiContext";
import { CreateProducersParams, CreateProducersResponse } from "./@types";
import { AxiosError } from "axios";

const useDeleteProducers = () => {
  const queryClient = useQueryClient();
  const { setSuccess, setError } = useSnackbar();
  const { _delete } = useApi();

  return useMutation<CreateProducersResponse, AxiosError, any>(
    ({ producers }): Promise<AxiosError | any> => {
      console.log(producers);
      return _delete(`/producers/${producers?.id}`);
    },
    {
      onSuccess: (_, { producers }) => {
        queryClient.invalidateQueries(["producers"]);
        setSuccess("Produtor deletado com sucesso");
      },
      onError: (err) => {
        const error = err.message;
        setError(error);
      },
    }
  );
};

export default useDeleteProducers;
