const headerSection = ({title,subtitle, classes=''}) => {
    return ( 
        <div className={`page-header pt-18 pb-20 font-regular ${classes}`}>
            <p className="fss-1 uppercase font-secondary text-center">{subtitle}</p>
            <h1 className="text-heading-2x font-regular tracking-tight text-center lg:leading-snug text-brand-primary">
                {title}
            </h1>
        </div>
     );
}
 
export default headerSection;