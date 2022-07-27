import 'swiper/css';
import Image from "next/image";
import Swiper from "react-id-swiper";
import { cx } from '@utils/all';
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import GetImage from "@utils/getImage";
import { PhotographIcon } from "@heroicons/react/outline";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
SwiperCore.use([Autoplay]);

const WorkSlider = ({works,sliderPerView,className='', wrapperClassName=''}) => {
    const imageSizes = {w:1130,h:785}
    const addSwiperParams = {
        containerClass:'work-slider pr-20 md:pr-40',
        wrapperClass:'swiper-wrapper mb-20',
        slidesPerView: 1,
        rebuildOnUpdate: true,
        runCallbacksOnInit: true,
        slideToClickedSlide: true,
        shouldSwiperUpdate: true,
        activeSlideKey: 0,
        loop: false,
        autoplay: false,
        observer: true,
        lazy: true,
        spaceBetween: 40,
        pagination: false,
        mousewheel: {
            enabled: true,
            sensitivity: 5.5,
        },
        breakpoints: {
            992: {
                slidesPerView: sliderPerView,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    }

    const getSliderHtml = (sliders,size) => {
        return sliders.map(slider => {
            let imageProps = slider?.image ? GetImage(slider.image) : null;
            return <div className={cx('slider-item p-7 border-r border-black ',className)}  key={slider._key}>
                        {imageProps ? (
                            <Image
                                src={imageProps.src}
                                loader={imageProps.loader}
                                blurDataURL={imageProps.blurDataURL}
                                alt={slider.image.alt || "Thumbnail"}
                                placeholder="blur"
                                layout="responsive"
                                width={size.w}
                                height={size.h}
                                priority={false}
                                className="transition-all"
                            />
                        ) : (
                            <span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" key={slider._key}>
                                <PhotographIcon />
                            </span>
                        )}
                    </div>
        }) 
    }

    return (
        <div className='container nav-slider-container full-width relative no-border'>
            <div className={cx('max-w-screen-xl mx-auto overflow-hidden px-5 relative pt-0 pb-5',wrapperClassName)}>
                <Swiper {...addSwiperParams}>
                    { getSliderHtml(works,imageSizes) }
                </Swiper>
            </div>
            <span className='slider-footer-link text-white hover:text-blue-500 uppercase font-secondary fss-1'> Scroll </span>
        </div>
    )
}
 
export default WorkSlider;