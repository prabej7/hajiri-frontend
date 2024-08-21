import { Calendar as C } from "@/components/ui/calendar";
import { useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";

interface Props {
  onSelectDate: (date: any) => void;
  date: Date;
}

const Calendar: React.FC<Props> = ({  onSelectDate }) => {
    const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <C
      mode="single"
      selected={date}
      onSelect={(e:SelectSingleEventHandler)=>{

      }}
      className="rounded-md border"
    />
  );
};

export default Calendar;
