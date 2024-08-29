import React from "react"


export default (initialState: boolean = false) => {
    const [loading, setLoading] = React.useState(initialState)
    
    return {
        is: loading,
        enable: () => setLoading(true),
        disable: () => setLoading(false),
        toggle: () => setLoading(prev => !prev)
    }

}

