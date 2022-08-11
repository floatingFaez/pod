import { Fragment,useState } from 'react'
import {map} from 'lodash'
import { useForm } from "react-hook-form";
import Image from 'next/image'
import GetImage from "@utils/getImage";
import Button from "@components/ui/button";
import FieldTripForm from "@components/ui/field-trip-form";
import HeaderSection from "@components/sections/headerSection"; 

const Tabs = ({tabs}) => {
    const [activeTab,setActiveTab] = useState(0)
    let tabTitles = map(tabs, tab => { return {key:tab._key,title:tab.tabtitle}})
    let tabImages = map(tabs, tab => { return {key:tab._key,image:tab.tabImage}})

    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        setValue,
        formState: { errors, isSubmitSuccessful, isSubmitting }
    } = useForm({
        mode: "onTouched"
    });


    const onSubmit = data => {
        // const isFormValidate = onValidated(data)
    };
    

    return ( 
        <Fragment>
            <div className='tab-images pt-11 flex flex-wrap justify-around max-w-screen-xl mx-auto hidden md:flex'>
                {
                    map(tabImages, (tab,i) => { 
                        const tabImage = tab?.image ? GetImage(tab.image) : null;
                        return (
                            <div 
                                className={`tab-image mb-11 cursor-pointer ${activeTab !== i ? 'opacity-50':'opacity-100'} hover:opacity-100`} 
                                htmlFor={`#${tab.key}_id`}
                                onClick={() => setActiveTab(i)}
                                key={`${tab.key}_img`}
                            >
                                <Image
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
            <div className="border-white border-y hidden md:block">
                <ul className="flex flex-wrap -mb-px justify-around fss-3 text-center mb-0 max-w-screen-xl mx-auto  px-5">
                    { map(tabTitles, (tab,i) => {
                        return <li key={`${tab.key}_tt`} 
                                   id={`${tab.key}_id`}
                                   className={`${ activeTab === i ? 'text-white' : 'text-gray-700 hover:text-white'} grow `} onClick={() => setActiveTab(i)} >
                            <button className="p-4 uppercase fss-4">
                                0{i+1}. {tab.title}
                            </button>
                        </li>
                    })}
                </ul>
            </div>
            <div id="TabContent" className='max-w-screen-xl mx-auto  px-5'>
                { map(tabs, (tab,index) => {
                    
                    const btnText = index<4 ? "Save & Next": "Submit Package"

                    return <div key={tab._key} className={`${activeTab !== index ? 'hidden' : ''} text-white tab-content mx-auto text-center`}>
                        <p className='text-heading-3x'>{tab.packag_title}</p>
                        <div className='grid gap-4 grid-cols-2 md:grid-cols-4 grid-rows-4 font-secondary md:grid-rows-2 my-10 fss-1 text-left mx-auto'>
                            {
                                map(tab.packageOptions,(option,i) => {
                                    return <label htmlFor={`file-1${i}`} key={option._key} className="mb-4 uppercase md:ml-5 flex radio-item">
                                                <input type="radio" name={`file-${index}`} id={`file-1${i}`} value="field file" className='mr-3 radio'/> {option.name}
                                            </label>
                                })
                            }
                        </div>

                        <Button text={btnText}
                                handleClick={() => setActiveTab(index<4?index+1:0)}
                                classes="border border-white py-4 px-20 hover:bg-gray-700" />
                    </div>
                })}
                <div className={`${activeTab !== 4 ? 'hidden' : ''} text-white tab-content mx-auto text-center`}>
                    <HeaderSection title="Your Details" subtitle="" classes="border-y-0 text-white !pt-0 !pb-5"/>
                    {/* pt-0 !pb-4 !md:pb-22 border-t-0 */}
                    <FieldTripForm classes={`mx-auto`} />
                </div>
                
            </div>
        </Fragment>
    );
}
 
export default Tabs;