import proc from '../../utils/processor'
module.exports = (request, sender, sendResponse) => {
  console.log('Request', request)
  console.log('Sender, ',sender)
  proc.getProfile( (data) =>{
    if(sendResponse) sendResponse(data)
  })
  // console.log("HBHB")
  // var d  =document.querySelectorAll("script")



};
