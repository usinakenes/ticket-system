import React, { Fragment, useEffect, useState } from 'react'
import {
    XIcon,
    RefreshIcon,
    LocationMarkerIcon,
    CalendarIcon,
    MinusIcon,
    PlusIcon
} from "@heroicons/react/solid"

const smText = "Tack för att du anmält dig! Vi ses på evetet. Om du har några frågor, tveka inte på att kontakta oss!";

var ExampleTickets = [
    {
        id: 0,
        title: "Loading",
        price: 0,
        description: "...",
    }
];

var ExampleReturnMessage = {
    message: "Completed order",
    order: {
        id: "-",
        event: {
            id: 0,
            longTitle: "-",
            startTime: "1970-01-01T00:00:00.000Z"
        },
        tickets: [
            {
                price: 0,
                purchased: 0,
                name: "-"
            }
        ]
    }
}



const TicketButton = (props) => {

    let price = props.ticketTypeList[props.index].price;

    let counter = props.counters[props.index]

    /**************************************** */

    const decrement = () => {
        if (counter > 0) {
            props.counters[props.index]--
            props.setCounters(props.counters)
            props.setTotal(props.total - price)
        }
    };
    const increment = () => {
        props.counters[props.index]++
        props.setCounters(props.counters)
        props.setTotal(props.total + price)
    };


    return (
        <div className="grid grid-cols-3 items-center justify-center w-32">
            <button
                className={`bg-btnBG ${counter <= 0 ? "cursor-not-allowed" : "hover:bg-btnBGHover"} shadow-sm w-9 h-9 rounded-3xl flex justify-center items-center transition duration-200 ease-in-out`}
                onClick={decrement}
            >
                <MinusIcon className="text-btnText1 h-5" />
            </button>

            <div className="text-center text-2xl text-text1 hover:text-black font-medium flex justify-center items-center">
                {counter}
            </div>

            <button
                className="bg-btnBG hover:bg-btnBGHover shadow-sm w-9 h-9 rounded-3xl flex justify-center items-center transition duration-200 ease-in-out"
                onClick={increment}
            >
                <PlusIcon className="text-btnText1 h-5" />
            </button>
        </div>
    );
};

