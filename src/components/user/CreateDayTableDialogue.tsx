import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { MdOutlinePlaylistAdd } from "react-icons/md";
import { Calendar } from "../ui/calendar";
import { useState } from "react";
import useApi from "@/hooks/useApi";

interface Props {
  tableid?: string;
  disable: boolean;
}

const CreateDayTable: React.FC<Props> = ({ tableid, disable }) => {
  const [date, setDate] = useState<Date>(new Date());
  const { post } = useApi();

  const handleSubmit = async () => {
    try {
      const response = await post("create-today-table", {
        date: date?.toLocaleDateString(),
        tableid: tableid,
      });
      console.log(response);
    } catch (e) {}
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-1 scale-90" disabled={disable}>
          <MdOutlinePlaylistAdd className="text-2xl" />
          <p>Create</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] xl:max-w-[300px]">
        <DialogHeader>
          <DialogTitle>Create a table for today.</DialogTitle>
          <DialogDescription>Select a date and click create.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="">
            <Calendar
              onDayClick={(day: Date) => setDate(day)}
              selected={date}
            />
          </div>
          <Button type="submit" onClick={handleSubmit}>
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateDayTable;
