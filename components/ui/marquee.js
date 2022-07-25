import Marquee from "react-fast-marquee";

const marquee = ({children,count=5,classes='',...rest}) => {
    return ( 
        <Marquee gradient={false} className={classes} {...rest}>
        {
            [...Array(count).keys()].map((item,index) =>  <p key={`mrq_X${index}`} className="py-3 px-6 uppercase font-secondary text-white">{children}</p>)
        }
        </Marquee>
    );
}
 
export default marquee;