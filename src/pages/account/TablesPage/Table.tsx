import DropDown from "@/components/Accounts/TablesPage/DropDownMenu";
import List from "@/components/Accounts/TablesPage/Table";
import AddAttendee from "@/components/Accounts/TablesPage/TablePage/Add";
import { Button } from "@/components/ui/button";

import AccountSection from "@/components/user/AccountSection";
import Loading from "@/components/user/Loading";
import DayTable from "@/constants/types/dayTable";
import TableType from "@/constants/types/table";
import url from "@/constants/url";
import useApi from "@/hooks/useApi";
import { useUser } from "@/Providers/UserContext";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CreateDayTable from "@/components/user/CreateDayTableDialogue";
import { VscListFilter } from "react-icons/vsc";
import { Calendar } from "@/components/ui/calendar";
interface Toggle {
  add: boolean;
  delete: boolean;
}

const Table: React.FC = () => {
  const { user, isLoading } = useUser();
  const { tableid } = useParams();
  const [table, setTable] = useState<TableType | undefined>(undefined);
  const { post } = useApi();
  const [isDatePicker, setDatePicker] = useState<boolean>(false);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [toggle, setToggle] = useState<Toggle>({
    add: false,
    delete: false,
  });

  useEffect(() => {
    if (user) {
      const t = user.tables.find((table) => table._id === tableid);
      setTable(t);
    }
  }, [tableid, user]);

  const toggleForm = (name: keyof Toggle) => {
    setToggle((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const handleAddAttendee = () => {
    window.location.reload();
  };


  const handleSelect = async (date: Date) => {
    setDate(date);
    setDatePicker(false);
    try {
      const response = await post("get-day-table", {
        date: date.toLocaleDateString(),
        tableid: tableid,
      });
      setTable(response.data);
    } catch (e) {}
  };
  if (isLoading) return <Loading />;

  return (
    <AccountSection
      title={table?.name}
      nameSideElement={
        <Button
          variant="ghost"
          className="flex items-center gap-3"
          onClick={() => setDatePicker(!isDatePicker)}
        >
          {isDatePicker ? "Close" : "Pick a Date"}

          <VscListFilter className="font-bold" />
        </Button>
      }
      titleElement={
        <div className="flex gap-3">
          <div>
            {table?.attendees && table?.attendees.length > 0 && (
              <CreateDayTable tableid={tableid} />
            )}
          </div>
          {!toggle.delete ? (
            <DropDown
              title="Table Option"
              onAdd={() => toggleForm("add")}
              onDelete={() => toggleForm("delete")}
            />
          ) : (
            <Button onClick={() => toggleForm("delete")}>Done</Button>
          )}
        </div>
      }
    >
      {isDatePicker && (
        <Calendar
          className="absolute z-10 bg-white"
          onDayClick={handleSelect}
          selected={date}
        />
      )}

      {toggle.add && (
        <AddAttendee
          date={date}
          onAdd={handleAddAttendee}
          tableid={tableid}
          open={toggle.add}
          onClose={() => toggleForm("add")}
        />
      )}

      <List table={table} isDelete={toggle.delete} />
    </AccountSection>
  );
};

export default Table;
