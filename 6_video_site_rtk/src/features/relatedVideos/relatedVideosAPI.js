import axiosInstance from "../../utils/axios"

export const getRelatedVideos = async (tags, id) => {
    // const {tags, id} = {tags, id};
    const limit = 5;
    let queryString = tags?.length > 0
        ? tags.map(tag => `tags_like=${tag}`).join('&') + `&id_ne=${id}&_limit=${limit}`
        : `id_ne=${id}&_limit=${limit}`

    const resposne = await axiosInstance.get(`/videos?${queryString}`);
    return resposne.data;
}