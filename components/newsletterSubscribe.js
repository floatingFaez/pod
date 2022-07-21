import NewsLetterForm from "@components/ui/newsletterForm";
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const NewsletterSubscribe = ({className,type='horizontal'}) => {

    const MAILCHIMP_URL = process.env.NEXT_PUBLIC_MAILCHIMP_URL;

    return ( 
        <MailchimpSubscribe
            url={ MAILCHIMP_URL }
            render={ ( props ) => {
                const { subscribe, status, message } = props || {};
                return (
                    <NewsLetterForm 
                        status={ status }
                        cmessage={ message }
                        onValidated = { formData => subscribe( formData ) }
                        classes={className} type={type}
                    />
                );
            } }
        />
    );
}
 
export default NewsletterSubscribe;