import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

//Form Validation
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import FormError from "@/components/user/FormError";

import Alert from "@/components/user/Alert";
import useApi from "@/hooks/useApi";
import { useCookies } from "react-cookie";
import { AxiosError } from "axios";
import { useState } from "react";

interface Props {
  onClose?: () => void;
  open: boolean;
}

const schema = z.object({
  tableName: z.string().min(1, {
    message: "Table name is required!",
  }),
});

type formField = z.infer<typeof schema>;

const AddTableForm: React.FC<Props> = ({ open, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [cookie] = useCookies(["token"]);
  const { post } = useApi();
  const { notify } = Alert();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<formField>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (formData: formField) => {
    setLoading(true);
    try {
      await post("create-table", {
        ...formData,
        token: cookie.token,
      });
    } catch (e) {
      const error = e as AxiosError;
      notify.error(error.message);
    } finally {
      setLoading(false);
      window.location.reload();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Table</DialogTitle>
          <DialogDescription>Type the name and click to add.</DialogDescription>
        </DialogHeader>

        <form className="flex gap-6" onSubmit={handleSubmit(onSubmit)}>
          <Input placeholder="Table name" {...register("tableName")} />
          <Button disabled={loading}>{loading ? "Adding" : "Add"}</Button>
        </form>
        {errors.tableName && errors.tableName.message && (
          <FormError text={errors.tableName.message} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AddTableForm;
