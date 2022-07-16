const Button = ({text,type="button",classes=''}) => {
    return ( 
        <button type={type} className={`outline-none fss-2 border dark:bg-transparent dark:hover:bg-gray-700 py-4 px-20 uppercase font-secondary ${classes}`}>
            {text}
        </button>
    );
}
 
export default Button;