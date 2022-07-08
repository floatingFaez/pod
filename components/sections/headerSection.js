const headerSection = ({title,subtitle, classes=''}) => {
    return ( 
        <div className={`page-header pt-18 pb-20 border-white font-regular text-dark dark:text-white ${classes}`}>
            <p className="my-2 fss-1 uppercase font-secondary text-center">{subtitle}</p>
            <h1 className="text-heading font-regular tracking-tight text-center lg:leading-snug text-brand-primary dark:text-white">
                {title}
            </h1>
        </div>
     );
}
 
export default headerSection;