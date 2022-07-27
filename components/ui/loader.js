
const Loader = () => {
    return ` 
        <div class="page-loader h-screen w-full theme-bg-black">
            <div class="bar" role="bar">
                <div class="peg"></div>
            </div>
            <div class="spinner" role="spinner">
                <div class="spinner-icon"></div>
            </div>
        </div>
    `;
}
 
export default Loader;