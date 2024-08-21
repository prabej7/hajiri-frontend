import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiMenu } from "react-icons/bi";
import { IoAddCircleSharp } from "react-icons/io5";
import { MdDelete } from "react-icons/md";

interface Props {
  onAdd?: () => void;
  onDelete?: () => void;
  title: string;
}

const DropDown: React.FC<Props> = ({ onAdd, onDelete, title }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BiMenu className="text-2xl" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{title}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex gap-2" onClick={onAdd}>
          <IoAddCircleSharp />
          Add
        </DropdownMenuItem>
        <DropdownMenuItem className="flex gap-2" onClick={onDelete}>
          <MdDelete />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
