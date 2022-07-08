const Button = ({text,type="button"}) => {
    return ( 
        <button type={type} className="dark:border-white outline-none border dark:bg-transparent dark:hover:bg-gray-700 py-3 px-14 uppercase font-secondary">
            {text}
        </button>
    );
}
 
export default Button;