import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormError from "./FormError";
import useApi from "@/hooks/useApi";
import { useUser } from "@/Providers/UserContext";

const schema = z.object({
  currentPassword: z.string().min(1, {
    message: "Email is required",
  }),
  password: z.string().min(8, {
    message: "Password must contain 8 characters.",
  }),
});

type formField = z.infer<typeof schema>;

const ChangePassword: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<formField>({
    resolver: zodResolver(schema),
  });

  const { user } = useUser();

  const { post } = useApi();

  const onSubmit = async (formData: formField) => {
    try {
      const response = await post("change-password", {
        email: user.email,
        ...formData,
      });

      console.log(response);
    } catch (e) {}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link">Change Password</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>
          <DialogDescription>
            Make changes to your password here. Click save when you're done.
            {errors.password && errors.password.message && (
              <FormError text={errors.password.message} />
            )}
            {errors.currentPassword && errors.currentPassword.message && (
              <FormError text={errors.currentPassword.message} />
            )}
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Current Password
            </Label>
            <Input
              id="name"
              className="col-span-3"
              {...register("currentPassword")}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              New Password
            </Label>
            <Input
              id="username"
              className="col-span-3"
              {...register("password")}
            />
          </div>

          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePassword;
