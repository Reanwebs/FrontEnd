import { useState } from 'react'
import './StreamedVideos.css'
import { Card,Image,CardFooter,Button } from '@nextui-org/react'

const StreamedVideos = ()=>{

    const [streams,setStreams] = useState([1,2,3,4,5,6,7])



    const VideoStreams = ()=>{
          return(
        streams.map((room,idx)=>
        <div key={idx} className=''>
        <Card isFooterBlurred className="w-[350px] h-[300px] col-span-12 sm:col-span-7 mt-4 ml-2">
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
        //   src={`${CLOUDINARY_FETCH_URL}/${room.ThubnailID}`}
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black"
              src={room.AvatarID ?room.AvatarID : undefined }
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">{room}</p>
              <p className="text-tiny text-white/60">{room}</p>
              <p className="text-tiny text-white/60">{room}</p>

            </div>
          </div>
          <Button 
        //    onClick={()=>{
        //      joinStreamHandler(room.StreamID)
        //    }}
          radius="full" color="" size="sm">Join</Button>
        </CardFooter>
      </Card>
      </div>
        )
        
      )
    }
    return(
        <>
        <section className="h-fit">
       <div className="m-4">
         <div className="card_header">
          <h1 className="card_title">Streamed videos</h1>
         </div>
         {streams
        ? 
        <div className="flex px-8 overflow-y-auto stream_container">
        <VideoStreams/>
        </div>
        :
        <div className="flex justify-center">
           <h1 className="font-semibold text-2xl m-12">No Streamed Videos</h1>
        </div>
       }
        </div>
        </section>
         </>
    )
}

export default StreamedVideos;