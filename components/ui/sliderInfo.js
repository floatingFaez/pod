import Image from "next/image";
import GetImage from "@utils/getImage";

const SliderInfo = ({slider,logo}) => {
    const {city,country,lat,long,start_date,end_date,project_1,project_2,siteTitle} = slider
    return ( 
        <div className="slider-info font-primary gap-6 md:gap-0 grid grid-cols-1 md:grid-cols-2 absolute inset-0 pb-5 md:pb-0
                        max-w-screen-xl mx-auto px-5 justify-between mx-auto place-content-end md:place-content-center align-middle text-white">
            <div className="brand-name flex content-center">
                <span className="hidden md:block">{siteTitle}</span>
                
                <div className="logo-wrap block md:hidden">
                    <Image
                        {...GetImage(logo)}
                        alt='POD'
                        sizes="(max-width: 640px) 100vw, 200px"
                        priority={true}
                    />
                </div>
               
            </div>
            <div className="info-wrap relative">
                <div className="infos flex md:flex-row flex-col justify-between  leading-4 uppercase pl-8 pr-14 text-sm font-secondary fss-1">
                    <span>{city}<br/>{country}</span>
                    <span>{lat}<br/>{long}</span>
                    <span>{start_date}<br/>{end_date}</span>
                    <span>{project_1}<br/>{project_2}</span>
                </div>
                <span className="right-braces">)<sup>®</sup></span>
            </div>
        </div>
    );
}
 
export default SliderInfo;