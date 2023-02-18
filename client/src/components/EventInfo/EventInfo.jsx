import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/solid'

const EventInfo = props => {
    return (
        <div className="flex flex-col text-xs gap-2.5 text-text1">
            <div className="flex items-center gap-2">
                <LocationMarkerIcon className="h-4" />
                <a href={props.coordinateslink}><div className="underline text-teal-500 ">{props.address}</div></a>
            </div>
            <div className="flex items-center gap-2">
                <CalendarIcon className="h-4" />
                <div className="">{props.startDate}</div>
            </div>
        </div>
    )
}

export default EventInfo;
