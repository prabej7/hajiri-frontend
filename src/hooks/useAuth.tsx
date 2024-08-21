import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import useApi from "./useApi";

const useAuth = () => {
  const navigate = useNavigate();
  const [cookie] = useCookies(["token"]);
  const { post } = useApi();

  const authenticate = async () => {
    try {
      await post("get-user", {
        token: cookie.token,
      });
    } catch (e) {
      const error = e as AxiosError;
      if (error.response?.status !== 200) {
        navigate("/login");
      }
    }
  };
  useEffect(() => {
    if (!cookie.token) return navigate("/login");
    authenticate();
  }, [cookie.token]);
};

export default useAuth;
