import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { GrSubtractCircle } from "react-icons/gr";
import { Input } from "@/components/ui/input";
import { date, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import FormError from "@/components/user/FormError";
import { IoMdAddCircle } from "react-icons/io";
import useApi from "@/hooks/useApi";

interface Props {
  open: boolean;
  onClose: () => void;
  tableid?: string;
  onAdd: () => void;
  date: Date | undefined;
}

const schema = z.object({
  attendees: z.array(
    z.object({
      name: z.string().min(1, {
        message: "Name is required.",
      }),
    })
  ),
});

export type formField = z.infer<typeof schema>;

const AddAttendee: React.FC<Props> = ({
  open,
  onClose,
  tableid,
  onAdd,
  date,
}) => {
  const {
    register,
    handleSubmit,

    formState: { errors, isSubmitting },
    control,
  } = useForm<formField>({
    resolver: zodResolver(schema),
    defaultValues: {
      attendees: [{ name: "" }],
    },
  });

  const { post } = useApi();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "attendees",
  });

  const onSubmit = async (formData: formField) => {
    try {
      await post("add-attendees", {
        ...formData,
        tableid: tableid,
        date: date,
      });
      onAdd();
    } catch (e) {
    } finally {
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Attendee</DialogTitle>
          <DialogDescription>Type the attendee name.</DialogDescription>
        </DialogHeader>
        <div className="">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-6"
          >
            <div className="flex flex-col items-end gap-3">
              <div className=" flex flex-col gap-3">
                {fields.map((_, index) => {
                  return (
                    <div className="flex gap-6">
                      <Input
                        placeholder="Name"
                        className="min-w-96"
                        {...register(`attendees.${index}.name`)}
                      />

                      {fields.length !== 1 ? (
                        <Button type="button" onClick={() => remove(index)}>
                          <GrSubtractCircle className="text-xl" />
                        </Button>
                      ) : (
                        <Button
                          type="button"
                          onClick={() => append({ name: "" })}
                        >
                          <IoMdAddCircle className="text-xl" />
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
              {fields.length !== 1 && (
                <Button type="button" onClick={() => append({ name: "" })}>
                  <IoMdAddCircle className="text-xl" />
                </Button>
              )}
            </div>
            {errors.attendees && errors.attendees.message && (
              <FormError text={errors.attendees.message} />
            )}

            <Button type="submit" disabled={isSubmitting}>
              Add
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddAttendee;
