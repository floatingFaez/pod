import Container from "@components/container";
import NewsletterSubscribe from "@components/newsletterSubscribe";

import HeaderSection from "@components/sections/headerSection";

const Newsletter = ({ classes='' }) => {

    return ( 
        <Container className="border-t full-width">
            <HeaderSection title="Dream Larger" subtitle="Keep Updated" classes="border-y-0 text-white !pb-5"/>
            <NewsletterSubscribe className={`max-w-screen-xl mx-auto px-5 pb-24 ${classes}`}/>
        </Container>
    );
}
 
export default Newsletter;