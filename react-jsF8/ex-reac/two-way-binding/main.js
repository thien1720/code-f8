import { useState } from "react";
import ReactDOM from "react-dom";

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

    // const [cheched ,setCheched] =useState()  
    const handleClick = (e) => {

    }
    return (
        <div>
            {courses.map(iteam =>
                <div key={iteam.id}>
                    <input type="radio" />
                    {iteam.name}
                </div>
            )}

            <button onClick={handleClick}>
                Register
            </button>
        </div>
    )
}

ReactDOM.render(<App />,app)