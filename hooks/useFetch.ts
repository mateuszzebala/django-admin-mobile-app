import axios from "axios"
import React from "react"
import useLoading from "./useLoading"

export default (initialObject: any = {}, url: string, dependency: any[] = []) => {
    const [data, setData] = React.useState(initialObject)
    const [error, setError] = React.useState(false)
    const loading = useLoading(false)

    React.useEffect(() => {
        loading.enable()
        axios.get(url).then((data) => {
            setData(data.data)
            setError(false)
            loading.disable()
        }).catch(() => {
            loading.disable()
            setError(true)
        })
    }, dependency)

    return {error, data, loading: loading.is}


}

