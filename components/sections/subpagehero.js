const Subpagehero = ({title,subtitle, classes=''}) => {
    return ( 
        <div className={`page-header py-12 border-b border-gray-400 ${classes}`}>
            <div className="text-center">
            <p className="mt-2 text-lg uppercase">
                {subtitle}
            </p>
            </div>
            <h1 className="text-3xl font-regular tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
                {title}
            </h1>
        </div>
     );
}
 
export default Subpagehero;