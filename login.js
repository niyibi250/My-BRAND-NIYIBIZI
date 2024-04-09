
// -------------------------load spinner----------------------------

const spinner=document.getElementById('spinner_login')

// show spinner--------------------------------

function show_spinner()
{
   spinner.style.display='flex'
   const main__=document.getElementById('main_login')
   main__.style.opacity='9%';
}

// hidd the spinner----------------------------------------------

function hidd_spinner()
{
   spinner.style.display='none'
   const main__=document.getElementById('main_login')
   main__.style.opacity='100%';
}

// ---------------------------------------------------------------

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

// redirect---------------------------------------------------

let login_button=document.getElementById('login_button')

login_button.addEventListener('click',check_user)

async function check_user(ev)
{
   ev.preventDefault();
    try{
         show_spinner()
        const post_data={email:email.value, password:password.value}

          const response=await axios.post('https://my-bland-backend.onrender.com/api/v1/login/login', post_data)
          
          if(response.data.user == null)
          {
            errorMsg[0].innerHTML='Incorrect Email OR Password'
            errorMsg[1].innerHTML='Incorrect Email OR Password'
            hidd_spinner()
            return
          }
          else if(response.data.user.email == 'admin123@gmail.com' && response.data.user.password == 'admin12345')
          {
            window.location.assign('dashboard.html')
            localStorage.setItem('token',response.data.token)
            hidd_spinner()
            return
          }

          else{
            window.location.assign('index2.html')
            localStorage.setItem('taken',response.data.token)
            hidd_spinner()
            return
          }

         
  }
  catch(error)
  {
    alert('Signup Failed due to network issue or incorrect login data')
    window.location.assign('login.html')
  }
      
}