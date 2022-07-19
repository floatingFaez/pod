
import { useState, useEffect } from 'react';
import { map } from 'lodash'
import HeaderSection from './sections/headerSection';
import Event from "./event";

const EventList = ({events, header=null}) => {
    
    const [clickedId,setClickedId] = useState('0')
 
 
    useEffect(()=>{
        console.log({clickedId})
    },[clickedId])

    return  <div className='theme-gray-bg'>
        {!!header && <HeaderSection title={header.subtitle} subtitle={header.title} classes="border-t border-b-0"/> }
        { map(events, event => {
            return <Event event={event} key={event._id}
                          isExpand={clickedId !== '0' && clickedId === event._id}
                         {...{setClickedId}}/>}) }

    </div>
    
    
}
 
export default EventList;