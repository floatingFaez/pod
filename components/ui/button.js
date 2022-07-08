const Button = ({text,type="button"}) => {
    return ( 
        <button type={type} className="dark:border-white outline-none fss-2 border dark:bg-transparent dark:hover:bg-gray-700 py-4 px-20 uppercase font-secondary">
            {text}
        </button>
    );
}
 
export default Button;