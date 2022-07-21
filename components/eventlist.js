
import { useState, useEffect } from 'react';
import { map } from 'lodash'
import HeaderSection from './sections/headerSection';
import Event from "./event";

const EventList = ({events,setModalShow,header=null}) => {
    
    const [clickedId,setClickedId] = useState('0')

    return  <div className='theme-gray-bg'>
        {!!header && <HeaderSection title={header.subtitle} subtitle={header.title} classes="border-t border-b-0"/> }
        { map(events, event => {
            return <Event event={event} key={event._id} setModalShow={setModalShow}
                          isExpand={clickedId !== '0' && clickedId === event._id}
                         {...{setClickedId}}/>}) }

    </div>
    
    
}
 
export default EventList;