import { useQuery } from "react-query";
import { useApi } from "../../contexts/ApiContext";

const useGetAllUsers = () => {
  const { get } = useApi();

  return useQuery(["users"], () => {
    return get(`/users`);
  });
};

export default useGetAllUsers;
