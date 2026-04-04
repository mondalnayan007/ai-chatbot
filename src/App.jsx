import React from "react"

function App() {

  const asking = ()=>{

    
     
  }

  return (
    < div className="grid grid-cols-5 text-white text-center">
        <div className="bg-[#1e2047] h-screen">
             hello
        </div>
        <div className="col-span-4">
          <h1>Hello user, Ask Anything to me....!!!!!!!!</h1>

          <div className="h-[80%]">

          </div>
          <div className=" w-[60%] m-auto  bg-[#1e2047]  rounded-2xl border-2 border-zinc-600   flex px-4 py-3">
             
             <input type="search" name="" id="search" className="w-full h-full outline-none" placeholder="Ask Anything......." />
             <button onClick={asking} className="cursor-pointer">Ask</button>
            
          </div>
        
        </div>
    </div>
  )
}

export default App
