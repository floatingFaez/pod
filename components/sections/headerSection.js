const HeaderSection = ({title,subtitle, classes=''}) => {
    return ( 
        <div className={`page-header pt-18 pb-18 font-regular ${classes}`}>
            <p className="fss-1 uppercase font-secondary text-center mb-2 pt-2">{subtitle}</p>
            <h1 className="text-heading-3x font-regular tracking-tight text-center leading-none text-brand-primary">
                {title}
            </h1>
        </div>
     );
}
 
export default HeaderSection;