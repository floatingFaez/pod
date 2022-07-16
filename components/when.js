const When = ({children, condition}) => {
    if (!condition) return null;

    return children;
};

export default When;