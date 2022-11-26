import { useState} from 'react'
import './App.css';

function App() {
  
  const [job,setJob] = useState('')
  const [jobs, setJobs] = useState(()=>{ 

    const getIeam = JSON.parse(localStorage.getItem('setKey'))
    return getIeam ?? []
  })

  // console.log(job)
  const handList = () =>{
    setJobs(prev => 
      {
      const newJobs = [...prev,job]
      const jsonJobs = JSON.stringify(newJobs)
      localStorage.setItem('setKey', jsonJobs)
      console.log(jsonJobs)
      return newJobs
      }
    )
    setJob('')
  }
  return (
    <div className="App">
      <input
        value= {job}
        onChange = {(e)=>
          setJob(e.target.value)
      }
      />
      <button
        onClick = {handList}
      >Add</button>
      <ul>
        {jobs.map(
          (job, index) =>(<li key={index}>{job}</li>)
          
          )}
      </ul>
    </div>
  );
}

export default App;
