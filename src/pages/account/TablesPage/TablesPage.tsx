import AccountSection from "@/components/user/AccountSection";
import TablesList from "@/components/Accounts/TablesList";
import DropDown from "@/components/Accounts/TablesPage/DropDownMenu";
import { useState } from "react";
import AddTableForm from "@/components/Accounts/TablesPage/AddTable";
import { Button } from "@/components/ui/button";

const TablesPage: React.FC = () => {
  const [isAdd, setAddShow] = useState<boolean>(false);
  const [isDel, setDelShow] = useState<boolean>(false);
  const addTableClick = () => {
    setAddShow(true);
  };
  const deleteTableClick = () => {
    setDelShow(true);
  };
  return (
    <AccountSection
      title="Tables"

      titleElement={
        <div>
          {isDel ? (
            <div>
              <Button onClick={() => setDelShow(false)}>Done</Button>
            </div>
          ) : (
            <DropDown
              title="Tables Option"
              onAdd={addTableClick}
              onDelete={deleteTableClick}
            />
          )}
        </div>
      }
    >
      <AddTableForm open={isAdd} onClose={() => setAddShow(!isAdd)} />
      <TablesList isDelete={isDel} />
    </AccountSection>
  );
};

export default TablesPage;
