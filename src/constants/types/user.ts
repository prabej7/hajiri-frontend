import Table from "./table";

interface User {
  _id: string;
  username?: string;
  email: string;
  isVerified: boolean;
  fullName?: string;
  tables: Table[];
  createdAt: Date;
  updatedAt: Date;
}

export default User;
