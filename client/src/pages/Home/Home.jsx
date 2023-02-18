import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Card = props => (
  <Link to={`event/${props.event.id}`}>
    <div className="relative flex flex-col rounded-xl h-64 w-full mx-0 overflow-hidden shadow-lg bg-white hover:bg-gray-50 duration-150">
      <img
        src={props.event.eventPictureLink}
        className="object-cover relative"
      />
      <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-md">
        Priser från <span className="font-bold">{props.event.price} kr</span>
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-inherit w-full flex flex-row justify-between px-4 py-4">
        <div className="flex flex-col ">
          <div className="font-bold text-xl ">{props.event.shortTitle}</div>
          <div className="text-gray-500">{props.event.location.title}</div>
          <div className="text-gray-500">{`${props.event.startTime
            .toTimeString()
            .substr(0, 5)}`}</div>
        </div>
        <div className="self-center bg-gray-200 rounded-full flex flex-col items-center justify-center w-16 h-16">
          <span> {props.event.startTime.getDate()}</span>
          <span>
            {props.event.startTime.toLocaleString("sv-SE", {
              month: "short",
            })}{" "}
          </span>
        </div>
      </div>
    </div>
  </Link>
);

const LoadingCard = () => (
  <div className="relative flex flex-col rounded-xl h-64 w-full mx-0 overflow-hidden bg-gray-100 animate-pulse">
    <div className="absolute bottom-0 left-0 right-0 w-full flex flex-row justify-between px-4 py-4">
      <div className="flex flex-col gap-3">
        <div className="w-40 h-4 bg-gray-200 rounded-md"/>
        <div className="w-32 h-3 bg-gray-200 rounded-md"/>
        <div className="w-24 h-3 bg-gray-200 rounded-md"/>
      </div>
      <div className="self-center bg-gray-200 rounded-full w-16 h-16"/>
    </div>
  </div>
);

const Home = () => {
  const [events, setEvents] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/event/getall")
      .then(res => res.json())
      .then(data => {
        let formatted = [];

        if (data.ok) {
          formatted = data.results.map(e => {
            const startTime = new Date(e.startTime);
            return { ...e, startTime };
          });
        }

        setLoaded(true);
        setEvents(formatted);
      });
  }, []);

  return (
    <div className="flex flex-col px-6 gap-8 pt-8 mb-6 md:grid md:grid-cols-2 lg:grid-cols-3 md:max-w-6xl mx-auto">
      {loaded ? (
        events.map((event, index) => <Card key={index} event={event} />)
      ) : (
        Array(5).fill().map((_, index) => <LoadingCard key={index} />)
      )}
    </div>
  );
};

export default Home;
