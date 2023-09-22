import { Chip, Input } from "@nextui-org/react"
import { CheckIcon } from '../../components/CheckIcon/CheckIcon'
import { Avatar} from "@nextui-org/react";


const ParticipantContainer = () => {
  return (
    <section className="h-fit m-2">
      <div className="flex  h-[830px]">
        <div className="flex-grow-2 w-3/4 flex flex-col">
          <div
            className="h-screen bg-cover bg-center container relative"
            style={{
              backgroundImage: `url("../../../../streambgimage.jpg")`
            }}
          >
            <div className="absolute top-0 right-0 mr-2 mt-2"> 
              <Chip
                startContent={<CheckIcon size={18} />}
                variant="faded"
                color="danger"
              >
                12 watching
              </Chip>
            </div>
            <p>Stream</p>
          </div>
          <div className="h-1/3 pt-12 pl-4">
            <div className="flex">
            <Avatar alt="ajith" className="flex-shrink-0" size="lg" src="../../../../streambgimage.jpg"/>
              <h1 className="font-bold m-2">Ajithv</h1>
            </div>
            <div className="ml-12">
               <h1 className="ml-2">some description about stream</h1>
            </div>
          </div>
        </div>
        <div className="flex-grow w-1/4 border-l border-gray-500">
         <div>
          <div className="text-center my-2">
            <h1 className="text-xl font-bold">Live Chat</h1>
          </div>
          <div className="overflow-y-scroll h-[700px] ml-6 message_container" >
          <div className="flex gap-2 flex-col">
            <div className="flex my-2">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
            <div className="flex ">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
             <div className="flex ">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
            <div className="flex my-2">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
            <div className="flex ">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
             <div className="flex ">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
            <div className="flex my-2">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
            <div className="flex ">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
             <div className="flex ">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
            <div className="flex my-2">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
            <div className="flex ">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
             <div className="flex ">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
            <div className="flex my-2">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
            <div className="flex ">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
             <div className="flex ">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
            <div className="flex my-2">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
            <div className="flex ">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
             <div className="flex ">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
            <div className="flex my-2">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
            <div className="flex ">
             <Avatar alt="ajith" className="flex-shrink-0" size="sm" src="../../../../streambgimage.jpg"/>
              <span className="text-small m-2">Ajithv</span>
              <span className="text-small text-default-400 m-2">haiiii</span>
            </div> 
          </div>
          </div>
            <div className="flex ml-4">
                <Input
                placeholder="send message"
                endContent={
                  <button>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                  </button>
                }
                />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ParticipantContainer;
