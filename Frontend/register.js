'use strict'
const registerForm = document.querySelector(".registerForm");
const userImg=document.querySelector('.userImg')

let userImageUrl = ''
    const regError = document.querySelector('.regError')

    userImg.addEventListener('change', (event)=>{
        
        const target = event.target
        const files = target.files
        if(files){
            const formData = new FormData()
            formData.append("file", files[0])
            formData.append("upload_preset", "Notebook")
            formData.append("cloud_name", "dkgtf3hhj")

            fetch('https://api.cloudinary.com/v1_1/dkgtf3hhj/image/upload', {
                method: "POST",
                body: formData
            }).then((res) => res.json()).then(res => userImageUrl = res.url)
        }
    })

// HANDLE REGISTRATION

const userName = document.querySelector(".userName");
const userEmail = document.querySelector(".userEmail");
const userPhone = document.querySelector(".phoneNumber");
const repeatPassword=document.querySelector('.repeatPassword')
const userPassword = document.querySelector(".userPassword");

registerForm.addEventListener("submit", (e) => {
  e.preventDefault();

  
  let user =
    userName.value !== "" &&
    userEmail.value !== "" &&
    userPassword.value !== "" &&
    repeatPassword.value !=="" &&
    userPhone.value !== "";

    if (userPassword.value !== repeatPassword.value) {
        displayErrorMessage('Passwords do not match.');
        return; }

  if (user) {
    axios
      .post(
        "http://localhost:4700/user/register",

        {
          userName: userName.value,
          userEmail: userEmail.value,
          userPassword: userPassword.value,
          userPhone: userPhone.value,
          profilePic:userImageUrl
        },

        {
          headers: {
            "Content-type": "application/json",
          },
        }
      )
      .then((response) => {
        const resMessage=document.querySelector('.resMessage')
        setTimeout(()=>{
          resMessage.textContent=response.data.message
          resMessage.style.color="green"
          console.log(response.data);
        window.location.href = "./login.html";
        },1500)
        
      })
      .catch((e) => {
        console.log(e);
      });
  }
});