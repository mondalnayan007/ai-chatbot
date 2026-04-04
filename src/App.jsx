import React, { useState } from "react"
import { GoogleGenAI } from "@google/genai";

function App() {

  const [question,setQuestion] = useState('')
  const [result,setResult] = useState('')

  const API_KEY = "AIzaSyAcjkwOz2m8KvwwKTJ2G-frSD2JCGaqwbw"

  const ai = new GoogleGenAI({ apiKey: API_KEY });
 

  const askQuestion = async ()=>{

    const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: question,
  });
  setResult(response.text);
     
  }

  return (
    < div className="grid grid-cols-5 text-white text-center">
        <div className="bg-[#1e2047] h-screen">
             hello
        </div>
        <div className="col-span-4">
          <h1>Hello user, Ask Anything to me....!!!!!!!!</h1>

          <div className="h-[80%]">
             <p>{result}</p>
          </div>
          <div className=" w-[60%] m-auto  bg-[#1e2047]  rounded-2xl border-2 border-zinc-600   flex px-4 py-3">
             
             <input type="text" name="" value={question}  onChange={(e)=>setQuestion(e.target.value)} id="" className="w-full h-full outline-none" placeholder="Ask Anything......." />
             <button onClick={askQuestion} className="cursor-pointer">Ask</button>
            
          </div>
        
        </div>
    </div>
  )
}

export default App
