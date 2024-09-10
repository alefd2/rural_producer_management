/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "../../components/Snackbar";
import { useApi } from "../../contexts/ApiContext";
import { CreateUserParams, CreateUserResponse } from "./@types";
import { AxiosError } from "axios";

const useUpdateUser = () => {
  const queryClient = useQueryClient();
  const { setSuccess, setError } = useSnackbar();
  const { patch } = useApi();

  return useMutation<CreateUserResponse, Error, CreateUserParams>(
    ({ user }): Promise<AxiosError | any> => {
      return patch(`/users/${user.id}`, user);
    },
    {
      onSuccess: (_, { user, closeModal }) => {
        queryClient.invalidateQueries(["users"]);
        setSuccess("Usuário atualizado com sucesso");
        closeModal();
      },
      onError: (error) => {
        if (error.message) {
          const errorMessage = error.message || "Erro desconhecido";
          setError(`Erro ao atualizar usuário: ${errorMessage}`);
          return;
        }
        setError("Erro ao atualizar produtor: Erro desconhecido");
      },
    }
  );
};

export default useUpdateUser;
