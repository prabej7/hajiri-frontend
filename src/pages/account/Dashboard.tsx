import AccountSection from "@/components/user/AccountSection";
import Tables from "../../components/Accounts/TablesPage/Table";
import { useUser } from "@/Providers/UserContext";
import Loading from "@/components/user/Loading";

const Dashboard: React.FC = () => {
  const { isLoading } = useUser();
  if (isLoading) return <Loading />;
  return (
    <AccountSection title="Dashboard">
      <Tables />
    </AccountSection>
  );
};

export default Dashboard;
