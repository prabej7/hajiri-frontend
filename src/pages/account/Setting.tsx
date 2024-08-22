import { Button } from "@/components/ui/button";
import AccountSection from "@/components/user/AccountSection";
import ChangePassword from "@/components/user/ChangePassword";
import Loading from "@/components/user/Loading";
import useApi from "@/hooks/useApi";
import { useUser } from "@/Providers/UserContext";
import { useCookies } from "react-cookie";

const Setting: React.FC = () => {
  const { isLoading, user } = useUser();
  const [cookie, _, removeCookie] = useCookies(["token"]);
  const { post } = useApi();
  const handleDeleteAccount = async () => {
    try {
      const { status } = await post("delete-user", {
        token: cookie.token,
      });
      if (status == 200) {
        removeCookie("token");
      }
    } catch (e) {}
  };
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
        <Button variant="destructive" onClick={handleDeleteAccount}>
          Delete account
        </Button>
      </div>
    </AccountSection>
  );
};

export default Setting;
