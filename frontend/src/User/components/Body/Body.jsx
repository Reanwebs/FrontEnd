import Video from "../../components/Video/Video"

import "./Body.css"
import "./Body.scss"

const Body = () => {
  
  return (
  <>
    <div className="overlay-container w-full">
      <Video />
      <div className="text-overlay">
        <h1 className="scroll-text"> 
          <span>
            <span>Connect</span>
            <span>Collaborate</span>
            <span>Conquer</span>
          </span>
        </h1>
          <p></p>
        <h2>Elevate Your Connections with Seamless</h2>
          <p></p>
        <h2>Video Calls, Live Streaming, and Interactive Chat</h2>
      </div> 

      <div>
        <div className="content">
          <h2 className="title">Rean Connect - Where Connection Meets Collaboration
            <div className="aurora">
              <div className="aurora__item"></div>
              <div className="aurora__item"></div>
              <div className="aurora__item"></div>
              <div className="aurora__item"></div>
            </div>
          </h2>
        </div>
        
        <div className="intro-text">
          <div className="image-container">
             <img src="https://res.cloudinary.com/dcv6mx1nk/image/upload/v1696308922/profile/fwbb1xkkfqwrp1bpqd9p.jpg" alt="img" />
          </div>
          <div className="text-container">
            <p>Are you ready to experience a new era of online communication? Look no further! Rean Connect is your gateway to seamless video conferencing, dynamic group interactions, and a hub for like-minded individuals to connect.</p>
          </div>
        </div>

        
        {/* <div className="why-choose">
            <h2>Why Choose Rean?</h2>
            <ul>
              <li>
                <span>🌐 Create Your Account</span> 
                <h4>Sign up in a breeze and unlock a world of possibilities.</h4>
                <h4>Your journey begins with a personalized profile.</h4>        
              </li>         
              <li>         
                <span>💬 Private & Group Chat</span>
                <h4>Instantly connect with friends or make new ones.</h4>
                <h4>Engage in private conversations or create vibrant groups centered around your interests.</h4>
              </li>             
              <li>         
                <span>🎥 Video Conferencing</span>
                <h4> Take your conversations to the next level with high-quality, private video conferences.</h4> 
                <h4>Share moments, ideas, and insights face-to-face from anywhere in the world.</h4>       
              </li>   
              <li>       
                <span>🤝 Join Public Gatherings</span> 
                <h4>Explore a wide array of public conferences and discussions hosted by fellow users.</h4> 
                <h4>Expand your horizons, learn, and connect with a diverse community.</h4>            
              </li>              
              <li>
                <span>📽️ Record & Store</span>
                <h4>Never miss a moment! Record your video conferences,</h4>  
                <h4>store them securely in your profile, and revisit them whenever you want.</h4>               
              </li>
            </ul>
          </div>

        <div className="why-right-choice">
          <h2>Why Rean is the Right Choice?</h2>
          <ul>
            <li>
            <span>✨ User-Centric Design</span>
            <h4>Our platform is built with you in mind.</h4>  
            <h4>Enjoy an intuitive and seamless experience every step of the way.</h4>
            </li>
            <li>
            <span>🔒 Privacy & Security</span>
            <h4>Your data's safety is our priority. </h4> 
            <h4>We employ robust security measures to ensure your online interactions remain private.</h4>
            </li>
            <li>
            <span>🌟 Endless Possibilities</span>
            <h4>From one-on-one connections to large group discussions,</h4>  
            <h4>Rean-connect offers a platform where you can thrive.</h4>
            </li>
          </ul>
        </div>
      
        <div className="get-started">
        <p className="get-started-text">Join our vibrant community today and experience a new dimension of online communication.</p> 
        <p> Connect, collaborate, and create memories with REAN CONNECT. Your journey to meaningful connections starts here.</p>
          <button className="sign-up-button">Sign Up Now</button>
          <button className="learn-more-button">Learn More</button>
        </div> */}
      </div>

    </div>
     
  </>
     
  );
};
  
export default Body;