import { Fragment } from "react";
import Marquee from "@components/ui/marquee";

const TapeBorder = ({scrollText,count=5}) => {
    return ( 
        <Fragment>
            <Marquee count={count} classes="tape-p pos-top"  speed={10} direction="right" keyText="mrq_1tX_1_t">
                {scrollText}
            </Marquee>
            <Marquee count={count} classes="tape-p pos-right z-10" speed={.5} direction="right" keyText="mrq_1tX_2_r">
                {scrollText}
            </Marquee>
            <Marquee count={count} classes="tape-p pos-bottom z-30" speed={10}  keyText="mrq_1tX_3_b">
                {scrollText}
            </Marquee>
            <Marquee count={count} classes="tape-p pos-left z-20" speed={.5} keyText="mrq_1tX_4_l">
                {scrollText}
            </Marquee>
        </Fragment>
    );
}
 
export default TapeBorder;