import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRelatedVideos } from '../../features/relatedVideos/relatedVideosSlice';
import Loading from '../Loading';
import RelatedVideoListItem from './RelatedVideoListItem'

export default function RelatedVideoList({ videoId, tags }) {
    const { relatedVideos, isLoading, isError, error } = useSelector(state => state.relatedVideos)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchRelatedVideos(tags, videoId))
    }, [dispatch, tags, videoId])

    // decide what to render
    let content = null;

    if (isLoading) content = <Loading />
    if (!isLoading && isError) content = <div className="col-span-12">{error}</div>
    if (!isLoading && !isError && relatedVideos?.length === 0) content = <div className="col-span-12">No Videos founded</div>
    if (!isLoading && !isError && relatedVideos?.length > 0) content = relatedVideos
        .filter(video => parseInt(videoId) !== parseInt(video.id))
        .map(relatedVideo => <RelatedVideoListItem key={relatedVideo.id} relatedVideo={relatedVideo} />)

    return (
        <div
            className="col-span-full lg:col-auto max-h-[570px] overflow-y-auto"
        >
            {/* <!-- single related video --> */}
            {content}
        </div>
    )
}
