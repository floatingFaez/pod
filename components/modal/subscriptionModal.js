import HeaderSection from "@components/sections/headerSection"; 
import NewsletterSubscribe from "@components/newsletterSubscribe";

const subscriptionModal = ({setModalShow, classes}) => {
    return ( 
        <div className={`modal ${classes}`}>
            <button type="button" className="btn-close" onClick={() => setModalShow(false)}>
                <img src="/img/cross.svg" />
            </button>
            <div className="modal-body">
                <HeaderSection title="USA / Mexico" subtitle='Register Your Interest In' classes="border-0 mb-16 text-white"/>
                <NewsletterSubscribe className='max-w-xs mx-auto  px-8 xl:px-5 pb-24' type='vertical' />
            </div>
        </div>
    );
}
 
export default subscriptionModal;