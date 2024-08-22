import Alert from "@/components/user/Alert";
import OTP from "@/components/user/OTP";
import useApi from "@/hooks/useApi";
import { useCallback, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { useLocation, useNavigate } from "react-router-dom";

const VeifyOTP: React.FC = () => {
  const { notify } = Alert();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState<string>("");
  const [otpToken, setOtpToken] = useState<string>("");
  const { post } = useApi();
  const [cookie] = useCookies(["token"]);

  const sendMail = useCallback((email: string) => {
    (async () => {
      if (email) {
        const response = await post("get-otp", {
          email: email,
        });
        setOtpToken(response.data.otpToken);
      }
    })();
  }, []);

  useEffect(() => {
    if (location.state) {
      setEmail(location.state);
      sendMail(location.state);
    } else {
      navigate("/");
    }
  }, [location]);

  const handleChange = async (e: string) => {
    if (e.length == 6)
      try {
        const { status } = await post("verify-otp", {
          token: cookie.token,
          otpToken: otpToken,
          otp: e,
        });
        if (status == 200) {
          navigate("/change-password", { state: email });
        }
      } catch (e) {
        notify.error("Invalid OTP.");
      }
  };

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="font-bold text-2xl">Enter OTP.</h1>
          <p>We have sent you an otp at {email}.</p>
        </div>

        <div className="flex justify-center mt-3 flex-col items-center">
          <OTP onChange={handleChange} />
        </div>
      </div>
    </div>
  );
};

export default VeifyOTP;
