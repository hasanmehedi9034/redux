import VideoGrid from "../components/grid/VideoGrid";
import Tags from "../components/Tags";
import Pagination from "../components/ui/Pagination";


export default function Home() {
    return (
        <>
            <Tags />
            <VideoGrid />
            <Pagination/>
        </>
    )
}
