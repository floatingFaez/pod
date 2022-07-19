const RewardBadge = ({type,classes=""}) => {

    const boardingAvailable = type !== 'top'

    return ( 
        <div className={`badge-wrapper ${classes}`}>
            <img src="/img/footer-logo.svg" className="badge-logo"/>
            <span className={`square-txt txt-box ${boardingAvailable ? 'bg-white' : 'bottom bg-theme-green'}`}>
                {boardingAvailable ? 'Now Boarding' : 'Seeing Believing'}
            </span>
            <span className={`wide-txt txt-box  ${boardingAvailable ? 'bg-theme-green' : 'top bg-white'}`}>
                Earn Reward Points
            </span>
        </div>
    );
}
 
export default RewardBadge;