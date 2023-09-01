import Video from "../../components/Video/Video"
import "./Body.css"
import "./Body.scss"
import { Button } from "@nextui-org/react";

const Body = () => {
    return (
    <>
      <div className="overlay-container">
          <Video />
          <div className="text-overlay">
               <h1> 
               <span>
		       <span>Connect</span>
		       <span>Collaborate</span>
		       <span>Conquer</span>
	           </span>
               </h1>
               <p></p>
               <h2>Elevate Your Connections with Seamless</h2>
               <p></p>
               <h2>Video Conferencing</h2>
           </div> 

           <div className="ball" data-splitting>
             <div className="ball-top"></div>
           </div>
              
     </div>
     
    </>
     
    );
  };
  
export default Body;