
let email=document.getElementById("email_signup")
let username=document.getElementById("username_signup")
let password=document.getElementById("password_signup")
let form=document.getElementById("inputform")
let errorMsg=document.getElementsByClassName("errors")

email.addEventListener('change',function()
{
    

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
username.addEventListener('change',function()
{

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

password.addEventListener('change',function()
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

let signup_button=document.getElementById('signup_button')

signup_button.addEventListener('click', add_new_user)

async function add_new_user(ev)
{
    ev.preventDefault();
    try{
        const post_data={email:email.value, username:username.value, password:password.value}
    
        const response= await axios.post('https://my-bland-backend.onrender.com/api/v1/login/Registration', post_data)
       
        if(response.data.msg == 'user exist pls login')
        {
            alert(response.data.msg)
            window.location.assign('login.html')
        }
        
        else{
            window.location.assign('index.html')
        }
        
    }
    catch(error)
    {
        alert('Signup Failed due to network issue or incorrect login data')
            window.location.assign('signup.html')
            email.value=null
            username.value=null
            password.value=null
    }
}