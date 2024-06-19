import { FloatingButtonContext } from "@/context/FloatingButtonContext"
import React from "react"


type SetProps = {
    children?: any;
    props?: object;
}

export default () => {
    const [floatingButton, setFloatingButton] = React.useContext(FloatingButtonContext)

    return {
        set: ({children = null, props = {}}: SetProps) => setFloatingButton({children, props, show:true}),
        hide: () => setFloatingButton(({...floatingButton, show: false})),
        show: () => setFloatingButton(({...floatingButton, show: true}))
    }
}

