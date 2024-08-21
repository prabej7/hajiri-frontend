export default interface DayTable {
  _id: string;
  date: string;
  attendees?: {
    _id: string;
    name: string;
    presence: boolean;
  };
}
