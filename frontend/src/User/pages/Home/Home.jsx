import { Suspense,lazy } from 'react';
import HomeSkeleton from '../../components/ShimmerForHome/HomeSkeleton';


const RoomContainer = lazy(()=> import("../../components/RoomContainer/RoomContainer"))
const StreamContainer = lazy(()=> import("../../components/StreamedVideos/StreamedVideos"))


const Home = ()=>{
    return (
        <div className='h-screen'>
            <Suspense fallback={<HomeSkeleton/>}>
                <RoomContainer/>
            </Suspense>
            <Suspense fallback={<HomeSkeleton/>}>
                <StreamContainer/>
            </Suspense>
        </div>
       
    )

}

export default Home;