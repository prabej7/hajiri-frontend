import AccountSection from "@/components/user/AccountSection";
import SelectTable from "./Select";

import { useEffect, useState } from "react";
import axios from "axios";
import url from "@/constants/url";

import Component from "@/components/user/Charts";
import MonthData from "@/constants/types/statsData";
import { useUser } from "@/Providers/UserContext";
import Loading from "@/components/user/Loading";

const Stats: React.FC = () => {
  const { isLoading, user } = useUser();
  const [selecetedTable, setSelectedTable] = useState<string>("");

  const [data, setData] = useState<MonthData[]>([]);

  useEffect(() => {
    if (selecetedTable !== "")
      (async () => {
        const response = await axios.post(`${url}get-stats`, {
          tableid: selecetedTable,
        });
        console.log(response);
        setData(response.data);
      })();
  }, [selecetedTable]);

  useEffect(() => {
    if (user) setSelectedTable(user.tables[0]._id);
  }, [user]);

  if (isLoading) return <Loading />;

  return (
    <AccountSection title="Statistics">
      <div className="flex flex-col gap-3" >
        <SelectTable onSelect={setSelectedTable} />
        {/* <Button
          variant="outline"
          className="mt-3"
          onClick={() => setDatePicker(!datePicker)}
        >
          Pick a date
        </Button>
        {datePicker && (
          <Calendar
            className="z-10 absolute bg-white"
            selected={date}
            onDayClick={(date: Date) => {
              setDate(date);
              setDatePicker(false);
            }}
          />
        )} */}
        <Component data={data} />
      </div>
    </AccountSection>
  );
};

export default Stats;
