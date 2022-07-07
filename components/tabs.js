import { Fragment,useState } from 'react'
import {map} from 'lodash'

const Tabs = ({tabs}) => {
    const [activeTab,setActiveTab] = useState(0)
    let tabTitles = map(tabs, tab => { return {key:tab._key,title:tab.tabtitle}})

    return ( 
        <Fragment>
            <div className="border-dark dark:border-white border-b">
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
            <div id="TabContent" className='max-w-screen-xl mx-auto  px-8 xl:px-5'>
                { map(tabs, (tab,index) => {
                    return <div key={tab._key} className={`${activeTab !== index ? 'hidden' : ''} p-4 text-white tab-content mx-auto text-center`}>
                        <p className='text-3xl'>
                            {tab.packag_title}
                        </p>
                        <div className='grid gap-4 grid-cols-4 grid-rows-2 my-10'>
                            {
                                map(tab.packageOptions,(option,i) => {
                                    return <label htmlFor={`file-1${i}`} key={option._key}>
                                                <input type="radio" name='file-1' id={`file-1${i}`} value="field file" /> {option.name}
                                            </label>
                                })
                            }
                        </div>
                        <p>{tab.description}</p>
                    </div>
                })}
                
            </div>
        </Fragment>
    );
}
 
export default Tabs;