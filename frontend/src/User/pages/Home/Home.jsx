import { Suspense,lazy } from 'react';
import HomeSkeleton from '../../components/ShimmerForHome/HomeSkeleton';


const RoomContainer = lazy(()=> import("../../components/RoomContainer/RoomContainer"))


const Home = ()=>{
    return (
        <div className='h-screen'>
            <Suspense fallback={<HomeSkeleton/>}>
                <RoomContainer/>
            </Suspense>
        </div>
       
    )

}

export default Home;