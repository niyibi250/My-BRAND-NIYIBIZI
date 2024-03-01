
let email=document.getElementById("email_signup")
let username=document.getElementById("username_signup")
let password=document.getElementById("password_signup")
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
                errorMsg[1].innerHTML="The user name can't contain symbol"
                // console.log(username.value[i], symbol[j])
            }
            else {
                errorMsg[1].innerHTML=''
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

password.addEventListener('change',(ev)=>
{
    // ev.preventDefault
    if(password.value.trim() != '')
    {
       if(password.value.length < 8)
       {
        errorMsg[2].innerHTML='Password Must be greater OR equir to 8'
       }
       else{
        errorMsg[2].innerHTML=''
        email.style.border = "none";
       }
    }
    else{
        errorMsg[2].innerHTML="Password can't be Empty"
    }
}
)

form.addEventListener('submit',(ev)=>
{
  ev.preventDefault()
  check_the_input(email,0)
  check_the_input(username,1)
  check_the_input(password,2)
})

function check_the_input(elem,values)
{
    if(elem.value.trim()=='')
    {
        elem.style.border="1px solid red"
    }
    
}