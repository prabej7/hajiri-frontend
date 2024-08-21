import User from "@/constants/types/user";
import url from "@/constants/url";
import axios from "axios";
import { createContext, useContext } from "react";
import { useCookies } from "react-cookie";
import { useQuery } from "react-query";

interface ContextType {
  user: User;
  isError: boolean;
  isLoading: boolean;
}

interface ProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<ContextType | undefined>(undefined);

const UserProvider: React.FC<ProviderProps> = ({ children }) => {
  const [cookie] = useCookies(["token"]);

  const {
    data: user,
    isLoading,
    isError,
  } = useQuery({
    queryFn: async () => {
      const { data } = await axios.post(`${url}get-user`, {
        token: cookie.token,
      });
 
      return data;
    },
    queryKey: ["user"],
    enabled: !!cookie.token,
  });

  return (
    <UserContext.Provider value={{ user, isError, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
