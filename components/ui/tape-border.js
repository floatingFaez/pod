import { Fragment } from "react";
import Marquee from "@components/ui/marquee";

const TapeBorder = ({scrollText,count=5}) => {
    return ( 
        <Fragment>
            <Marquee count={count} classes="tape-p pos-top"  speed={10} direction="right">
                {scrollText}
            </Marquee>
            <Marquee count={count} classes="tape-p pos-right z-10" speed={.5} direction="right">
                {scrollText}
            </Marquee>
            <Marquee count={count} classes="tape-p pos-bottom z-30" speed={10} >
                {scrollText}
            </Marquee>
            <Marquee count={count} classes="tape-p pos-left z-20" speed={.5}>
                {scrollText}
            </Marquee>
        </Fragment>
    );
}
 
export default TapeBorder;