import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/solid'

const EventInfo = props => {
    return (
        <div className="flex bg-zinc-600 rounded-lg flex flex-row text-xs">
            <div className='leading-6 p-4 w-3/4'>
                <div className='h1'>{props.longTitle}</div>
                <div className="flex items-center gap-2">
                    <LocationMarkerIcon className="h-4" />
                    <div className="underline md:hover:pointer text-teal-500 md:text-sm md:leading-10">{props.address}</div>
                </div>
                <div className="flex items-center gap-2">
                    <CalendarIcon className="h-4" />
                    <div className="md:text-zinc-100 md:text-sm">{props.date}</div>
                </div>    
            </div>
            <div className="bg-[url('/public/assets/images/eventBanner.jpeg')] bg-cover rounded-r-lg w-1/4"></div>
        </div>
    )
}

export default EventInfo;