import axios from "axios"

export const loadChartData = async (dataRoute: string) => {
    try {
        const { data } = await axios.get(`http://localhost:5000/api/${dataRoute}`)
        // console.log({ axiosData: data })
        return data
    } catch (error) {
        console.error(error)
    }
}
