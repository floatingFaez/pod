import { useState } from 'react'
import {map} from 'lodash'
import ServiceItem from './serviceitem'

const Tabs = ({tabs}) => {
    const [activeTab,setActiveTab] = useState(0)
    let tabTitles = map(tabs, tab => { return {key:tab._key,title:tab.tabtitle}})

    return ( 
        <>
        <div className="mb-0 border-t border-gray-900 dark:border-gray-100">
            <ul className="flex flex-wrap -mb-px justify-around text-sm font-regular text-center border-b">
                { map(tabTitles, (tab,i) => {
                    return <li key={`${tab.key}_tt`} className={`${ activeTab === i ? 'text-dark dark:text-white' : 'hover:text-white dark:hover:text-white'} grow `} onClick={() => setActiveTab(i)} >
                        <button className="p-4 uppercase">
                            {tab.title}
                        </button>
                    </li>
                })}
            </ul>
        </div>
        <div id="TabContent">
            { map(tabs, (service,index) => {
                return <ServiceItem key={service._key} service={service} classes={`${activeTab !== index ? 'hidden' : ''}`} />
            })}
        </div>
        </>
    );
}
 
export default Tabs;