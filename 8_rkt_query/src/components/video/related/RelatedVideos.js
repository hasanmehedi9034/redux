import { useGetRelatedVideosQuery } from "../../../features/api/apiSlice";
import Error from "../../ui/Error";
import RelatedVideoLoader from "../../ui/loaders/RelatedVideoLoader";
import RelatedVideo from "./RelatedVideo";

export default function RelatedVideos({ id, title }) {
    const { data: relatedVideos, isLoading, isError } = useGetRelatedVideosQuery({ videoId: id, videoTitle: title })
    console.log(relatedVideos)
    let content = null;
    if (isLoading) content = <><RelatedVideoLoader /><RelatedVideoLoader /></>
    if (!isLoading && isError) content = <Error />
    if (!isLoading && !isError && relatedVideos?.length === 0) content = <Error message={'No Related Videos Found'} />
    if (!isLoading && !isError && relatedVideos?.length > 0) {
        content = relatedVideos
            .filter(video => video.id !== id)
            .map(video => <RelatedVideo key={video.id} video={video} />)
    }

    return (
        <div className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto">
            {content}
        </div>
    );
}
