// import { useState, useEffect } from "react"; 
// import axios from "axios"; 
//
//
// const NumberEvents= () => {
//   const[numOfEvent, setNoOfEvent] = useState(0)
//   const[loading, setLoading] = useState(true)
//   const[error, setError] = useState(null)
//
//   useEffect(() => {
//
//     const fetchEvents = async () => {
//       try {
//         //uses get Http methode from our backend Api
//         const response = await axios.get('http://127.0.0.1:8000/Api/events');
//         setNoOfEvent(response.data.length);
//       } catch (err) {
//         setError(err); // Set error if the request fails
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };
//
//     fetchEvents(); // Call the fetch function
//   },[])
// }
//
// if(loading) return <div> loading ... </div>
// if (error) return <div> Error: {error.message}</div>
//
// return(
// <div>
//     <h2> NumberOfEvents: {numOfEvent} </h2>
// </div>
// )
//
// export default NumberEvents

import { useState, useEffect } from "react"; 
import axios from "axios"; 

const NumberEvents = () => {
  const [numOfEvent, setNoOfEvent] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/Api/events");
        setNoOfEvent(response.data.length);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div>Loading ...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h2>Number of Events: {numOfEvent}</h2>
    </div>
  );
};

export default NumberEvents;
