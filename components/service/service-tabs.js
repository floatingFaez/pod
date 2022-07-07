import {Fragment,useState } from 'react'
import {map} from 'lodash'
import ServiceItem from './serviceitem'

const Tabs = ({tabs}) => {
    const [activeTab,setActiveTab] = useState(0)
    let tabTitles = map(tabs, tab => { return {key:tab._key,title:tab.tabtitle}})

    return ( 
        <Fragment>
            <div className='border-dark dark:border-white border-y'>
                <ul className="flex flex-wrap -mb-px justify-around text-sm font-regular text-center mb-0 max-w-screen-xl mx-auto  px-8 xl:px-5">
                    { map(tabTitles, (tab,i) => {
                        return <li key={`${tab.key}_tt`} className={`${ activeTab === i ? 'text-dark dark:text-white' : 'hover:text-white dark:hover:text-white'} grow `} onClick={() => setActiveTab(i)} >
                            <button className="p-4 uppercase">
                                {tab.title}
                            </button>
                        </li>
                    })}
                </ul>
            </div>
           
            <div id="TabContent" className='max-w-screen-xl mx-auto px-8 xl:px-5'>
                { map(tabs, (service,index) => {
                    return <ServiceItem key={service._key} service={service} imgSizes={{w:721,h:831}} classes={`${activeTab !== index ? 'hidden' : ''}`}>
                                {map(service.serviceOptions, serviceItem => 
                                    <div className="flex flex-col" key={`${serviceItem._key}`}>
                                        <span className="leading-5">{serviceItem.service1}</span>
                                        <span className="leading-5">{serviceItem.service2}</span>
                                    </div>
                                )}
                            </ServiceItem>
                })}
            </div>
        </Fragment>
    );
}
 
export default Tabs;