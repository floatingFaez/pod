import { Fragment } from "react";
import Marquee from "@components/ui/marquee";

const TapeBorder = ({scrollText,speed=10,count=5}) => {
    
    let firstDigit = Number(String(speed)[0])
    firstDigit = firstDigit < 4 ? firstDigit + 2 : (firstDigit > 5 ? firstDigit - 3 : firstDigit - 1 )
    const speedDecimal = (speed / 100) * firstDigit;
    const verticalSpeed = Math.floor((speedDecimal) * 100 )/100;

    return ( 
        <Fragment>
            <Marquee count={count} classes="tape-p pos-top"  speed={speed} direction="right" keyText="mrq_1tX_1_t">
                {scrollText}
            </Marquee>
            <Marquee count={count} classes="tape-p pos-right z-10" speed={verticalSpeed} direction="right" keyText="mrq_1tX_2_r">
                {scrollText}
            </Marquee>
            <Marquee count={count} classes="tape-p pos-bottom z-30" speed={speed}  keyText="mrq_1tX_3_b">
                {scrollText}
            </Marquee>
            <Marquee count={count} classes="tape-p pos-left z-20" speed={verticalSpeed} keyText="mrq_1tX_4_l">
                {scrollText}
            </Marquee>
        </Fragment>
    );
}
 
export default TapeBorder;