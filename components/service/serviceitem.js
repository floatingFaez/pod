
import Image from "next/image";
import GetImage from "@utils/getImage";
import HeaderSection from "@components/sections/headerSection";

const ServiceItem = (props) => {
    
    const {service,imgSizes,classes=''} = props
    let serviceImg = service?.tabImage ? GetImage(service.tabImage) : null;
    return ( 
        <div className={`service-item ${classes}`}>
            <div className="grid gap-0 grid-cols-1 md:grid-cols-2 ">
                <div className="img-wrapper hidden md:block">
                    {
                    !!serviceImg && 
                        <Image
                        src={serviceImg.src}
                        loader={serviceImg.loader}
                        blurDataURL={serviceImg.blurDataURL}
                        alt={serviceImg.alt || "Thumbnail"}
                        placeholder="blur"
                        layout="responsive"
                        width={`${imgSizes.w}px`}
                        height={`${imgSizes.h}px`}
                        priority={false}
                        className="transition-all"
                        />
                    }
                </div>
                <div className="text-center flex flex-col justify-between">
                    <HeaderSection title={service.service_subtitle} subtitle={service.service_title} classes="border-b-0 -mt-4 text-white"/>

                    <div className="img-wrapper block md:hidden mb-9 service-tab-img">
                        {
                        !!serviceImg && 
                            <Image
                            src={serviceImg.src}
                            loader={serviceImg.loader}
                            blurDataURL={serviceImg.blurDataURL}
                            alt={serviceImg.alt || "Thumbnail"}
                            placeholder="blur"
                            layout="responsive"
                            width={`${imgSizes.w}px`}
                            height={`${imgSizes.h}px`}
                            priority={false}
                            className="transition-all"
                            />
                        }
                    </div>

                    <div className="service-footer mb-4 max-w-lg mx-auto text-white font-regular py-5">
                        <p className="mb-5 fss-2">{service.description}</p>
                        <div className="flex flex-col md:flex-row justify-around font-secondary uppercase py-6">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ServiceItem;