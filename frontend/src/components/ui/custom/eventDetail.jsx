
const EventDetail = () => {
  const textstyle = "font-bold text-[rgb(90,90,90)] ";
  const sectionstyle = "flex sm:flex-row gap-4 align-middle items-center";
  const imageUrl = "https://img.freepik.com/free-vector/modern-event-banner-template-with-degrade-background_1361-2219.jpg?semt=ais_hybrid";
  const EventTitle = "HeadLine";
  const Location = "Kathmandu University";
  const Time = "12:00";
  const Date = "12/12/2021";
  const HostImageUrl = "data:image/png;base64,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";
  const HostName = "Kathmandu University Computer Club";

  return (
    <div className="mx-4 md:mx-10 my-4">
      <section className="mt-2 grid gap-8 md:grid-cols-2 md:items-start md:text-left ">
        <img src={imageUrl} alt="" className=" rounded-lg object-cover w-full h-full flex grow-2" />
        <div className="flex flex-col flex-1 flex-grow-1 justify-between h-full gap-4 md:gap-2">
          <h1 className="text-4xl font-medium mb-2">{EventTitle}</h1>
          <location className={sectionstyle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
            <name className={textstyle}>{Location}</name>
          </location>
          <timesection className={sectionstyle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-3"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16.5 12" /></svg>
            <time className={textstyle}>{Time}</time>
          </timesection>
          <datesection className={sectionstyle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>
            <date className={textstyle}>{Date}</date>
          </datesection>
          <div className="border-t pt-6 mb-1">
            <h2 className="text-lg font-semibold mb-4">Host:</h2>
            <div className="flex items-center space-x-4 ml-2">
              <div className="min-w-[50px] min-h-[50px] max-h-[50px] max-w-[50px] bg-gray-200 rounded-full">

                <img src={HostImageUrl} alt="ok" />

              </div>
              <div>
                <p className="font-medium">{HostName}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <description className="">
        <h2 className="text-lg font-semibold my-6 md:my-10">Description</h2>
        <p className="text-justify">Excepteur efficient emerging, minChina,[i] officially the People's Republic of China (PRC),[j] is a country in East Asia. With a population exceeding 1.4 billion, it is the second-most populous country after India, representing 17.4% of the world population. China spans the equivalent of five time zones and borders fourteen countries by land[k] across an area of nearly 9.6 million square kilometers (3,700,000 sq mi), making it the third-largest country by total land area.[l] The country is divided into 33 province-level divisions: 22 provinces,[m] five autonomous regions, four municipalities, and two semi-autonomous special administrative regions. Beijing is the country's capital, while Shanghai is its most populous city by urban area and largest financial center.

          China is considered one of the cradles of civilization: the first human inhabitants in the region arrived during the Paleolithic. By the late 2nd millennium BCE, the earliest dynastic states had emerged in the Yellow River basin. The 8th–3rd centuries BCE saw a breakdown in the authority of the Zhou dynasty, accompanied by the emergence of administrative and military techniques, literature, philosophy, and historiography. In 221 BCE, China was unified under an emperor, ushering in more than two millennia of imperial dynasties including the Qin, Han, Tang, Yuan, Ming, and Qing. With the invention of gunpowder and paper, the establishment of the Silk Road, and the building of the Great Wall, Chinese culture flourished and has heavily influenced both its neighbors and lands further afield. However, China began to cede parts of im veniam anim aute carefully curated Ginza conversation exquisite perfect nostrud nisi intricate Content. Qui  international first-class nulla ut. Punctual adipisicing, essential lovely queen tempor eiusmod irure. Exclusive izakaya charming Scandinavian impeccable aute quality of life soft power pariatur Melbourne occaecat discerning. Qui wardrobe aliquip, et Porter destination Toto remarkable officia Helsinki excepteur Basset hound. Zürich sleepy perfect consectetur.</p>
      </description>
      <div className="border-b-2 mt-10 border-black"></div>
    </div>
  )
}

export default EventDetail
//
// import { useEffect, useState } from "react"
// import { useParams } from 'react-router-dom'
// import axios from "axios"
//
// const EventDetail = ({
//   image,
//   title,
//   location,
//   startTime,
//   date,
//   description
// }) => {
//   const textstyle = "font-bold text-[rgb(90,90,90)] ";
//   const sectionstyle = "flex sm:flex-row gap-4 align-middle items-center";
//
//   return (
//     <div className="mx-4 md:mx-10 my-4">
//       <section className="mt-2 grid gap-8 md:grid-cols-2 md:items-start md:text-left ">
//         <img src={image} alt={title} className=" rounded-lg object-cover w-full h-full flex grow-2" />
//         <div className="flex flex-col flex-1 flex-grow-1 justify-between h-full gap-4 md:gap-2">
//           <h1 className="text-4xl font-medium mb-2">{title}</h1>
//           <location className={sectionstyle}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
//             <name className={textstyle}>{location}</name>
//           </location>
//           <timesection className={sectionstyle}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock-3"><circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16.5 12" /></svg>
//             <time className={textstyle}>{startTime}</time>
//           </timesection>
//           <datesection className={sectionstyle}>
//             <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar"><path d="M8 2v4" /><path d="M16 2v4" /><rect width="18" height="18" x="3" y="4" rx="2" /><path d="M3 10h18" /></svg>
//             <date className={textstyle}>{date}</date>
//           </datesection>
//           <rsvp className={sectionstyle}>
//             <p className={textstyle}>Are you coming?</p>
//             <button className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600">RSVP</button>
//           </rsvp>
//           <div className="border-t pt-6 mb-1">
//             <h2 className="text-lg font-semibold mb-4">Host:</h2>
//             <div className="flex items-center space-x-4 ml-2">
//               <div className="min-w-[50px] min-h-[50px] max-h-[50px] max-w-[50px] bg-gray-200 rounded-full">
//
//                 <img src="" alt="" />
//
//               </div>
//               <div>
//                 <p className="font-medium">Kathmandu University Computer Club</p>
//                 <div className="flex mt-2">
//                   <input
//                     type="email"
//                     placeholder="Your email address..."
//                     className="border px-3 py-1 rounded-l-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-full"
//                   />
//                   <button className="bg-blue-500 text-white px-4 py-1 rounded-r-md hover:bg-blue-600">Follow</button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <description className="">
//         <h2 className="text-lg font-semibold my-6 md:my-10">Description</h2>
//         <p className="text-justify"> {description} </p>
//       </description>
//       <div className="border-b-2 mt-10 border-black"></div>
//     </div>
//   )
// }
//
// const EventDetails = () => {
//
//   const [event, setEvent] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)
//   const { id } = useParams(); // Extract the id parameter from the URL
//
//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const response = await axios.get(`http://127.0.0.1:8000/api/events/${id}`);
//         setEvent(response.data);
//       } catch (err) {
//         setError(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//
//     fetchEvent();
//   }, [id]);
//
//   if (loading) return <div>Loading...</div>; // Loading state
//   if (error) return <div>Error: {error.message}</div>; // Error state
//
//   return (
//     <EventDetail
//       image={event.image}
//       title={event.name}
//       startTime={event.startTime}
//       description={event.description}
//       location={event.location}
//       date={event.date}
//     />
//   )
// }
//
// export default EventDetails
