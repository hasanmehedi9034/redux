import VideoGrid from "../components/grid/VideoGrid";
import Navbar from "../components/Navbar";
import Tags from "../components/Tags";
import Footer from "../components/ui/Footer";
import Pagination from "../components/ui/Pagination";


export default function Home() {
    return (
        <>
            <Navbar />
            <Tags />
            <VideoGrid />
            <Pagination/>
            <Footer/>
        </>
    )
}
