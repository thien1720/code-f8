import { useState } from "react";

const courses=[
  { 
      id:1,
      name:'html,css'
  },
  { 
      id:2,
      name:'javascript'
  },
  { 
      id:3,
      name:'reactJs'
  },
  { 
      id:4,
      name:'nodejs'
  },
  
]

function App() {
  const [checked, setChecked] = useState([])
  
  const handleClick = () => {
    console.log({id:checked})
  }

  const handleCheck = (id) => {
    setChecked(pre =>{
      const isChecked = checked.includes(id)
      if(isChecked){
          return checked.filter(iteam => iteam !==id)

      }else{
        return [...pre, id]

      }

    })

  }


  return (
    <div className="App" style={{margin:10}}>
      {courses.map(course => 
        <div key={course.id}>
          <input 
            type="checkbox"
            checked = {checked.includes(course.id)}
            onChange={() => handleCheck(course.id)}

          />
          {course.name}
        </div>  
      )}  
      <button onClick={handleClick}> Register</button>

    </div>
  );
}

export default App;
