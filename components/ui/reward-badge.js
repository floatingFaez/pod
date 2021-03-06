const RewardBadge = ({type,classes=""}) => {

    const boardingAvailable = type !== 'top' && type !== 'scheduled'
    const boardingText = type === 'scheduled' ? 'Boarding Soon' :'Seeing Believing'

    return ( 
        <div className={`badge-wrapper ${classes}`}>
            <img src="/img/footer-logo.svg" className="badge-logo" alt="badge"/>
            <span className={`square-txt txt-box ${boardingAvailable ? 'bg-white' : 'bottom bg-theme-green'}`}>
                {boardingAvailable ? 'Now Boarding' : boardingText}
            </span>
            <span className={`wide-txt txt-box  ${boardingAvailable ? 'bg-theme-green' : 'top bg-white'}`}>
                Earn Reward Points
            </span>
        </div>
    );
}
 
export default RewardBadge;