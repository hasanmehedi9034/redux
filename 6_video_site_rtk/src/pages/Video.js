import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Player from '../components/description/Player'
import VideoDescription from '../components/description/VideoDescription'
import RelatedVideoList from '../components/list/RelatedVideoList'
import Loading from '../components/Loading'
import { fetchVideo } from '../features/video/videoSlice'


export default function Video() {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  const { video, isLoading, isError, error } = useSelector(state => state.video)

  useEffect(() => {
    dispatch(fetchVideo(videoId))
  }, [videoId, dispatch])

  const {link, title, tags} = video || {};

  // decide what to render
  let content = null;
  if (isLoading) content = <Loading />
  if (!isLoading && isError) content = <div className="col-span-12">{error}</div>
  if (!isLoading && !isError && !video?.id) content = <div className="col-span-12">No Videos founded</div>
  if (!isLoading && !isError && video?.id) content = (<div className="grid grid-cols-3 gap-2 lg:gap-8">
    <div className="col-span-full w-full space-y-8 lg:col-span-2">
      {/* <!-- video player --> */}
      <Player link={link} title={title} />

      {/* <!-- video description --> */}
      <VideoDescription video={video} />
    </div>

    {/* <!-- related videos --> */}
    <RelatedVideoList currentVideoId={videoId} tags={tags}/>
  </div>

  )


  return (
    <>
      <section className="pt-6 pb-20">
        <div className="mx-auto max-w-7xl px-2 pb-20 min-h-[400px]">
          {content}
        </div>
      </section>
    </>
  )
}
