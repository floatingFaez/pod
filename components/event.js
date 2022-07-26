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

const Event = ({event, isExpand, setClickedId, setModalShow}) => {

    const [expand,setExpand] = useState(false)
    const [showModal,setShowModal] = useState(false)

    useEffect(()=>{
        // console.log({expand})
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
    const learnBtnText = expand ? 'Collapse': event.buttonText
    

    return ( 
        <Container className={`full-width relative block border-t border-theme-black cursor-pointer ${expand ? '':'hover:bg-white bg-hover-white'} ${event.scheduled ? 'scheduled' : ''}`}>
            <div  className="event-item flex md:flex-row flex-col max-w-screen-xl mx-auto px-5 txt-black pt-2.5 md:pt-9 pb-5 md:pb-9 h-full" onClick={handleExpand}>
                <p className="tracking-tighter my-8  text-heading-3x !leading-none show md:hidden text-center w-56 mx-auto">{event.countries}</p>

                <div className="event-image w-full lg:w-3/12 uppercase md:mr-11">
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
                    <div className={`event-images hidden md:block mb-0 overflow-hidden height-0 ${expand ? 'expand':''}`}>
                        {
                            map(event.eventImages, eventImage => {
                                const image = GetImage(eventImage);
                                return <Image
                                            key={eventImage._key}
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
                <div className={`description w-full lg:w-7/12 my-7 md:my-0 relative ${!event?.scheduled ? 'early-access' :''}`}>
                    <div className="grid grid-rows-3 md:grid-rows-1 grid-flow-col auto-cols-max gap-6 md:gap-0">
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
                                <img src="/img/plane.svg" className='plane-icon' alt="plane"/>
                            </p>
                        </div>
                    </div>
                    
                    <p className="tracking-tighter my-8  text-heading-3x !leading-none hidden md:block">{event.countries}</p>
                    <div className={`fss-2 event-content mb-0 overflow-hidden height-0 my-9 ${expand ? 'expand mb-8':''}`}>{event.body && <PortableText value={event.body} />}</div>
                    <p className={`booking-date font-secondary uppercase fss-1 hidden md:block ${expand ? 'mt-5':''}`}>
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
                    {event.scheduled && <RewardBadge type={!!event.boarding?'bottom':'top'} classes={expand ? 'show md:hidden':'hidden'}/>}
                </div>
                <div className={`booking-info w-full lg:w-3/12 items-end ${!!event.boarding ? 'content-end' : 'content-between'}  grid grid-row-2`}>
                    {event.scheduled && <RewardBadge type={!!event.boarding?'bottom':'top'} classes={`${expand ? 'show':'hidden'} m-hidden`}/>}
                    <Button text={!event.scheduled? 'Early Access' : learnBtnText} classes={`${expand ? 'border':'theme-bg-black'} block md:hidden md:border-0 md:txt-black md:bg-transparent border-theme-black text-center md:text-right py-4 md:py-0 w-full md:w-72 md:ml-auto mb-4 md:mb-0`} handleClick={handleExpand}/>
                    <Button text={!event.scheduled? 'Early Access' : event.buttonText} classes={`${expand ? 'border':'theme-bg-black'} md:block hidden md:border-0 md:txt-black md:bg-transparent border-theme-black text-center md:text-right py-4 md:py-0 w-full md:w-72 md:ml-auto mb-4 md:mb-0`} handleClick={handleExpand}/>
                </div>
                <p className="booking-date font-secondary uppercase fss-1 md:hidden show text-center md:text-left">
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
            {!event?.scheduled &&
                <div className={`subscriber-modal p-12 text-center absolute left-0 top-0 w-full theme-gray-bg h-full opacity-95 ${showModal ? '':'hidden'}`}>
                    <HeaderSection title="Get Early Access" subtitle='NOT YET TAKING PASSANGERS' classes="border-0 mb-16"/>
                    <p className="fss-2 mx-auto -mt-24 mb-7" style={{maxWidth:510}} >
                        Pellentesque sed luctus nisi. Vestibulum sed massa eu velit egestas ultricies. Nulla semper justo tristique mi eleifend, eu ultrices urna ullamcorper. Nunc mattis cursus nunc et feugiat.
                    </p>
                    <div className="flex flex-row justify-around font-secondary uppercase py-6">
                        <Button text="Keep Me Posted" handleClick={setModalShow} classes="!text-white py-4 px-14 bg-gray-900 hover:bg-gray-100 hover:!text-black"/>
                    </div>
                    <RewardBadge type='scheduled' classes='show'/>
                </div>
            }
        </Container>
    );
}
 
export default Event;