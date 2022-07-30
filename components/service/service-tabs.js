import {Fragment,useState } from 'react'
import {map} from 'lodash'
import ServiceItem from './serviceitem'

const Tabs = ({tabs}) => {
    const [activeTab,setActiveTab] = useState(0)
    let tabTitles = map(tabs, tab => { return {key:tab._key,title:tab.tabtitle}})
    let tabCount = tabTitles.length;

    const handlePreviousClick = () =>{
        if( 0 < activeTab){
            setActiveTab(currActiveTav => currActiveTav - 1)
        }
    }
    const handleNextClick = () =>{
        if(activeTab < tabCount - 1){
            setActiveTab(currActiveTav => currActiveTav + 1)
        }
    }

    return ( 
        <Fragment>
            <div className='border-white border-y hidden md:block'>
                <ul className="flex flex-wrap -mb-px justify-around fss-3 text-center mb-0 max-w-screen-xl mx-auto  px-5">
                    { map(tabTitles, (tab,i) => {
                        return <li key={`${tab.key}_tt`} className={`${ activeTab === i ? 'text-white' : 'text-gray-700 hover:text-white hover:text-white'} grow `} onClick={() => setActiveTab(i)} >
                            <button className="p-4 uppercase fss-4">{tab.title}</button>
                        </li>
                    })}
                </ul>
            </div>
           
            <div id="TabContent" className='max-w-screen-xl mx-auto px-5'>
                { map(tabs, (service,index) => {
                    return <ServiceItem key={service._key} service={service} imgSizes={{w:721,h:831}} classes={`${activeTab !== index ? 'hidden' : ''}`}>
                                {map(service.serviceOptions, serviceItem => 
                                    <div className="flex flex-col fss-1 mb-8 md:mb-0" key={`${serviceItem._key}`}>
                                        <span>{serviceItem.service1}</span>
                                        <span>{serviceItem.service2}</span>
                                    </div>
                                )}
                            </ServiceItem>
                })}
            </div>
            <div className='max-w-screen-xl mx-auto px-5'>
                <div className='tab-nav md:hidden w-full text-white relative flex justify-between content-center'>
                    <div className="swiper-button-next" tabIndex="0" role="button" onClick={handleNextClick}></div>
                    <div className="swiper-button-prev" tabIndex="-1" role="button" onClick={handlePreviousClick}></div>
                </div>
            </div>
            
        </Fragment>
    );
}
 
export default Tabs;