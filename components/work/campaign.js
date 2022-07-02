
const Campaign = ({post}) => {
    return ( 
        <div className="campaign-body py-8 relative">
            <div className="flex justify-between leading-4 uppercase pl-8 pr-14 text-5 text-sm">
                <span>{post.campaign_city}<br/>{post.campaign_country}</span>
                <span>{post.campaign_lat}<br/>{post.campaign_long}</span>
                <span>{post.campaign_date}<br/>{post.campaign_year}</span>
                <span>{post.title}</span>
            </div>
        </div>
    );
}
 
export default Campaign;