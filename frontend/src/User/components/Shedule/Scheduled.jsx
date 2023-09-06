import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";

const Scheduled =()=>{
    return(
         
      <div className="scheduled" >
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
              Link for joining the conference
            </Link>
          </CardFooter>
        </Card>
      </div>   
    )
}

export default Scheduled;