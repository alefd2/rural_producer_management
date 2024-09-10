import { useQuery } from "react-query";
import { useApi } from "../../contexts/ApiContext";

const useGetAllDashboard = () => {
  const { get } = useApi();

  return useQuery<FarmStatistics>(["dashboard"], () => {
    return get(`/dashboard/data`);
  });
};

export default useGetAllDashboard;
