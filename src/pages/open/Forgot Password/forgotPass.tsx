import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import FormError from "@/components/user/FormError";
import useApi from "@/hooks/useApi";
import { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPass: React.FC = () => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const { post } = useApi();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email.length > 0) {
      try {
        await post("check-user", { email: email });
        navigate("/verify-otp", { state: email });
      } catch (e) {
        const error = e as AxiosError;
        if (error.response?.status == 404)
          return setError("Email doesn't exists!");
        setError("Something went wrong.");
      }
    } else {
      setError("Email is required!");
    }
  };

  return (
    <div className="h-screen w-screen flex justify-center flex-col items-center">
      <div className="flex gap-12 border p-12 rounded-lg">
        <div>
          <h1 className="font-bold text-xl">Forgot your password ?</h1>
          <p>Type in your email for verification.</p>
        </div>
        <div className="border"></div>
        <div>
          <form
            action=""
            className="flex flex-col gap-3"
            onSubmit={handleSubmit}
          >
            <Input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit">Submit</Button>
            {error && <FormError text={error} />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPass;
