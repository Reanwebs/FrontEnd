
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import { useState } from "react";

const Completed =()=>{
  const [completedData,setCompletedData] = useState([])
    return(
      <div>
      {completedData.length > 0 ? (
        <div className="scheduled">
          <div className="grid gap-4 grid-cols-4">
            {completedData.map((data, index) => (
              <Card className="max-w-[400px]" key={index}>
                <CardHeader className="flex gap-3">
                  <div className="flex flex-col">
                    <p className="text-md">{data?.title}</p>
                    <p className="text-small text-default-500">{data?.description}</p>
                  </div>
                </CardHeader>
                <Divider />
                <CardBody>
                  <p>Type : {data?.type}</p>
                  <p>Interest: {data?.interest}</p>
                  <p>Partcipant Limit: {data?.participantLimit}</p>
                  <p>Duration : {`${data?.durations} mins`}</p>
                  <p>Date : {data?.date}</p>
                  <p>Time : {data?.time}</p>
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
          <h2 className="text-5xl">No completed conferences</h2>
        </div>
      )}
    </div>
    )
    
}

export default Completed;