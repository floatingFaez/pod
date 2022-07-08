import 'swiper/css';
import Image from "next/image";
import Swiper from "react-id-swiper";
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import GetImage from "@utils/getImage";
import { PhotographIcon } from "@heroicons/react/outline";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
SwiperCore.use([Autoplay]);


const ItemSlider = ({items,sliderPerView,imgSizes,classes=''}) => {
    
    const addSwiperParams = {
        containerClass:'max-w-screen-xl mx-auto overflow-hidden px-8 xl:px-5 relative py-20',
        wrapperClass:'swiper-wrapper mb-20',
        slidesPerView: 2,
        rebuildOnUpdate: true,
        runCallbacksOnInit: true,
        slideToClickedSlide: true,
        shouldSwiperUpdate: true,
        activeSlideKey: 0,
        loop: true,
        autoplay: false,
        observer: true,
        lazy: true,
        spaceBetween: 20,
        pagination: false,
        breakpoints: {
            992: {
                slidesPerView: sliderPerView,
                spaceBetween: 40,
            },
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    };

    const getSliderHtml = (sliders,size) => {
        return sliders.map((slider, index) => {
            let imageProps = slider?.logo_img ? GetImage(slider.logo_img) : null;
            return <div className={`slider-item`} key={slider._key}>
                        {imageProps ? (
                            <Image
                                src={imageProps.src}
                                loader={imageProps.loader}
                                blurDataURL={imageProps.blurDataURL}
                                alt={slider.logo_img.alt || "Thumbnail"}
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
             <Swiper {...addSwiperParams}>
                { getSliderHtml(items,imgSizes) }
            </Swiper>
    )
}

export default ItemSlider;
