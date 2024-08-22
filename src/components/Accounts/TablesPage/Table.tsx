import { Button } from "@/components/ui/button";
import {
  Table as T,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TableType from "@/constants/types/table";
import useApi from "@/hooks/useApi";
import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";

interface Props {
  isDelete?: boolean;
  table?: TableType;
}

const Table: React.FC<Props> = ({ isDelete, table }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [attendees, setAttendees] = useState(table?.attendees || []);
  const { post } = useApi();

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await post("delete-attendee", {
        atndid: id,
      });
      setAttendees(attendees.filter((attendee) => attendee._id !== id));
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setAttendees(table?.attendees || []);
  }, [table]);

  const handleUpdate = async (id: string) => {
    if (table?.name) return;
    try {
      const now = new Date();
      const response = await post("update-presence", {
        attendeeid: id,
        date: now.toLocaleDateString(),
        tableid: table?._id,
      });
      console.log(response);
      setAttendees((prev) =>
        prev.map((attendee) =>
          attendee._id === id
            ? { ...attendee, presence: !attendee.presence }
            : attendee
        )
      );
    } catch (e) {
      console.log(e);
    }
  };

  // Example totalDays, this might be calculated or fetched dynamically
  const totalDays = 30; // Replace with actual value if dynamic

  return (
    <T>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Presence Ratio</TableHead>
          <TableHead className="text-right">Presence (in days)</TableHead>
          {isDelete && <TableHead className="text-right">Delete</TableHead>}
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendees.map((attendee) => {
          const daysPresent = attendee.presence ? 1 : 0; // Example, adjust according to your data structure
          const presenceRatio =
            totalDays > 0 ? (daysPresent / totalDays).toFixed(2) : "N/A";
          const presenceDays = daysPresent;

          return (
            <TableRow key={attendee._id}>
              <TableCell className="font-medium">{attendee.name}</TableCell>
              <TableCell
                className="cursor-pointer"
                onClick={() => handleUpdate(attendee._id)}
              >
                {attendee.presence ? "Present" : "Absent"}
              </TableCell>
              <TableCell className="text-right">{presenceRatio}</TableCell>
              <TableCell className="text-right">{presenceDays}</TableCell>
              {isDelete && (
                <TableCell className="text-right">
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(attendee._id)}
                    disabled={loading}
                  >
                    <MdDelete className="text-xl" />
                  </Button>
                </TableCell>
              )}
            </TableRow>
          );
        })}
      </TableBody>
    </T>
  );
};

export default Table;
