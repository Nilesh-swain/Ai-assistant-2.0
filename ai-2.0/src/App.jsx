import { useState } from 'react'
import './App.css'

function App() {
  const [question, setQuestion] = useState('');
  const [result, setResult] = useState(undefined)

  const payload = {
    "contents": [
      {
        "parts": [
          {
            "text": question
          }
        ]
      }
    ]
  }

  const askQuestion = async () => {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDFQuEj9WlyEkFx7WylvCXHKw5RITM0IAU", {
      method: "POST",
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    // console.log(data.candidates[0].content.parts[0].text);
    setResult(data.candidates[0].content.parts[0].text);
  }


  return (
    <div className='grid grid-cols-5 h-screen text-center'>
      {/* Left Side Bar */}
      <div className='col-span-1 bg-zinc-800'>
      </div>
      {/* Right Side Bar */}
      <div className='col-span-4 p-4'>
        <div className="container h-170 overflow-scroll">
          <div className="text-white">
            {result}
          </div>
        </div>
        <div className='bg-zinc-800 w-1/2 p-1 pr-5 text-white m-auto rounded-4xl border border-zinc-700 flex h-16'>
          <input type="text" value={question} onChange={(event) => setQuestion(event.target.value)} className='w-full h-full p-3 outline-none' placeholder='Ask Me AnyThing.' />
          <button onClick={askQuestion} className='p-2 cursor-pointer'>Ask</button>
        </div>
      </div>
    </div>
  )
}
export default App
