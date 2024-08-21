import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { MdDelete } from "react-icons/md";
import { useUser } from "@/Providers/UserContext";
import Loading from "../user/Loading";
import useApi from "@/hooks/useApi";
import { useCookies } from "react-cookie";
interface Props {
  isDelete: boolean;
}

const TablesList: React.FC<Props> = ({ isDelete }) => {
  const [cookie] = useCookies(["token"]);
  const { post } = useApi();
  const { user, isLoading } = useUser();

  const navigate = useNavigate();
  const handleDelete = async (id: string) => {
    try {
      await post("delete-table", {
        token: cookie.token,
        tableid: id,
      });
      window.location.reload();
    } catch (e) {}
  };
  if (isLoading) return <Loading />;
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Table Name</TableHead>
          <TableHead>Created on</TableHead>
          <TableHead>Updated on</TableHead>
          <TableHead className="text-right">No of attendees</TableHead>
          {isDelete && <TableHead className="text-right">Delete</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {user?.tables?.map((table) => {
          return (
            <TableRow
              className="cursor-pointer"
              onClick={() => {
                if (!isDelete) navigate(`/account/tables/${table._id}`);
              }}
            >
              <TableCell className="font-medium">{table.name}</TableCell>
              <TableCell>{table.createdAt?.slice(0, 10)}</TableCell>
              <TableCell>{table.updatedAt?.slice(0, 10)}</TableCell>
              <TableCell className="text-right">
                {table.attendees.length}
              </TableCell>
              <TableCell className="text-right">
                {isDelete && (
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(table._id)}
                  >
                    <MdDelete className="text-xl" />
                  </Button>
                )}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TablesList;
