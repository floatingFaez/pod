import 'swiper/css';
import Swiper from "react-id-swiper";
import Image from "next/image";
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import GetImage from "@utils/getImage";
import { PhotographIcon } from "@heroicons/react/outline";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
SwiperCore.use([Autoplay]);


const ItemSlider = ({items,sizes,sliderPerView=1,classes=''}) => {
    const addSwiperParams = {
        slidesPerView: sliderPerView,
        rebuildOnUpdate: true,
        runCallbacksOnInit: true,
        slideToClickedSlide: true,
        shouldSwiperUpdate: true,
        activeSlideKey: 0,
        effect: "fade",
        loop: true,
        autoplay: {
            delay: 6000,
            disableOnInteraction: false
        },
        observer: true,
        preloadImages: false, 
        lazy: { 
            loadPrevNext: true,
            loadPrevNextAmount: 2,
            loadOnTransitionStart: true 
        },
        spaceBetween: 0,
        pagination: false,
    };

    const getSliderHtml = (sliders,size) => {
        return sliders?.map(slider => {
            let imageProps = slider?.mainImage ? GetImage(slider.mainImage) : null;
            return <div className={`slider-item`} key={slider._key}>
                        <Image
                            src={imageProps.src}
                            loader={imageProps.loader}
                            blurDataURL={imageProps.blurDataURL}
                            alt={slider.mainImage.alt || "Thumbnail"}
                            placeholder="blur"
                            layout="responsive"
                            width={size.w}
                            height={size.h}
                            priority={false}
                            className="transition-all"
                        />
                    </div>
        }) 
    }

    return (
        <div className={`overflow-hidden ${classes}`}>
             <Swiper {...addSwiperParams}>
                { getSliderHtml(items,sizes) }
            </Swiper>
        </div>
    )
}

export default ItemSlider;
