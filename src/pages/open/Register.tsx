import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Section from "@/components/user/Section";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useApi from "@/hooks/useApi";
import { useCookies } from "react-cookie";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

const schema = z.object({
  email: z.string().min(1, {
    message: "Field is required.",
  }),
  password: z.string().min(8, {
    message: "Password must contain 8 characters.",
  }),
});

type formFields = z.infer<typeof schema>;

const Register: React.FC = () => {
  const [showPass, setShowPass] = useState<boolean>(false);
  const [_, setCookie] = useCookies(["token"]);
  const navigate = useNavigate();
  const { post } = useApi();
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    setError,
  } = useForm<formFields>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: formFields) => {
    try {
      const response = await post("register", formData);
      const threeMonthsFromNow = new Date();
      threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
      setCookie("token", response.data.token, { expires: threeMonthsFromNow });
      navigate("/account");
    } catch (e) {
      setError("root", { message: "Something went wrong!" });
    }
  };
  const togglePass = () => {
    setShowPass(!showPass);
  };
  return (
    <Section>
      <div className="flex justify-center items-center h-screen flex-col gap-3">
        <h1 className="text-2xl font-bold">Register</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
          {errors.root && (
            <p className="text-red-500 text-center">{errors.root.message}</p>
          )}
          <Input placeholder="Email" {...register("email")} />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
          <div className="relative">
            <Input
              placeholder="Password"
              type={showPass ? "text" : "password"}
              {...register("password")}
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
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
          <Button disabled={isSubmitting}>Register</Button>
        </form>
        <p className="text-sm">
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </Section>
  );
};

export default Register;
