
import Image from "next/image";
import GetImage from "@utils/getImage";
import HeaderSection from "@components/sections/headerSection";

const CTAItem = (props) => {
    
    const {item,imgSizes,classes=''} = props
    let itemImg = item?.mainImage ? GetImage(item.mainImage) : null;
    return ( 
        <div className={`cta-item ${classes}`}>
            <div className="grid gap-0 grid-cols-1 md:grid-cols-2 px-5">
                <HeaderSection title={item.subtitle} subtitle={item.title} classes="border-b-0 text-white md:hidden show !pb-16"/>
                { !!itemImg &&
                    <div className="cta-image-wrapper">
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
                    </div>
                }
                <div className="text-center flex flex-col justify-between py-12 pb-2 md:pb-28 md:py-28">
                    <HeaderSection title={item.subtitle} subtitle={item.title} classes="border-b-0 text-white hidden md:block"/>
                    <div className="service-footer mb-5 max-w-lg mx-auto text-white font-regular py-2">
                        <p className="mb-5 md:mb-8 fss-2">{item.body}</p>
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