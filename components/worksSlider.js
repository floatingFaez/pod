import 'swiper/css';
import Image from "next/image";
import Link from "next/link";
import Swiper from "react-id-swiper";
import SwiperCore, { A11y, Autoplay, Navigation, Pagination, Scrollbar } from "swiper";
import GetImage from "@utils/getImage";
import { PhotographIcon } from "@heroicons/react/outline";
SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);
SwiperCore.use([Autoplay]);

const WorksSlider = ({works,sliderPerView}) => {
    const imageSizes = {w:430,h:548}
    const addSwiperParams = {
        containerClass:'work-slider',
        wrapperClass:'swiper-wrapper mb-20',
        slidesPerView: 1,
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
            let imageProps = slider?.mainImage ? GetImage(slider.mainImage) : null;
            return <div className="slider-item p-7 border-r border-black " key={slider._id}>
                        <Link href={`/work/${slider.slug.current}`}>
                            <a>
                                {imageProps ? (
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
                                ) : (
                                    <span className="absolute w-16 h-16 text-gray-200 -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" key={slider._key}>
                                        <PhotographIcon />
                                    </span>
                                )}
                            </a>
                        </Link>
                        <p className="mt-5 text-md text-center leading-4 text-brand-primary txt-black font-secondary leading-5 uppercase">
                            <Link href={`/work/${slider.slug.current}`}>
                            <a className="font-regular fss-1">
                                {slider.title} <br/>
                                {slider.city}
                            </a>
                            </Link>
                        </p>

                    </div>
        }) 
    }

    return (
        <div className='container nav-slider-container full-width relative theme-gray-bg'>
            <div className='max-w-screen-xl mx-auto overflow-hidden px-8 xl:px-5 relative pt-0 pb-5'>
                <Swiper {...addSwiperParams}>
                    { getSliderHtml(works,imageSizes) }
                </Swiper>
            </div>
            <Link href="/work">
                <a className='slider-footer-link text-white hover:text-blue-500 uppercase font-secondary fss-1'> View Index </a>
            </Link>
        </div>
    )
}
 
export default WorksSlider;