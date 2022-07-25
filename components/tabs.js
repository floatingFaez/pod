import { Fragment,useState } from 'react'
import {map} from 'lodash'
import Image from 'next/image'
import GetImage from "@utils/getImage";
import Button from "@components/ui/button";

const Tabs = ({tabs}) => {
    const [activeTab,setActiveTab] = useState(0)
    let tabTitles = map(tabs, tab => { return {key:tab._key,title:tab.tabtitle}})
    let tabImages = map(tabs, tab => { return {key:tab._key,image:tab.tabImage}})

    return ( 
        <Fragment>
            <div className='tab-images pt-11 flex flex-wrap justify-around max-w-screen-xl mx-auto'>
                {
                    map(tabImages, (tab,i) => { 
                        const tabImage = tab?.image ? GetImage(tab.image) : null;
                        return (
                            <div 
                                className={`tab-image mb-11 cursor-pointer ${activeTab !== i ? 'opacity-50':'opacity-100'} hover:opacity-100`} 
                                htmlFor={`#${tab.key}_id`}
                                onClick={() => setActiveTab(i)}
                            >
                                <Image
                                    key={`${tab.key}_img`}
                                    src={tabImage.src}
                                    loader={tabImage.loader}
                                    blurDataURL={tabImage.blurDataURL}
                                    alt={tab.image.alt || "Thumbnail"}
                                    placeholder="blur"
                                    layout="responsive"
                                    width={'310px'}
                                    height={'395px'}
                                    priority={true}
                                    className="transition-all"
                                />
                            </div>
                        )
                    })
                }
            </div>
            <div className="border-white border-y">
                <ul className="flex flex-wrap -mb-px justify-around fss-3 text-center mb-0 max-w-screen-xl mx-auto  px-5">
                    { map(tabTitles, (tab,i) => {
                        return <li key={`${tab.key}_tt`} 
                                   id={`${tab.key}_id`}
                                   className={`${ activeTab === i ? 'text-white' : 'text-gray-700 hover:text-white'} grow `} onClick={() => setActiveTab(i)} >
                            <button className="p-4 uppercase">
                                0{i+1}. {tab.title}
                            </button>
                        </li>
                    })}
                </ul>
            </div>
            <div id="TabContent" className='max-w-screen-xl mx-auto  px-5'>
                { map(tabs, (tab,index) => {
                    
                    const btnText = index<3 ? "Save & Next": "Submit Package"

                    return <div key={tab._key} className={`${activeTab !== index ? 'hidden' : ''} p-4 text-white tab-content mx-auto text-center`}>
                        <p className='text-heading'>{tab.packag_title}</p>
                        <div className='grid gap-4 grid-cols-4 grid-rows-2 my-10 fss-1 '>
                            {
                                map(tab.packageOptions,(option,i) => {
                                    return <label htmlFor={`file-1${i}`} key={option._key} className="mb-4 uppercase">
                                                <input type="radio" name='file-1' id={`file-1${i}`} value="field file" className='mr-3 radio'/> {option.name}
                                            </label>
                                })
                            }
                        </div>

                        <Button text={btnText}
                                handleClick={() => setActiveTab(index<3?index+1:0)}
                                classes="border border-white py-4 px-20 hover:bg-gray-700" />
                    </div>
                })}
                
            </div>
        </Fragment>
    );
}
 
export default Tabs;