import HeaderSection from "@components/sections/headerSection"; 
import NewsletterSubscribe from "@components/newsletterSubscribe";

const SubscriptionModal = ({setModalShow, classes}) => {
    return ( 
        <div className={`modal ${classes}`}>
            <button type="button" className="btn-close" onClick={() => setModalShow(false)}>
                <img src="/img/cross.svg" alt="cross"/>
            </button>
            <div className="modal-body">
                <HeaderSection title="USA / Mexico" subtitle='Register Your Interest In' classes="border-0 mb-16 text-white !pb-12 !pt-11"/>
                <NewsletterSubscribe className='max-w-xs mx-auto  px-8 xl:px-5 pb-8' type='vertical' />
            </div>
        </div>
    );
}
 
export default SubscriptionModal;