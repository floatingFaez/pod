import Marquee from "react-fast-marquee";

const Marque = ({children,count=5,classes='',keyText='mrq_X',...rest}) => {
    return ( 
        <Marquee gradient={false} className={classes} {...rest}>
        {
            [...Array(count).keys()].map((item,index) =>  <p key={`${keyText}_${index}`} className="py-3 px-6 uppercase font-secondary text-white">{children}</p>)
        }
        </Marquee>
    );
}
 
export default Marque;