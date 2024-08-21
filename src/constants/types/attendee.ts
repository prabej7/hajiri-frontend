import Table from "./table";

interface Attendee {
  _id: string;
  name: string;
  presence: boolean;
  table: string | Table;
  createdAt?: Date;
  updatedAt?: Date;
}

export default Attendee;
