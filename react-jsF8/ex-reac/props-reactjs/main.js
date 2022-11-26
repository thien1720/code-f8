function PostIteam(course){
    return (
        <div className="wrapper">
            <img src={course.img} />
            <h2>{course.title}</h2>
            <p>{course.description}</p>
            <p>{course.name}</p>
        </div>
    )
}


function App() {
    return (
        <div className="waraper1">
            <PostIteam
                img = "https://dotobjyajpegd.cloudfront.net/photo/5eba58fb737e8d0c11e1cb4b_m"
                title ="Cách trang điểm nhẹ nhàng kiểu Hàn Quốc khiến bao nàng mê mệ"
                description ="Xu hướng makeup của Hàn Quốc làm cho nhiều chị em nghiện makeup phải xao xuyến bởi độ nhẹ nhàng và tự nhiên của em í mang lại."
                name="Thien"
            />
             <PostIteam
                img = "https://dotobjyajpegd.cloudfront.net/photo/5eba58fb737e8d0c11e1cb4b_m"
                title =" Love Cách trang điểm nhẹ nhàng kiểu Hàn Quốc khiến bao nàng mê mệ"
                description =" Love Xu hướng makeup của Hàn Quốc làm cho nhiều chị em nghiện makeup phải xao xuyến bởi độ nhẹ nhàng và tự nhiên của em í mang lại."
                name="Thien Love "
            />
             <PostIteam
                img = "https://dotobjyajpegd.cloudfront.net/photo/5eba58fb737e8d0c11e1cb4b_m"
                title ="You Cách trang điểm nhẹ nhàng kiểu Hàn Quốc khiến bao nàng mê mệ"
                description ="You Xu hướng makeup của Hàn Quốc làm cho nhiều chị em nghiện makeup phải xao xuyến bởi độ nhẹ nhàng và tự nhiên của em í mang lại."
                name="ThienYou "
            />
            {/* {props.map((iteam,index) => {
              
              <PostIteam 
                  key={index}
                  iteam ={iteam}
              />
              console.log(iteam)
            })} */}
            
        </div>
    )
}

ReactDOM.render(<App />,app)