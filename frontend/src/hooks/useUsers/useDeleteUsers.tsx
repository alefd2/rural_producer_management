/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation, useQueryClient } from "react-query";
import { useSnackbar } from "../../components/Snackbar";
import { useApi } from "../../contexts/ApiContext";
import { CreateUserParams, CreateUserResponse } from "./@types";

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { setSuccess, setError } = useSnackbar();
  const { _delete } = useApi();

  return useMutation<CreateUserResponse, Error, CreateUserParams>(
    ({ user }): any => {
      return _delete(`/users/${user.id}`);
    },
    {
      onSuccess: (_, { user, closeModal }) => {
        queryClient.invalidateQueries(["users"]);
        setSuccess("Usuário deletado com sucesso");
        closeModal();
      },
      onError: (err) => {
        const error = err.message;
        setError(error);
      },
    }
  );
};

export default useDeleteUser;
