import axiosInstance from "../../utils/axios"

export  const getVideos = async () => {
    const resposne = await axiosInstance.get('/videos');
    return resposne.data;
}