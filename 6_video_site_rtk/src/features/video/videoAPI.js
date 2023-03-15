import axiosInstance from "../../utils/axios"

export  const getVideo = async (id) => {
    const resposne = await axiosInstance.get(`/videos/${id}`);
    return resposne.data;
}