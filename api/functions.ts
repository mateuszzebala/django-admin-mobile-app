import axios from "axios"

export const getCsrfToken = async (host: string) => {
    const response = await axios.get(`${host}/api_admin/csrf_token/`)
    return response.data.csrftoken
}



