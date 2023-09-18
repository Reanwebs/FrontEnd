
const GoLive = ()=>{

    
    return(
       
       <>
       <div className="h-screen">
        <h2 className="center-align">Get started with interactive live streaming</h2>
        <div className="flex justify-center">
        <div>
            <div>
            <input type="radio" id="host" name="joinAs" value="host"/>
                <label>Host</label><br/>
            </div>
            <div>
            <input type="radio" id="Audience" name="joinAs" value="audience"/>
                <label>Audience</label><br/>
            </div>
            <div className="flex justify-center">
                <button className="m-2" type="button" id="join">Join</button>
                <button className="m-2" type="button" id="leave">Leave</button>
            </div>
                
            </div>

        </div>
        </div>
       </>
   
    )
}


export default GoLive