const Copyright = ({text,className=''}) => {
    return ( 
        <p className={`text-center font-secondary text-white ${className}`}>
          ©{new Date().getFullYear()} {text}.
        </p>
    );
}
 
export default Copyright;