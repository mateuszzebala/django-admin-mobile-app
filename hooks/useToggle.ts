import React from "react"



export default (initialState: boolean = true) => {
    const [state, setState] = React.useState(initialState)

    return {
        value: state,
        setValue: setState,
        toggle: () => setState(prev => !prev),
        restart: () => setState(initialState)
    }
}




