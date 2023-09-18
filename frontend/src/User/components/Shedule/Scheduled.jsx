import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import { useState,useEffect } from "react";
import { useScheduledConferenceMutation } from "../../slices/api_slices/usersConferenceApi";
import {toast} from 'react-toastify'


const Scheduled =()=>{

  const [scheduledData,setScheduledData] = useState([])
  const [scheduledConference] = useScheduledConferenceMutation()


  useEffect(()=>{
    scheduledDataHandler();
  },[])
  
  async function scheduledDataHandler(){
    try {
      const data = await scheduledConference().unwrap();
      console.log(data,"oooooooooooooooooooo");
      setScheduledData(data.data)
      console.log(scheduledData);
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.message)
    }

  }
    return(
      <div>
      {scheduledData && scheduledData.length > 0 ? (
        <div className="scheduled">
          <div className="grid gap-4 grid-cols-4">
            {scheduledData.map((data, index) => (
              <Card className="max-w-[400px]" key={index}>
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">{data?.Title}</p>
                    <p className="text-small text-default-500">{data?.Description}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>Type : Private</p>
                  <p>Interest: {data?.Interest}</p>
                  <p>Partcipant Limit: {data?.ParticipantLimit}</p>
                  <p>Schedulr Id : {data?.ScheduleID}</p>
                  <p>Chat : {data?.Chat}</p>
                  <p>Duration : {`${data?.Durations} mins`}</p>
                  <p>Date : {data?.date}</p>
                  <p>Time : {data?.Time}</p>
                </CardBody>
                <Divider />
                <CardFooter>
                  <Link isExternal showAnchorIcon href="https://github.com/nextui-org/nextui">
                    Start Conference
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center m-4">
          <h2 className="text-5xl">No scheduled conferences</h2>
        </div>
      )}
    </div>
    )
}

export default Scheduled;