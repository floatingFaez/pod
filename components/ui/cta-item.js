
import Image from "next/image";
import GetImage from "@utils/getImage";
import HeaderSection from "@components/sections/headerSection";

const CTAItem = (props) => {
    
    const {item,imgSizes,classes=''} = props
    let itemImg = item?.mainImage ? GetImage(item.mainImage) : null;
    return ( 
        <div className={`cta-item ${classes}`}>
            <div className="grid gap-0 grid-cols-2">
                {
                !!itemImg && 
                    <Image
                        src={itemImg.src}
                        loader={itemImg.loader}
                        blurDataURL={itemImg.blurDataURL}
                        alt={itemImg.alt || "Thumbnail"}
                        placeholder="blur"
                        layout="responsive"
                        width={`${imgSizes.w}px`}
                        height={`${imgSizes.h}px`}
                        priority={false}
                        className="transition-all"
                    />
                }
                <div className="text-center flex flex-col justify-between pt-28 pb-24">
                    <HeaderSection title={item.subtitle} subtitle={item.title} classes="border-b-0"/>
                    <div className="service-footer mb-5 max-w-lg mx-auto dark:text-white font-regular py-5">
                        <p className="mb-8">{item.body}</p>
                        <div className="flex flex-row justify-around font-secondary uppercase py-6">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default CTAItem;