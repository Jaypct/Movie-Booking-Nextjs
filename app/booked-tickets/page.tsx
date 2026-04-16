import { getBooking } from "../actions/booking";
import MyTickets from "../components/MyTickets";

const page = async () => {
  const { data, error } = await getBooking();
  if (error) {
    return <p>{error}</p>;
  }
  return (
    <div>
      <MyTickets bookings={data || []} />
    </div>
  );
};

export default page;
