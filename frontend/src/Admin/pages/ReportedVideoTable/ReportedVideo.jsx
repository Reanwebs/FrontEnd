import PageTitle from "../../components/PageTitle/PageTitle";
import { Tooltip } from "@material-tailwind/react";
import { Button } from "@nextui-org/react";
import { useEffect,useState } from "react";
import { useBlockVideoMutation,useGetReportedVideosMutation } from "../../../User/slices/api_slices/videoStreamApiSlice";
const ReportedVideoTable = ()=>{
  const [videos,setVideos] = useState([])
  const [status,setStatus] = useState(false)
  const [reportedVideos] = useGetReportedVideosMutation();
  const [blockVideo,{isLoading}] = useBlockVideoMutation()


  useEffect(()=>{

    async function getReportedVideos(){
      try {
        const res = await reportedVideos().unwrap()
        console.log(res);
        setVideos(res.videos)
      } catch (error) {
        console.log(error);
      }
    }

    getReportedVideos()

  },[status])

  async function blockVideoHandler({videoId,reason,block}){
    try {
      const data = {
           videoId:videoId,
           reason:reason,
           block:block
      }

      const res = await blockVideo(data).unwrap()
      console.log(res);
      setStatus(!status)
    } catch (error) {
      console.log(error);
    }
  }


    return(
        <>
        <div className=" w-full">
         <div className=" rounded-lg dark:border-gray-700 mt-14">
          
         <PageTitle title={'Video Management'}/>
         <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full p-12 items-center justify-center">
           <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 ">
             <thead className="text-xs text-gray-700 uppercase dark:text-gray-400">
               <tr>
                 <th scope="col" className="px-6 py-3 ">
                   SL.NO
                 </th>
                 <th scope="col" className="px-6 py-3">
                   UserName
                 </th>
                 <th scope="col" className="px-6 py-3">
                   Reason
                 </th>
                 <th scope="col" className="px-6 py-3">
                   Action
                 </th>
               </tr>
             </thead>
   
             <tbody>
             
              {videos.map((x,idx)=>
                
                <tr
                    key={idx}
                    className="bg-white border-b dark:bg-gray-900 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {idx+1}
                    </th>
                    <td className="px-6 py-4">
                      {x?.userName}
                    </td>
                    <td className="px-6 py-4">{x?.reason}</td>
                   
                    <td className="px-6 py-4">
                      <Tooltip
                        content={
                          x.isBlocked ? "Unblock video" : "Block video"
                        }
                        animate={{
                          mount: { scale: 1, y: 0 },
                          unmount: { scale: 0, y: 25 },
                        }}
                      >
                        <Button
                         
                        >
                          view
                        </Button>
                        <Button
                          isLoading={isLoading}
                          className={
                            !x.isBlocked
                              ? "text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
                              : "text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 font-medium rounded-lg text-xs px-5 py-2.5 text-center mr-2 mb-2"
                          }
                          onClick={()=>{
                           blockVideoHandler(x)
                          }}
                        >
                          {!x.isBlocked ? "Block" : "Unblock"}
                        </Button>
                      </Tooltip>
                    </td>
                  </tr>
                  )}
             </tbody>
           </table>
         </div>
         </div>
       </div>
       </>
    )
}

export default ReportedVideoTable