import { useState, useEffect } from 'react'
import RewardBadge from './ui/reward-badge';
import HeaderSection from './sections/headerSection';
import Image from "next/image";
import GetImage from "@utils/getImage";
import { map } from 'lodash';
import Button from "./ui/button";
import Container from "./container";
import { parseISO, format } from "date-fns";
import {PortableText} from "@lib/sanity";

const Event = ({event, isExpand, setClickedId}) => {

    const [expand,setExpand] = useState(false)
    const [showModal,setShowModal] = useState(false)

    useEffect(()=>{
        setExpand(isExpand)
        setShowModal(isExpand)
    },[isExpand])

    const handleExpand = () => {
        setClickedId(event._id)
        if(!event?.scheduled){
            setShowModal(true)
        }
    }
    const imageProps = event?.mainImage ? GetImage(event.mainImage) : null;
    

    return ( 
        <Container className={`full-width relative block border-t border-theme-black cursor-pointer ${expand ? '':'hover:bg-white'} ${event.scheduled ? 'scheduled' : ''}`}>
            <div  className="event-item flex max-w-screen-xl mx-auto px-8 xl:px-5 txt-black pt-12 pb-16 h-full" onClick={handleExpand}>
                <div className="event-image w-full lg:w-3/12 uppercase mr-11">
                    { !!imageProps && 
                        <Image
                            src={imageProps.src}
                            loader={imageProps.loader}
                            blurDataURL={imageProps.blurDataURL}
                            alt={event?.mainImage.alt || "Thumbnail"}
                            placeholder="blur"
                            layout="responsive"
                            width={184}
                            height={184}
                            priority={false}
                            className="transition-all mb-5"
                        />
                    }
                    <div className={`event-images mb-0 overflow-hidden height-0 ${expand ? 'expand':''}`}>
                        {
                            map(event.eventImages, eventImage => {
                                const image = GetImage(eventImage);
                                return <Image
                                            key={eventImage._id}
                                            src={image.src}
                                            loader={image.loader}
                                            blurDataURL={image.blurDataURL}
                                            alt={"Event Image"}
                                            placeholder="blur"
                                            layout="responsive"
                                            width={184}
                                            height={184}
                                            priority={false}
                                            className="transition-all mb-5"
                                        /> 
                            })
                        }
                    </div>
                </div>
                <div className="description w-6/12 lg:w-7/12">
                    <div className="grid grid-rows-1 grid-flow-col auto-cols-max">
                        <div className="ticket-info">
                            <p className="font-secondary uppercase fss-1 mb-1 tracking-light">DEPARTURE</p>
                            <p className="text-2xl">
                                <time
                                    className="leading-8"
                                    dateTime={event?.endDate}>
                                    {format(
                                    parseISO(event?.endDate),
                                    "d MMM Y"
                                    )}
                                </time>
                            </p>
                        </div>
                        <div className="ticket-info">
                            <p className="font-secondary uppercase fss-1 mb-1 tracking-light">RETURNING</p>
                            <p className="text-2xl">
                                <time
                                    className="leading-8"
                                    dateTime={event?.endDate}>
                                    {format(
                                    parseISO(event?.endDate),
                                    "d MMM Y"
                                    )}
                                </time>
                            </p>
                        </div>
                        <div className="ticket-info">
                            <p className="font-secondary uppercase fss-1 mb-1 tracking-light">AVAILABILITY</p>
                            <p className="text-2xl flex">
                                <span className={`mr-5 flight-text ${expand ? 'expanded':''}`}>{expand ? 'Reserve Your Seat' : 'Flight Open'} </span>
                                <img src="/img/plane.svg" className='plane-icon'/>
                            </p>
                        </div>
                    </div>
                    
                    <p className="tracking-tighter my-8  text-heading-2x xl:text-heading-2x">{event.countries}</p>
                    <div className={`fss-2 event-content mb-0 overflow-hidden height-0 ${expand ? 'expand mb-8':''}`}>{event.body && <PortableText value={event.body} />}</div>
                    <p className="booking-date font-secondary uppercase fss-1">
                        Booking Deadline 
                        <time
                            className="ml-4"
                            dateTime={event?.bookingEndDate}>
                            {format(
                            parseISO(event?.bookingEndDate),
                            "MMMM dd"
                            )}
                        </time>
                    </p>
                </div>
                <div className={`booking-info w-full lg:w-3/12 items-end ${!!event.boarding ? 'content-end' : 'content-between'}  grid grid-row-2`}>
                    {event.scheduled && <RewardBadge type={!!event.boarding?'bottom':'top'} classes={expand ? 'show':'hidden'}/>}
                    <Button text={!event.scheduled? 'Early Access' : event.buttonText} classes="border-theme-black bg-transparent text-right py-4 w-72 ml-auto" handleClick={handleExpand}/>
                </div>
            </div>
            {!event?.scheduled &&
                <div className={`subscriber-modal p-12 text-center absolute left-0 top-0 w-full theme-gray-bg h-full opacity-95 ${showModal ? '':'hidden'}`}>
                    <HeaderSection title="Get Early Access" subtitle='NOT YET TAKING PASSANGERS' classes="border-0 mb-16"/>
                    <p className="fss-2 mx-auto -mt-24 mb-7" style={{maxWidth:510}} >
                        Pellentesque sed luctus nisi. Vestibulum sed massa eu velit egestas ultricies. Nulla semper justo tristique mi eleifend, eu ultrices urna ullamcorper. Nunc mattis cursus nunc et feugiat.
                    </p>
                    <div className="flex flex-row justify-around font-secondary uppercase py-6">
                        <Button text="Keep Me Posted" classes="!text-white py-4 px-20 bg-gray-900 hover:bg-gray-100 hover:!text-black"/>
                    </div>
                </div>
            }
        </Container>
    );
}
 
export default Event;