import When from "@components/when";
const RewardBadge = ({type,classes="",boarding_hide=false,reward_Text='Earn Reward Points'}) => {

    const boardingAvailable = type !== 'top' && type !== 'scheduled'
    const boardingText = type === 'scheduled' ? 'Boarding Soon' :'Seeing Believing'

    return ( 
        <div className={`badge-wrapper ${classes}`}>
            <img src="/img/footer-logo.svg" className="badge-logo" alt="badge"/>
            <When condition={!boarding_hide}>
                <span className={`square-txt txt-box ${boardingAvailable ? 'bg-white' : 'bottom bg-theme-green'}`}>
                    {boardingAvailable ? 'Now Boarding' : boardingText}
                </span>
            </When>
            <span className={`wide-txt txt-box  ${boardingAvailable ? 'bg-theme-green' : 'top bg-white'}`}>
                {reward_Text}
            </span>
        </div>
    );
}
 
export default RewardBadge;