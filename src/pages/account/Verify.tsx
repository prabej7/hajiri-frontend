import Alert from "@/components/user/Alert";
import Loading from "@/components/user/Loading";
import OTP from "@/components/user/OTP";
import useApi from "@/hooks/useApi";
import { useUser } from "@/Providers/UserContext";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

const Verify: React.FC = () => {
  const [cookie] = useCookies(["token"]);
  const { notify } = Alert();
  const [otpToken, setOtpToken] = useState<string>("");
  const { user, isLoading } = useUser();
  if (isLoading) return <Loading />;
  const { post } = useApi();

  const sendMail = useCallback(() => {
    (async () => {
      const response = await post("get-otp", {
        token: cookie.token,
      });
      setOtpToken(response.data.otpToken);
    })();
  }, []);

  useEffect(() => {
    sendMail();
  }, []);

  const handleCheck = async (e: string) => {
    if (e.length == 6)
      try {
        const { status } = await post("verify-otp", {
          token: cookie.token,
          otpToken: otpToken,
          otp: e,
        });
        if (status == 200) {
          window.location.reload();
        }
      } catch (e) {
        notify.error("Invalid OTP.");
      }
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center flex-col gap-3">
      <div className="flex flex-col justify-center items-center">
        <h1 className="font-bold text-xl">Email Verification</h1>
        <p>We have sent you an OTP at {user.email}.</p>
      </div>
      <OTP onChange={handleCheck} />
    </div>
  );
};

export default Verify;
