import url from "@/constants/url";
import axios, { AxiosResponse } from "axios";

const useApi = () => {
  const post = async (route: string, data: any): Promise<AxiosResponse> => {
    const response: AxiosResponse = await axios.post(`${url}${route}`, data);
    return response;
  };

  return { post };
};

export default useApi;
