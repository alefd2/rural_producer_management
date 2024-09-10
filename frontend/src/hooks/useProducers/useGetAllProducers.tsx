import { useQuery } from "react-query";
import { useApi } from "../../contexts/ApiContext";

const useGetAllProducers = () => {
  const { get } = useApi();

  return useQuery(["producers"], () => {
    return get(`/producers`);
  });
};

export default useGetAllProducers;
