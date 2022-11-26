function List(props){
    return (
        <div className="list-count">
            <ul>
                <li className="list-item"
                    onClick = {props.onClick}
                >{props.name}</li>
            </ul>
        </div>
    )
}

function App() {
    const headName = (name) =>{
        console.log(name);

    }
    return (
        <div>
            <List 
                name="javascript"
                onClick={headName}
            />
            <List name="ruby"/>
            <List name="PHP"/>
            <List name="java"/>
        </div>

    )
}
ReactDOM.render(<App />,app)