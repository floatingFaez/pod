import Button from "./ui/button";
import Container from "./container";
import { parseISO, format } from "date-fns";
import {PortableText} from "@lib/sanity";

const Event = ({event}) => {
    return ( 
        <Container className="full-width border-t border-black dark:border-white" >
            <div className="event-item flex justify-between max-w-screen-xl mx-auto px-8 xl:px-5 text-dark dark:text-white pt-12 pb-16">
                <div className="dates w-1/6 uppercase">
                    <time
                        className="text-3xl leading-8"
                        dateTime={event?.startDate}>
                        {format(
                        parseISO(event?.startDate),
                        "MMM d"
                        )}
                    </time> - <br/> 
                    <time
                        className="text-3xl leading-8"
                        dateTime={event?.endDate}>
                        {format(
                        parseISO(event?.endDate),
                        "MMM d"
                        )}
                    </time>
                </div>
                <div className="description w-3/6">
                    <p className="pb-6 font-secondary uppercase">{event.countries}</p>
                    <p>{event.body && <PortableText value={event.body} />}</p>
                </div>
                <div className="booking-info w-2/6 flex flex-col items-end justify-between">
                    <p className="booking-date pb-5 font-secondary uppercase">
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
                    <Button text={event.buttonText} />
                </div>
            </div>
        </Container>
    );
}
 
export default Event;