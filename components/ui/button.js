const Button = ({text,type="button"}) => {
    return ( 
        <button type={type} className="dark:border-gray-100 outline-none border dark:bg-transparent dark:hover:bg-gray-700 py-3 px-14 uppercase">{text}</button>
    );
}
 
export default Button;