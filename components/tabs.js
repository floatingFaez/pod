import { Fragment,useState } from 'react'
import {map} from 'lodash'
import { useForm } from "react-hook-form";
import Image from 'next/image'
import useWeb3Forms from "use-web3forms";

import GetImage from "@utils/getImage";
import Button from "@components/ui/button";
import FieldTripForm from "@components/ui/field-trip-form";
import HeaderSection from "@components/sections/headerSection"; 


const Tabs = ({tabs,siteconfig}) => {
    const [activeTab,setActiveTab] = useState(0)
    const [isSuccess, setIsSuccess] = useState(false);
    const [message, setMessage] = useState(false);

    let tabTitles = map(tabs, tab => { return {key:tab._key,title:tab.tabtitle}})
    let tabImages = map(tabs, tab => { return {key:tab._key,image:tab.tabImage}})

    const apiKey = siteconfig?.w3ckey || process.env.W3_FORM_KEY;

    const {
        register,
        handleSubmit,
        reset,
        watch,
        control,
        setValue,
        formState: { errors, isSubmitSuccessful, isSubmitting }
    } = useForm({
        mode: "onChange"
    });


    // const onFormSubmit = data => {
    //     console.log('submitted->',data)
    // };

    const handleFromDataSave = (index) =>{
        console.log({index},{errors})
        setActiveTab(index<4?index+1:0)
    }

    
    const { submit: onFormSubmit } = useWeb3Forms({
        apikey: apiKey,
        from_name: "Field Trip Order Query",
        subject: "New Contact Message from POD",
        onSuccess: (msg, data) => {
            setIsSuccess(true);
            setMessage(msg);
            reset();
        },
        onError: (msg, data) => {
            setIsSuccess(false);
            setMessage(msg);
        }
    });
    

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
            <form className='max-w-screen-xl mx-auto  px-5' onSubmit={handleSubmit(onFormSubmit)}>
                { map(tabs, (tab,index) => {
                    
                    const btnText = index<4 ? "Save & Next": "Submit Package"

                    return <div key={tab._key} className={`${activeTab !== index ? 'hidden' : ''} text-white tab-content mx-auto text-center`}>
                        <p className='text-heading-3x'>{tab.packag_title}</p>
                        <div className='grid gap-4 grid-cols-2 md:grid-cols-4 grid-rows-4 font-secondary md:grid-rows-2 my-10 fss-1 text-left mx-auto'>
                            {
                                map(tab.packageOptions,(option,i) => {
                                    return <label htmlFor={`${tab.tabtitle}_${i}`} key={option._key} className="mb-4 uppercase md:ml-5 flex radio-item cursor-pointer">
                                                <input type="radio" {...register(tab.tabtitle)} id={`${tab.tabtitle}_${i}`} value={option.name} className='mr-3 radio'/> {option.name}
                                            </label>
                                })
                            }
                        </div>

                        <Button text={btnText}
                                handleClick={() => handleFromDataSave(index)}
                                classes="border border-white py-4 px-20 hover:bg-gray-700" />

                        {errors[tab.tabtitle] && (
                            <div className="mt-2 text-green">
                                <small>{errors[tab.tabtitle].message}</small>
                            </div>
                        )}
                    </div>
                })}
                <div className={`${activeTab !== 4 ? 'hidden' : ''} text-white tab-content mx-auto text-center`}>
                    <HeaderSection title="Your Details" subtitle="" classes="border-y-0 text-white !pt-0 !pb-5"/>
                    <FieldTripForm classes={`mx-auto`} 
                                    setActiveTab={setActiveTab} 
                                    isSuccess={isSuccess} 
                                    message={message}
                                    register={register} formState={{ errors, isSubmitSuccessful, isSubmitting }}/>
                </div>

                <div className={`${activeTab !== 5 ? 'hidden' : ''} text-white tab-content mx-auto text-center`}>
                    <HeaderSection title="Thank you!" subtitle="" classes="border-y-0 text-white !pt-0 !pb-5"/>
                    <div className={`newsletter_body`}>
                        
                        <p className='my-12 md:w-1/2 mx-auto fss-2'>Your Quote request has been successfully submitted. One of our dreamers will be in contact to discuss your bespoke opportunities soon.</p>

                        <Button text={'Create a New Package'}
                                handleClick={() => setActiveTab(0)}
                                classes="border border-white py-4 px-16 md:px-20 hover:bg-gray-700" />
                    </div>
                </div>
                
            </form >
        </Fragment>
    );
}
 
export default Tabs;