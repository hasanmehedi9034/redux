import axiosInstance from "../../utils/axios"

export  const getTags = async () => {
    const resposne = await axiosInstance.get('/tags');
    return resposne.data;
}