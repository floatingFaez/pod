import HeaderSection from "@components/sections/headerSection"; 
import NewsletterSubscribe from "@components/newsletterSubscribe";
import TapeBorder from "@components/ui/tape-border";

const SubscriptionModal = ({setModalShow,scrollText,classes=''}) => {
    return ( 
            <div className={`modal tap-parent ${classes}`}>
                <button type="button" className="btn-close" onClick={() => setModalShow(false)}>
                    <img src="/img/cross.svg" alt="cross"/>
                </button>
                <div className="modal-body flex flex-col justify-between h-full">
                    <HeaderSection title="USA / Mexico" subtitle='Register Your Interest In' classes="border-0 mb-16 text-white !pb-12 !pt-8"/>
                    <NewsletterSubscribe className='max-w-xs mx-auto  px-5 pb-8' type='vertical' />
                </div>
                <div className="tape-wrapper">
                    <TapeBorder scrollText={scrollText} />
                </div>
                
        </div>
    );
}
 
export default SubscriptionModal;