'use strict'
const loginForm=document.querySelector('.loginForm')
const userPassword=document.querySelector('.userPassword')
const userEmail=document.querySelector('.userEmail')

let userImage=''
let token=''
let userId=''

loginForm.addEventListener('submit', (e)=>{
     e.preventDefault()

    let userlogin=userEmail.value !=="" && userPassword.value !==""
    if(userlogin){
        axios 
        .post(
            "http://localhost:4700/user/login",
    
            {
              userEmail:userEmail.value,
              userPassword:userPassword.value,
            },
    
            {
              headers: {
                "Content-type": "application/json",
              },
            }
          ).then((res)=>{
            console.log(res.data)
            //alert(res.data.message)
            
            userId=res.data.userId
            localStorage.setItem('id',userId)
            token=res.data.token
            localStorage.setItem('token',token)
            userImage=res.data.profilePic
            localStorage.setItem('userImage',userImage)

            const resMessage=document.querySelector('.resMessage')
            setTimeout(()=>{
                resMessage.textContent=res.data.message
            },0)
            setTimeout(()=>{
                if(res.data.role=='admin'){
                    window.location.href='./admin.html'
                }else if(res.data.role !=='admin'){
                    window.location.href='./index.html'
                } 
            },1500)

             
          })
    }

})

const forgot=document.querySelector('.forgot')
forgot.addEventListener('click',()=>{
    window.location.href='./resetPassword.html'
})