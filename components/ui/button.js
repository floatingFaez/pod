const Button = ({text, handleClick, type="button",classes=''}) => {
    return ( 
        <button type={type} className={`outline-none fss-1 uppercase font-secondary tracking-03 ${classes}`} onClick={handleClick}>
            {text}
        </button>
    );
}
 
export default Button;