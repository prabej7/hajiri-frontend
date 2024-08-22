import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loading from "@/components/user/Loading";
import { useUser } from "@/Providers/UserContext";

interface Props {
  onSelect: (e: string) => void;
}

const SelectTable: React.FC<Props> = ({ onSelect }) => {
  const { user, isLoading } = useUser();

  if (isLoading) return <Loading />;

  return (
    <Select onValueChange={onSelect}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a table" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tables</SelectLabel>
          {user.tables.map((table) => {
            return <SelectItem value={table._id}>{table.name}</SelectItem>;
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default SelectTable;
