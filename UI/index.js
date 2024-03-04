// for page styling
const header = document.querySelector('header')

window.addEventListener('scroll',function(){
    header.classList.toggle("sticky",window.screenY > 120);
})

let menu= document.querySelector('#menu-icon');
let navlist= document.querySelector('.navlist');

menu.onclick = () => {
    menu.classList.toggle('bx-x')
    navlist.classList.toggle('active')
    
}
window.onscroll = () => {
    menu.classList.remove('bx-x')
    navlist.classList.remove('active')
    
}


// validate the contact pages

let email=document.getElementById("email_contact")
let username=document.getElementById("username_contact")
let text_area=document.getElementById('text_contact')
let form=document.getElementById("inputform")
let errorMsg=document.getElementsByClassName("errors")

email.addEventListener('change',(ev)=>
{
    // ev.preventDefault() 
    if(email.value.trim() != '')
    { 
    for(let i=0; i<email.value.length; i++)
      {
         if(email.value[i]=='@')
         {
            errorMsg[1].innerHTML=''
            email.style.border = "none";

            console.log(email.value)
            return
         }
         else{
            errorMsg[1].innerHTML='The email is invired must contain "@"'
            console.log(email.value) 
        }
      }
    }
    else{
        errorMsg[1].innerHTML='The Email can not be empty'
        console.log('email is empty')
    }
})
username.addEventListener('change',(ev)=>
{
    // ev.preventDefault() 
    if(username.value.trim() != '')
    {
    for(let i=0; i<username.value.length; i++)
      {
        let symbol=['.','>','<',' ',',','!','/']
         for(let j=0; j<symbol.length; j++)
         {
            if(username.value[i]==symbol[j])
            {
                errorMsg[0].innerHTML="The user name can't contain symbol"
                // console.log(username.value[i], symbol[j])
            }
            else {
                errorMsg[0].innerHTML=''
                username.style.border = "none";
                console.log(username.value[i], symbol[j])
            }
         }
         
      }
    }
    else{
        errorMsg[1].innerHTML="Username can't be Empty"
        console.log('username empty')
    }
})

text_area.addEventListener('change',(ev)=>
{
    // ev.preventDefault
    if(text_area.value.trim() == '')
    {
        errorMsg[2].innerHTML="You can't submit Empty text"
    }
    else{
        errorMsg[2].innerHTML=''
        text_area.style.border="none"
    }
}
)

form.addEventListener('submit',(ev)=>
{
//   ev.preventDefault()
  check_the_input(username,0)
  check_the_input(email,1)
  check_the_input(text_area,2)
})

function check_the_input(elem,values)
{
    if(elem.value.trim()=='')
    {
        elem.style.border="1px solid red"
    }
}


// update the contact section

let experiance=document.getElementById("experience")
let speciality=document.getElementById("speciality")
let address=document.getElementById("address_")
let email_about=document.getElementById("email")
let phone=document.getElementById("Phone")
let avaiblity=document.getElementById("availblelity")

experiance.innerHTML=localStorage.getItem('experiance')

speciality.innerHTML=localStorage.getItem('speciality')

address.innerHTML=localStorage.getItem('address')

email_about.innerHTML=localStorage.getItem('email')

phone.innerHTML=localStorage.getItem('phone')

avaiblity.innerHTML=localStorage.getItem('avaiblity')