
import { Fragment } from 'react';
import { map } from 'lodash'
import HeaderSection from './sections/headerSection';
import Event from "./event";

const EventList = ({events, header=null}) => {
    return  <Fragment>
        
        {!!header && <HeaderSection title={header.subtitle} subtitle={header.title} classes="border-t border-b-0"/> }
        { map(events, event => <Event event={event} key={event._id}/>) }

    </Fragment>
    
    
}
 
export default EventList;