import { useState,useEffect } from 'react'
import SliderInfo from '@components/ui/sliderInfo';
import Image from "next/image";
import { map } from "lodash"
import GetImage from "@utils/getImage";
import When from '@components/when';


const ItemSlider = ({items,sizes,logo,classes=''}) => {
    const [slider,setSlider] = useState(items[0])
    const [fadeClass,setFadeClass]= useState('')
    const slideCount = items.length;
    const gridCols = Math.ceil(slideCount/2);
    const isEven = slideCount % 2 === 0
    
    let imageProps = slider?.mainImage ? GetImage(slider?.mainImage) : null;
  
    const handleHover = (img) => {
        setFadeClass('fade')

        setTimeout(() =>{
            setFadeClass('')
            setSlider(img)
        },200)
    }
    
    
    return (
        <div className={`overflow-hidden h-screen relative w-full ${classes}`}>
            <When condition={!!imageProps}>
                <div className='hidden md:block'>
                <Image
                    src={imageProps.src}
                    loader={imageProps.loader}
                    blurDataURL={imageProps.blurDataURL}
                    alt={imageProps.alt || "Thumbnail"}
                    placeholder="blur"
                    layout="responsive"
                    width={sizes.w}
                    height={sizes.h}
                    priority={true}
                    className={`slider-img ${fadeClass}`}
                />
                </div>
                <div className='block md:hidden '>
                <Image
                    src={imageProps.src}
                    loader={imageProps.loader}
                    blurDataURL={imageProps.blurDataURL}
                    alt={imageProps.alt || "Thumbnail"}
                    placeholder="blur"
                    layout="responsive"
                    width={414}
                    height={896}
                    priority={true}
                    className={`slider-img object-cover ${fadeClass} `}
                />
                </div>
                <SliderInfo slider={slider} logo={logo}/>
            </When>
             <div className={`hover-slider-wrapper absolute w-full top-0 left-0 h-screen grid grid-rows-2 grid-cols-${gridCols}`}>
                {
                    map(items, (item , index) => {
                        const  spanClass = !isEven && index + 1 === slideCount ? 'col-span-2':''
                        return <div className={`slider-placeholder ${spanClass}`} key={item._id} onMouseEnter={() => handleHover(item)}/>
                    })
                }
             </div>
        </div>
    )
}

export default ItemSlider;
