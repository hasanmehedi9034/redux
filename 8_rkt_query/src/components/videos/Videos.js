import { useGetVideosQuery } from "../../features/api/apiSlice";
import Error from "../ui/Error";
import VideoLoader from "../ui/loaders/VideoLoader";
import Video from "./Video";

export default function Videos() {
    const {data: videos, isLoading, isError} = useGetVideosQuery(undefined, {
        // refetchOnFocus: false,
        // refetchOnReconnect: true,
        // refetchOnMountOrArgChange: true,
        // skip: true,
        // refetch,
        // pollingInterval: 200
    });

    // decide what to render
    let content = null;
    if(isLoading) content = <VideoLoader/>
    if(!isLoading && isError) content = <Error message='There was an error'/>
    if(!isLoading && !isError && videos.length === 0) content = <Error message='No Videos Found'/>
    if(!isLoading && !isError && videos.length > 0) content = videos.map(video => <Video key={video.id} video={video}/>)

    return (
        <>
            {content}
        </>
    );
}