const PurchaseStep = (props) => {

    return (
        <div className='bg-[#f5f5f5] mt-20 md:mt-0 p-8 md:p-20 md:w-[62%] md:overflow-y-auto'>
            <div className="">
                <div className="text-left font-bold text-4xl py-1 my-5">
                    {props.eventInfo.longTitle}
                </div>

                <div className="text-sm mt-2 flex items-center">
                    <LocationMarkerIcon className="h-4 mr-2" />
                    <a
                        href={props.eventInfo.locationUrl}
                        className="underline text-[#268763]"
                    >
                        {props.eventInfo.location != null ? props.eventInfo.location.address : ""}
                    </a>
                </div>
                <div className="my-3 flex items-center pb-4">
                    <CalendarIcon className="h-4 mr-2" />
                    <div className="text-sm">{props.eventInfo.startDateFormatted}</div>
                </div>
                <div className="text-left font-bold pt-4 pb-2 mb-2 border-t">
                    Välj biljetter
                </div>
            </div>
            <div className="md:h-fit text-[16px]">
                {props.loaded ?
                    <table className="flex flex-col items-center justify-between md:justify-items-stretch w-full rounded-xl">
                        <tbody className="flex flex-col w-full">
                            {props.ticketTypeList.map((row, index) => {
                                return (
                                    <Fragment key={index}>
                                        <tr
                                            className={`${index === 0 || "border-t mt-4 pt-2"} flex justify-between`}
                                            key={index}
                                        >
                                            <td className="font-bold">{row.title}</td>
                                            <td className="font-bold text-right">
                                                {row.price} kr
                                            </td>
                                        </tr>
                                        <tr className="flex justify-between items-start mt-2">
                                            <td className="font-light leading-6 text-gray-700 md:pr-10 pr-5">
                                                {row.description}
                                            </td>
                                            <td className="">
                                                <TicketButton index={index} counters={props.counters} setCounters={props.setCounters} total={props.total} setTotal={props.setTotal} ticketTypeList={props.ticketTypeList} />
                                            </td>
                                        </tr>
                                    </Fragment>
                                );
                            })}
                            <tr className="border-t mt-4 pt-2" />
                        </tbody>
                    </table>
                    :
                    <div className="animate-pulse flex space-x-4 items-center">
                        <div className="rounded-full bg-zinc-300 h-10 w-10"></div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-zinc-300 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-zinc-300 col-span-2 rounded"></div>
                                    <div className="h-2 bg-zinc-300 col-span-1 rounded"></div>
                                </div>
                                <div className="h-2 bg-zinc-300 rounded"></div>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

const PurchaseSummary = (props) => {

    const totalPurchase = () => {
        let sum = 0;
        props.returnMessage.order.tickets.forEach(e => sum = sum + e.price * e.purchased);
        return sum;
    }

    return (
        <div className="">
            <div className="md:pt-10 font-bold text-[18px] border-b">Sammanfattning av order</div>
            {props.total <= 0 ?
                <div className='text-base mt-4 text-zinc-500'>Du har inte valt dina biljetter än!</div>
                :
                <div>
                    {props.purchaseCompletePopup ?
                        //Completed Purchase
                        <div>
                            <div className="font-bold text-[16px] my-2">OrderNr: <span className="font-normal">#{props.returnMessage.order.id}</span></div>
                            <div className="font-bold text-[16px] my-2">Köpta biljetter:</div>
                            <table className="table-fixed w-[100%] text-[14px]">
                                <tbody>
                                    {
                                        props.returnMessage.order.tickets.map((row, index) => (
                                            <tr className={`${index === 0 || 'border-t'} h-8 px-2 py-1`} key={index}>
                                                <td className='w-[60%] md:w-[20%]'>{row.name}</td>
                                                <td className='w-[20%] md:w-[50%] text-right'>x{row.purchased}</td>
                                                <td className='w-[20%] md:w-[30%] text-right'>{row.price} kr</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className='text-left mt-4 text-[16px]'>Totalpris:
                                <span className='text-text1 text-xl ml-1.5 font-bold'>
                                    {totalPurchase()} kr
                                </span>
                            </div>
                        </div>
                        :
                        //Purchase page
                        <div>
                            <table className="table-fixed w-[100%] text-[14px]">
                                <tbody>
                                    {
                                        props.ticketTypeList.map((row, index) => (
                                            props.counters[index] === 0 || (
                                                <tr className={`${index === 0 || 'border-t'} h-8 px-2 py-1`} key={index}>
                                                    <td className='w-[60%] md:w-[20%]'>{row.title}</td>
                                                    <td className='w-[20%] md:w-[50%] text-right'>x{props.counters[index]}</td>
                                                    <td className='w-[20%] md:w-[30%] text-right'>{row.price} kr</td>
                                                </tr>
                                            )
                                        ))
                                    }
                                </tbody>
                            </table>
                            <div className='text-left mt-4 text-[16px]'>Totalpris:
                                <span className='text-text1 text-xl ml-1.5 font-bold'>
                                    {props.total} kr
                                </span>
                            </div>
                        </div>
                    }
                </div>
            }
        </div>
    )
}

const PurchaseCompleteStep = (props) => {
    return (
        <div className="bg-[#f5f5f5] mt-20 md:mt-0 p-8 md:p-20 md:w-[62%] md:overflow-y-auto">
            <div className="">
                <div className='text-left font-bold text-4xl py-1 pb-3 my-2 pt-6'>Tack för ditt köp!</div>

                <div className='text-[16px] mt-1'>
                    <div>Biljetterna har skickats till <span className="text-[#268763]">{props.email}</span>.</div>
                </div>
                <div className="">
                    <div className='text-left font-bold  text-[16px] pt-4 my-2 border-t'>Meddelande från arrangören:</div>
                    <div className="rounded-lg text-sm">
                        {smText}
                    </div>
                    <a className="cursor-pointer text-sm underline pt-5 text-[#268763]">Kontakta arrangören</a>
                </div>
            </div>
        </div>
    )
}

const Popup = (props) => {
    let eventIdParam = props.params.eventId;
    const [ticketTypeList, setTicketTypeList] = useState(ExampleTickets);
    const [loaded, SetLoaded] = useState(false);
    const [returnMessage, setReturnMessage] = useState(ExampleReturnMessage);

    let initialCounters = []
    for (var i = 0; i < ExampleTickets.length; i++) {
        initialCounters.push(0)
    }

    const [total, setTotal] = useState(0);
    const [counters, setCounters] = useState(initialCounters);
    const [clickedBuy, setClickedBuy] = useState(false);


    //Fetch tickets
    useEffect(() => {
        fetch(`/api/event/${eventIdParam}/tickets`)
            .then((res) => res.json())
            .then((data) => {
                setTicketTypeList(data);
                let newCounters = []
                for (var i = 0; i < data.length; i++) {
                    newCounters.push(0)
                }
                setCounters(newCounters);
                SetLoaded(true);
            });
    }, [eventIdParam]);

    //Buy tickets
    const sendPost = async (eventId, tickets) => {
        await fetch('/api/ticket/buyTickets', {
            method: 'POST',
            body: JSON.stringify({
                eventId: eventId,
                tickets: tickets
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(res => {
                if (res.status === 201) props.handleStep();

                return res.json();
            })
            .then(data => {
                //Better solution?
                if (data.error === "Tickets must be for the same event")
                    console.log("Tickets must be for the same event");
                else if (data.error === "Not enough tickets")
                    console.log("Not enough tickets");
                else if (data.message === "Completed order") {
                    setReturnMessage(data);
                    console.log("success");
                }
            });
    }

    const buyTicket = () => {
        setClickedBuy(true);
        //Only id and count for each ticket
        let boughtTicketsList = ticketTypeList.map(({ id }, index) => ({ ticketTypeId: id, number: counters[index] }));
        boughtTicketsList = boughtTicketsList.filter(row => { return row.number !== 0 });
        //Only send tickets where count is not 0
        sendPost(parseInt(props.params.eventId), boughtTicketsList);
    }



    return (
        <div className='popup-box'>
            <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity">
                <div className="flex md:flex-row flex-col fixed inset-0 md:inset-y-[15%] md:inset-x-[15%] overflow-y-auto md:overflow-y-hidden z-50 bg-[#f5f5f5] text-2xl md:rounded-lg">
                    {/*Left side*/}
                    {props.purchaseCompletePopup ?
                        <PurchaseCompleteStep email={props.email} />
                        :
                        <PurchaseStep ticketTypeList={ticketTypeList} eventInfo={props.eventInfo} counters={counters} setCounters={setCounters} total={total} setTotal={setTotal} loaded={loaded} />
                    }

                    {/*Right side*/}
                    <div className="flex flex-col bg-[#edeeef] p-7 pb-12 h-full md:p-10 md:pt-20 md:pb-7 md:overflow-y-auto md:w-[38%] md:h-[100%]">
                        <PurchaseSummary ticketTypeList={ticketTypeList} returnMessage={returnMessage} purchaseCompletePopup={props.purchaseCompletePopup} counters={counters} total={total} />
                        {props.purchaseCompletePopup ||
                            <div>
                                {clickedBuy ?
                                    <button className={`mt-6 md:mt-auto bg-zinc-300 text-zinc-500 cursor-not-allowed rounded-btn text-[16px] font-medium py-2 w-full transition ease-in-out duration-200 flex justify-center items-center`}>
                                        <RefreshIcon className="h-5 w-5 animate-reverse-spin" />
                                        Genomför köp...
                                    </button>
                                    :
                                    <button
                                        className={`mt-6 md:mt-auto ${total <= 0 ? "bg-zinc-300 text-zinc-500 cursor-not-allowed" : "bg-btnBG hover:bg-btnBGHover"} rounded-btn text-[16px] text-black font-medium py-2 w-full transition ease-in-out duration-200`}
                                        onClick={total === 0 || (() => buyTicket())}
                                    >
                                        Köp
                                    </button>
                                }
                            </div>
                        }
                    </div>

                    <div className='fixed cursor-pointer hover:bg-[#ddd] transition ease-in-out duration-200 md:absolute top-20 md:top-5 bg-[#f5f5f5] md:bg-transparent rounded-full p-2 shadow-md md:shadow-none right-5 z-[100]' onClick={props.handleClose}>
                        <XIcon className="h-7 w-7" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Popup