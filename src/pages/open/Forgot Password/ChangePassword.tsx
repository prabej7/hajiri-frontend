import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormError from "@/components/user/FormError";
import { useEffect, useState } from "react";
import useApi from "@/hooks/useApi";
import { useLocation, useNavigate } from "react-router-dom";

const schema = z.object({
  newPassword: z.string().min(8, {
    message: "Password must contain at least 8 characters.",
  }),
  confirmPassword: z.string(),
});

type formField = z.infer<typeof schema>;

const ChangePassword: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { post } = useApi();
  const [showPass, setShowPass] = useState<boolean>(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<formField>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (!location.state) {
      navigate("/");
    }
  }, [location]);

  const onSubmit = async (formData: formField) => {
    const { confirmPassword, newPassword } = formData;
    if (confirmPassword !== newPassword) {
      return setError("root", { message: "Password must match." });
    }

    try {
      const { status } = await post("change-password-otp", {
        email: location.state,
        password: newPassword,
      });
      if (status == 200) {
        navigate("/login");
      }
    } catch (e) {
      setError("root", { message: "Something went wrong!" });
    }
  };

  const togglePass = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="flex h-screen w-screen justify-center items-center">
      <div className="flex gap-6 border p-12 rounded-lg">
        <div>
          <h1 className="font-bold text-xl">Change Password.</h1>
          <p>Type in the new password.</p>
        </div>
        <div className="border"></div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="relative">
            <Input
              placeholder="New password"
              type={showPass ? "text" : "password"}
              {...register("newPassword")}
            />
            {showPass ? (
              <FaEye
                className="absolute z-10 top-[10px] right-4 cursor-pointer"
                onClick={togglePass}
              />
            ) : (
              <FaEyeSlash
                className="absolute z-10 top-[10px] right-4 cursor-pointer"
                onClick={togglePass}
              />
            )}
          </div>

          <Input
            placeholder="Confirm Password"
            {...register("confirmPassword")}
            type="password"
          />
          {errors.newPassword && errors.newPassword.message && (
            <FormError text={errors.newPassword.message} />
          )}
          {errors.root && errors.root.message && (
            <FormError text={errors.root.message} />
          )}
          <Button>Change Password</Button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
