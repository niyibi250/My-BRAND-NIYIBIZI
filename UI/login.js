let email=document.getElementById("email_signin")
let password=document.getElementById("password_signin")
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
            errorMsg[0].innerHTML=''
            email.style.border = "none";

            console.log(email.value)
            return
         }
         else{
            errorMsg[0].innerHTML='The email is invired must contain "@"'
            console.log(email.value) 
        }
      }
    }
    else{
        errorMsg[0].innerHTML='The Email can not be empty'
        console.log('email is empty')
    }
})

password.addEventListener('change',(ev)=>
{
    // ev.preventDefault
    if(password.value.trim() != '')
    {
       if(password.value.length < 8)
       {
        errorMsg[1].innerHTML='Password Must be greater OR equir to 8'
       }
       else{
        errorMsg[1].innerHTML=''
        password.style.border = "none";
       }
    }
    else{
        errorMsg[1].innerHTML="Password can't be Empty"
    }
}
)

form.addEventListener('submit',(ev)=>
{
  ev.preventDefault()
  check_the_input(email,0)
  check_the_input(password,1)
})

function check_the_input(elem,values)
{
  if(elem.value.trim()=='')
  {
      elem.style.border="1px solid red"
  }
}