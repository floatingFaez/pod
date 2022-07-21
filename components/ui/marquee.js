import Marquee from "react-fast-marquee";

const marquee = ({children,count=5}) => {
    return ( 
        <Marquee gradient={false}>
        {
            [...Array(count).keys()].map((item,index) =>  <p key={`mrq_X${index}`} className="py-3 px-6 uppercase font-secondary text-white">{children}</p>)
        }
        </Marquee>
    );
}
 
export default marquee;