
const SliderInfo = ({slider}) => {
    const {city,country,lat,long,start_date,end_date,project_1,project_2} = slider
    return ( 
        <div className="slider-info font-primary grid grid-cols-2 absolute inset-0 max-w-screen-xl mx-auto px-8 xl:px-5 justify-between mx-auto place-content-center align-middle text-white">
            <div className="brand-name flex content-center">
                <span>Proof of Dreams</span>
            </div>
            <div className="info-wrap relative">
                <div className="infos flex justify-between leading-4 uppercase pl-8 pr-5 text-sm font-secondary fss-2 !leading-none">
                    <span>{city}<br/>{country}</span>
                    <span>{lat}<br/>{long}</span>
                    <span>{start_date}<br/>{end_date}</span>
                    <span>{project_1}<br/>{project_2}</span>
                </div>
                <span className="right-braces">)<sup>®</sup></span>
            </div>
        </div>
    );
}
 
export default SliderInfo;