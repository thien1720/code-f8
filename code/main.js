function newDate(){
    let date = new Date()

    let year = date.getFullYear()
    let month = date.getMonth() +1
    let day = date.getDate()
  
    console.log(date)
    console.log(year)
    console.log(month)
    console.log(day)
    
}
newDate()


function getCurrenTimestamp (){
    let date = new Date()
    let milisecondes = date.getMilliseconds()
    timestamp = milisecondes /1000
    console.log(timestamp)

}
getCurrenTimestamp()


getCurrentTimestamp = () => timestamp = Math.floor(Date.now() / 1000)


let fullName = "thien \"pham\""
console.log(fullName)