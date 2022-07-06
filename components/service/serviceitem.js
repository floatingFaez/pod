
import Image from "next/image";
import GetImage from "@utils/getImage";
import Subpagehero from "@components/sections/subpagehero";
import { map } from "lodash";

const ServiceItem = ({service,classes=''}) => {
    // console.log('$$--->',service._key,`${service.key}_tt`)
    let serviceImg = service?.tabImage ? GetImage(service.tabImage) : null;
    return ( 
        <div className={`service-item ${classes}`}>
            <div className="grid gap-0 grid-cols-2">
                {
                !!serviceImg && 
                    <Image
                    src={serviceImg.src}
                    loader={serviceImg.loader}
                    blurDataURL={serviceImg.blurDataURL}
                    alt={serviceImg.alt || "Thumbnail"}
                    placeholder="blur"
                    layout="responsive"
                    width={'721px'}
                    height={'831px'}
                    priority={false}
                    className="transition-all"
                    />
                }
                <div className="text-center flex flex-col justify-between">
                    <Subpagehero title={service.service_subtitle} subtitle={service.service_title} classes="border-b-0"/>
                    <div className="service-footer mb-5 max-w-lg mx-auto dark:text-white font-regular py-5">
                        <p className="mb-5">{service.description}</p>
                        <div className="flex flex-row justify-around font-secondary uppercase py-6">
                            {map(service.serviceOptions, serviceItem => 
                                    <div className="flex flex-col" key={`${serviceItem._key}`}>
                                        <span className="leading-5">{serviceItem.service1}</span>
                                        <span className="leading-5">{serviceItem.service2}</span>
                                    </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default ServiceItem;