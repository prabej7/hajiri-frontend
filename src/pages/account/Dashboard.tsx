import AccountSection from "@/components/user/AccountSection";
import Tables from "../../components/Accounts/TablesPage/Table";
import { useUser } from "@/Providers/UserContext";
import Loading from "@/components/user/Loading";
import { useEffect, useState } from "react";
import axios from "axios";
import url from "@/constants/url";
import Table from "@/constants/types/table";
import Verify from "./Verify";

const Dashboard: React.FC = () => {
  const { isLoading, user } = useUser();
  if (isLoading) return <Loading />;

  const [table, setTable] = useState<Table>();

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${url}recent`);
      console.log(response);
      if (response.data) {
        setTable(response.data);
      }
    })();
  }, []);

  if (user && !user.isVerified) return <Verify />;

  return (
    <AccountSection title="Dashboard">
      <Tables table={table} />
    </AccountSection>
  );
};

export default Dashboard;
