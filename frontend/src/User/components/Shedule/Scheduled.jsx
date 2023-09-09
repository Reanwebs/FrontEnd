import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import { useState,useEffect } from "react";
import { useScheduledConferenceMutation } from "../../slices/api_slices/usersConferenceApi";
import {toast} from 'react-toastify'


const Scheduled =()=>{

  const [scheduledData,setScheduledData] = useState([])
  const [scheduledConference] = useScheduledConferenceMutation()


  useEffect(()=>{
    scheduledDataHandler();
  },[scheduledData])
  
  async function scheduledDataHandler(){
    try {
      const data = await scheduledConference().unwrap();
      console.log(data);
      setScheduledData(data)
    } catch (error) {
      console.log(error);
      toast.error(error?.data?.message || error?.message)
    }

  }
    return(
         
      <div className="scheduled" >
        <div className="grid gap-4 grid-cols-4">
        {['1','2','3','6','7'].map(()=>
        <>
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <Image
              alt="nextui logo"
              height={40}
              radius="sm"
              src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
              width={40}
            />
            <div className="flex flex-col">
              <p className="text-md">JaneFisher</p>
              <p className="text-small text-default-500">jainfisher@gmail.com</p>
            </div>
          </CardHeader>
          <Divider/>
          <CardBody>
            <p>Private Conference</p>
            <p></p>
            <p>Designing</p>
            <p>Make beautiful websites regardless of your design experience.</p>
            <p>Date : </p>
            <p>Time : </p>

          </CardBody>
          <Divider/>
          <CardFooter>
            <Link
              isExternal
              showAnchorIcon
              href="https://github.com/nextui-org/nextui"
            >
              Start Conference
            </Link>
          </CardFooter>
        </Card>
        </>
        )}
        </div>
      </div>   
    )
}

export default Scheduled;