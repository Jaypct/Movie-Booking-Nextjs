import { getUserBooking } from "@/app/actions/booking";
import GenerateQRCode from "@/app/components/GenerateQRCode";

const page = async ({ params }: { params: { ticketId: string } }) => {
  const { ticketId } = await params;

  const { data, error } = await getUserBooking(ticketId);
  if (error) {
    return (
      <div>
        <h1>404 no ticket found</h1>
      </div>
    );
  }

  return (
    <div>
      {data.movie_title}
      <GenerateQRCode token={data.qr_token} />
    </div>
  );
};

export default page;
