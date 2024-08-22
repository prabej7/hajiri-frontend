
import AccountSection from "@/components/user/AccountSection";
import ChangePassword from "@/components/user/ChangePassword";
import Loading from "@/components/user/Loading";
import { useUser } from "@/Providers/UserContext";

const Setting: React.FC = () => {
  const { isLoading, user } = useUser();

  if (isLoading) return <Loading />;
  return (
    <AccountSection title="Account Setting">
        
      <div className="flex gap-24">
        <div>
          <ul className="flex flex-col gap-2">
            <li>Email</li>
            <li>Password</li>
          </ul>
        </div>
        <div>
          <ul className="flex flex-col gap-2 justify-center">
            <li>{user.email}</li>
            <li>
            <ChangePassword />
            </li>
          </ul>
        </div>
      </div>
    </AccountSection>
  );
};

export default Setting;
