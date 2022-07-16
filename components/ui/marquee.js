import Marquee from "react-fast-marquee";

const marquee = ({text,count=5}) => {
    return ( 
        <Marquee gradient={false}>
        {
            [...Array(count).keys()].map(item =>  <p className="py-3 px-8 uppercase font-secondary text-white">{text}</p>)
        }
        </Marquee>
    );
}
 
export default marquee;