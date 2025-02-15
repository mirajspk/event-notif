import { useEffect, useState } from "react";
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from "@/context/auth-context";
import axios from "axios";

const EventDetail = ({
  image,
  title,
  location,
  startTime,
  date,
  description,
  host,
  registration_link,
}) => {
  const { isAuthenticated } = useAuth(); // Get the authentication state
  const textstyle = "font-bold text-[rgb(90,90,90)] ";
  const sectionstyle = "flex sm:flex-row gap-4 align-middle items-center";

  return (
    <div className="mx-4 md:mx-10 my-4">
      <section className="mt-2 grid gap-8 md:grid-cols-2 md:items-start md:text-left ">
        <img src={image} alt={title} className=" rounded-lg object-cover w-full h-full flex grow-2" />
        <div className="flex flex-col flex-1 flex-grow-1 justify-between h-full gap-4 md:gap-2">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-medium mb-2">{title}</h1>
          </div>
          <div className="flex flex-col gap-4">
            <div className={sectionstyle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
              <div className={textstyle}>{location}</div>
            </div>
            <div className={sectionstyle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-3"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16.5 12" /></svg>
              <div className={textstyle}>{startTime}</div>
            </div>
            <div className={sectionstyle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>
              <div className={textstyle}>{date}</div>
            </div>
            {registration_link && (
              <div className={sectionstyle}>
                <p className={textstyle}>Are you coming?</p>
                <button
                  onClick={() => { window.location.href = registration_link; }}
                  className="bg-[#00A8E5] text-white px-4 py-1 hover:bg-blue-600"
                >
                  Register
                </button>
              </div>
            )}
          </div>
          <div className="border-t pt-6 mb-1">
            <h2 className="text-lg font-semibold mb-4">Host:</h2>
            <div className="flex items-center space-x-4 ml-2">
              <div className="min-w-[50px] min-h-[50px] max-h-[50px] max-w-[50px] bg-gray-200 rounded-full">
                <img src="" alt="" />
              </div>
              <div>
                <p className="font-medium">{host}</p>
                <div className="flex mt-2">
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="">
        <h2 className="text-lg font-semibold my-6 md:my-10">Description</h2>
        <p className="text-justify"> {description} </p>
      </div>
      <div className="border-b-2 mt-10 border-black"></div>
    </div>
  );
};

const EventDetails = () => {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); 

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/events/${id}/`);
        setEvent(response.data);
        console.log(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) return <div>Loading...</div>; // Loading state
  if (error) return <div>Error: {error.message}</div>; // Error state

  return (
    <EventDetail
      image={event.image}
      title={event.name}
      startTime={event.startTime}
      description={event.description}
      location={event.location}
      date={event.date}
      host={event.host.club_name}
      registration_link={event.registration_link}
    />
  );
};

export default EventDetails;
