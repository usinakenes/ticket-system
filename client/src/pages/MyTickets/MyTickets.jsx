import React, { useEffect, useState } from "react";

const Card = (props) => (
  //<Link to={`event/${props.order.event.id}`}>
  <div className="flex flex-col cursor-pointer rounded-xl w-full mx-0 overflow-hidden shadow-lg bg-white hover:bg-gray-50 duration-150">
    <div className="bg-inherit w-full flex flex-row justify-between">
      <div className="flex flex-col px-4 py-4">
        <div className="font-bold text-xl ">{props.order.event.shortTitle}</div>
        <div className="text-gray-500">{props.order.event.location.title}</div>
        <div className="text-gray-500">
          {props.order.event.startTime.toLocaleString("sv-SE").substr(0, 16)}
        </div>
      </div>
      <img
        src={props.order.event.eventPictureLink}
        className="object-cover w-36"
      />
    </div>
    {props.expanded ? (
      <div className="flex flex-col px-4 py-4">
        <div>
          {" "}
          <span className="font-bold">Köpt:</span>{" "}
          {props.order.purchaseTime.toLocaleString("sv-SE")}
        </div>
        <div>
          <span className="font-bold">Ordernummer:</span> {props.order.id}
        </div>
        <table className="table-fixed w-[100%] text-sm">
          <tbody>
            <tr className={`h-8 px-2 py-1 font-bold`}>
              <td className="w-[60%] md:w-[20%]">Biljettyp</td>
              <td className="w-[20%] md:w-[50%] text-right">Antal</td>
              <td className="w-[20%] md:w-[30%] text-right">Pris</td>
            </tr>

            {props.order.tickets.map((ticket, index) => (
              <tr className={`h-8 px-2 py-1 border-t-[1px]`} key={index}>
                <td className="w-[60%] md:w-[20%] font-bold">{ticket.name}</td>
                <td className="w-[20%] md:w-[50%] text-right">
                  x{ticket.purchased}
                </td>
                <td className="w-[20%] md:w-[30%] text-right">
                  {ticket.price} kr
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="text-left mt-2 self-end">
          Totalpris:
          <span className=" ml-1 font-bold">
            {props.order.tickets.reduce(
              (acc, ticket) => acc + ticket.price * ticket.purchased,
              0
            )}
            kr
          </span>
        </div>
      </div>
    ) : (
      <></>
    )}
  </div>
  // </Link>
);

const LoadingCard = () => (
  <div className="relative flex flex-col rounded-xl h-64 w-full mx-0 overflow-hidden bg-gray-100 animate-pulse">
    <div className="absolute bottom-0 left-0 right-0 w-full flex flex-row justify-between px-4 py-4">
      <div className="flex flex-col gap-3">
        <div className="w-40 h-4 bg-gray-200 rounded-md" />
        <div className="w-32 h-3 bg-gray-200 rounded-md" />
        <div className="w-24 h-3 bg-gray-200 rounded-md" />
      </div>
      <div className="self-center bg-gray-200 rounded-full w-16 h-16" />
    </div>
  </div>
);

const MyTickets = () => {
  const [orders, setOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    fetch("/api/order/orders")
      .then((res) => res.json())
      .then((data) => {
        let formatted = data.results.map((order) => ({
          ...order,
          event: { ...order.event, startTime: new Date(order.event.startTime) },
          purchaseTime: new Date(order.purchaseTime),
          expanded: false,
        }));

        setLoaded(true);
        setOrders(formatted);
      });
  }, []);

  const toggleExpandOrder = (index) => {
    let updated = orders.map((order, i) => {
      if (i === index) {
        return { ...order, expanded: !order.expanded };
      } else {
        return order;
      }
    });

    setOrders(updated);
  };

  return (
    <div className="px-6 pt-6 md:max-w-6xl mx-auto">
      <div className="font-bold text-2xl mb-1">Köpta biljetter</div>
      <div className="text-gray-500">{orders.length > 0 ? "Klicka för mer information" : "Du har tyvärr inte köpt några biljetter än 😢"}</div>

      <div className="flex flex-col gap-8 pt-6 mb-6 md:grid md:grid-cols-2 lg:grid-cols-3">
        {loaded
          ? orders.map((order, index) => (
              <a onClick={() => toggleExpandOrder(index)}>
                <Card key={index} order={order} expanded={order.expanded} />
              </a>
            ))
          : Array(5)
              .fill()
              .map((_, index) => <LoadingCard key={index} />)}
      </div>
    </div>
  );
};

export default MyTickets;
