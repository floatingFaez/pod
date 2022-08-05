import {Fragment,useState, useEffect, useRef   } from 'react'
import {map} from 'lodash'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, Mousewheel } from 'swiper';

import ServiceItem from './serviceitem'

const Tabs = ({tabs}) => {
    const [activeTab,setActiveTab] = useState(0)
    let tabTitles = map(tabs, tab => { return {key:tab._key,title:tab.tabtitle}})

    const ref = useRef(null);

    const addSwiperParams = {
        modules:[Navigation, A11y, Mousewheel],
        slidesPerView: 1,
        rebuildOnUpdate: true,
        runCallbacksOnInit: true,
        slideToClickedSlide: true,
        shouldSwiperUpdate: true,
        activeSlideKey: 0,
        loop: false,
        observer: true,
        mousewheel: true,
        lazy: true,
        spaceBetween: 20,
        pagination: false,
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        },
        breakpoints: {
            992: {
                slidesPerView: 1,
                spaceBetween: 20,
                mousewheel: false,
            },
        },
        onSlideChange: (swiper) =>{
            setActiveTab(swiper.activeIndex)
        }
        
    };

    const getSliderHtml = (tabs) => {
        return  map(tabs, (service) => {
                    return <SwiperSlide>
                            <ServiceItem key={service._key} service={service} imgSizes={{w:721,h:831}} classes={`w-full`}>
                                {map(service.serviceOptions, serviceItem => 
                                    <div className="flex flex-col fss-1 mb-8 md:mb-0" key={`${serviceItem._key}`}>
                                        <span>{serviceItem.service1}</span>
                                        <span>{serviceItem.service2}</span>
                                    </div>
                                )}
                            </ServiceItem>
                        </SwiperSlide>
                })
    }

    const handleTabClick = (index) =>{
        setActiveTab(index)
        if (ref.current !== null && ref.current.swiper !== null) {
            ref.current.swiper.slideTo(index, 500,false)
        }
    }

    return ( 
        <Fragment>
            <div className='border-white border-y hidden md:block'>
                <ul className="flex flex-wrap -mb-px justify-around fss-3 text-center mb-0 max-w-screen-xl mx-auto  px-5">
                    { map(tabTitles, (tab,i) => {
                        return <li key={`${tab.key}_tt`} onClick={() => handleTabClick(i)} className={`${ activeTab === i ? 'text-white' : 'text-gray-700 hover:text-white hover:text-white'} grow `} >
                            <button className="p-4 uppercase fss-4">{tab.title}</button>
                        </li>
                    })}
                </ul>
            </div>
           
            <div className="full-width">
                <Swiper {...addSwiperParams} ref={ref}
                    className="max-w-screen-xl mx-auto overflow-hidden px-5 relative">
                    { getSliderHtml(tabs) }
                    <div className='max-w-screen-xl mx-auto px-5'>
                        <div className='tab-nav md:hidden w-full text-white relative flex justify-between content-center'>
                            <div className="swiper-button-next" tabIndex="0" role="button"></div>
                            <div className="swiper-button-prev" tabIndex="-1" role="button"></div>
                        </div>
                    </div>
                </Swiper>
            </div>
        </Fragment>
    );
}
 
export default Tabs;