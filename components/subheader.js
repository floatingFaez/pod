const Subheader = ({title,subtitle}) => {
    return ( 
        <div className="page-header py-8">
            <div className="text-center">
            <p className="mt-2 text-lg">
                {subtitle}
            </p>
            </div>
            <h1 className="text-3xl font-semibold tracking-tight text-center lg:leading-snug text-brand-primary lg:text-4xl dark:text-white">
                {title}
            </h1>
        </div>
     );
}
 
export default Subheader;