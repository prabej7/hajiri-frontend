import Attendee from "./attendee";
import DayTable from "./dayTable";

interface Table {
  _id: string;
  name: string;
  tables?: DayTable[];
  attendees: Attendee[];
  createdAt: string;
  updatedAt: string;
}

export default Table;
