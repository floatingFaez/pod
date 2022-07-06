import React from 'react'
import dynamic from 'next/dynamic' 

const NOSSRWrapper = props => <React.Fragment>{props.children}</React.Fragment>

export default dynamic(() => Promise.resolve(NOSSRWrapper), {
    ssr: false 
})