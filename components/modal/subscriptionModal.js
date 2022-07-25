import HeaderSection from "@components/sections/headerSection"; 
import NewsletterSubscribe from "@components/newsletterSubscribe";
import Marquee from "@components/ui/marquee";

const SubscriptionModal = ({setModalShow,scrollText,classes=''}) => {
    return ( 
        <div className={`modal ${classes}`}>
            <button type="button" className="btn-close" onClick={() => setModalShow(false)}>
                <img src="/img/cross.svg" alt="cross"/>
            </button>
            <div className="modal-body">
                <HeaderSection title="USA / Mexico" subtitle='Register Your Interest In' classes="border-0 mb-16 text-white !pb-12 !pt-11"/>
                <NewsletterSubscribe className='max-w-xs mx-auto  px-8 xl:px-5 pb-8' type='vertical' />
            </div>
            <Marquee count={5} classes="tape-p pos-top"  speed={10} direction="right">
              {scrollText}
            </Marquee>
            <Marquee count={5} classes="tape-p pos-right z-10" speed={.5} direction="right">
              {scrollText}
            </Marquee>
            <Marquee count={5} classes="tape-p pos-bottom z-30" speed={10} >
              {scrollText}
            </Marquee>
            <Marquee count={5} classes="tape-p pos-left z-20" speed={.5}>
              {scrollText}
            </Marquee>
            
        </div>
    );
}
 
export default SubscriptionModal;