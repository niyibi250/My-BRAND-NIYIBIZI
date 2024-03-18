
let email=document.getElementById("email_signup")
let username=document.getElementById("username_signup")
let password=document.getElementById("password_signup")
let form=document.getElementById("inputform")
let errorMsg=document.getElementsByClassName("errors")

email.addEventListener('change',function(ev)
{
    // ev.preventDefault() 
    if(email.value.trim() != '')
    { 
    for(let i=0; i<email.value.length; i++)
      {
         if(email.value[i]=='@')
         {
            errorMsg[0].innerHTML=''
            return
         }
         else{
            errorMsg[0].innerHTML='The email is invired must contain "@"'
        }
      }
    }
    else{
        errorMsg[0].innerHTML='The Email can not be empty'
        console.log('email is empty')
    }
})
username.addEventListener('change',function(ev)
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
            }
         }
         
      }
    }
    else{
        errorMsg[1].innerHTML="Username can't be Empty"
    }
})

password.addEventListener('change',function(ev)
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
       }
    }
    else{
        errorMsg[2].innerHTML="Password can't be Empty"
    }
}
)

// add user to user_list
// --------------------------//
let user_list=JSON.parse(localStorage.getItem('user_list'))||[]
let signup_button=document.getElementById('signup_button')

signup_button.addEventListener('click',add_new_user)

function add_new_user()
{
    let email=document.getElementById("email_signup")
    let username=document.getElementById("username_signup")
    let password=document.getElementById("password_signup")
    add_to_user_list(email.value,username.value,password.value )
    email.value=null
    user_list.value=null
    password.value=null
    console.log('its should log homepage')
}
function add_to_user_list(email,username,password)
{
    user_list.push({
        username,
        email,
        password
    })
    // user_list=[]
    localStorage.setItem('user_list',JSON.stringify(user_list))
    window.location.assign('index.html')
}