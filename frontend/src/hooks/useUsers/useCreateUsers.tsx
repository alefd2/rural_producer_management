/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "../../components/Snackbar";
import { useApi } from "../../contexts/ApiContext";
import { CreateUserParams, CreateUserResponse } from "./@types";

const useCreateUser = () => {
  const queryClient = useQueryClient();
  const { setSuccess, setError } = useSnackbar();
  const { post } = useApi();

  return useMutation<CreateUserResponse, Error, CreateUserParams>(
    ({ user }): any => {
      return post("/users/create", user);
    },
    {
      onSuccess: (_, { closeModal }) => {
        queryClient.invalidateQueries(["users"]);
        setSuccess("Usuário criado com sucesso");
        closeModal();
      },
      onError: (err: Error) => {
        const error = err.message || "Erro desconhecido";
        setError(error);
      },
    }
  );
};

export default useCreateUser;
