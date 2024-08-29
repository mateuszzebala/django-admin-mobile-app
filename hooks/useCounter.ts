import React from "react"



export default (initialState: number = 0) => {
    const [state, setState] = React.useState(initialState)

    return {
        value: state,
        setValue: setState,
        add: (howMany=1) => setState(prev => prev + howMany),
        subtract: (howMany=1) => setState(prev => prev - howMany),
        restart: () => setState(initialState)
    }
}




