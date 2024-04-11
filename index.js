

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

// -------------------------load spinner----------------------------

const spinner=document.getElementById('spinner')

// show spinner--------------------------------

function show_spinner()
{
   spinner.style.display='flex'
   const main__=document.getElementById('main__')
         main__.style.opacity='9%';
}

// hidd the spinner-----------------------------

function hidd_spinner()
{
   spinner.style.display='none'
   const main__=document.getElementById('main__')
         main__.style.opacity='100%';
}

//token----------------------

const token=localStorage.getItem('token')


// validate the contact pages

let email=document.getElementById("email_contact")
let username=document.getElementById("username_contact")
let text_area=document.getElementById('text_contact')
let form=document.getElementById("inputform")
let errorMsg=document.getElementsByClassName("errors")

email.addEventListener('change',(ev)=>
{
   
    if(username.value.trim()=='')
    {
        errorMsg[0].innerHTML="username can't be empty"
    }
    // ev.preventDefault() 
    if(email.value.trim() != '')
    { 
    for(let i=0; i<email.value.length; i++)
      {
         if(email.value[i]=='@')
         {
            errorMsg[1].innerHTML=''
            email.style.border = "none";
            return
         }
         else{
            errorMsg[1].innerHTML='The email is invired must contain "@"'
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
    if((username.value.trim() || email.value.trim()) == '')
    {
        errorMsg[0].innerHTML="username can't be empty"
        errorMsg[1].innerHTML="email can't be empty"
    }
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




// ------------------------------blogs--------------------------------------------//
//--------------------------------------------------------------------------------//


window.addEventListener('load', create_new_blog)

async function create_new_blog()
{
    try{    
            show_spinner()

            let {data:{blog:blog_list}}= await axios.get('http://localhost:3000/api/v1/admin/blog')

            let blog_container=document.getElementById('blog_cont')
            for(let i=0; i<blog_list.length; i++)
            {
                let new_blog_post_container=document.createElement('div')

                new_blog_post_container.innerHTML=
                `
                <img src="${blog_list[i].photo}">
                <div class="blog-row">
                    <div class="blog-text">
                        <h5>${blog_list[i].categorly}</h5>
                    </div>
                </div>
                <h4>${blog_list[i].title}</h4>
                <button onclick="show_content(this)" class="readmore_button">ReadMore...</button>
                `
                new_blog_post_container.classList.add('row_blog')
                new_blog_post_container.setAttribute("id", blog_list[i]._id)
                blog_container.append(new_blog_post_container)
            }
            hidd_spinner()
    }
    catch(error){
        console.log(error)
 }
}

// ReadMore Box----------------------------------------------------------------//

async function show_content(button_clicked)
{
    try{
        show_spinner()
        let readmore_box=document.getElementById('readmore')
        let main__=document.getElementById('main__')
        main__.style.opacity='9%';
        let parent_dv=button_clicked.parentElement
        
        
        const response= await axios.get(`http://localhost:3000/api/v1/admin/blog/${parent_dv.id}`)
        
        readmore_box.innerHTML=
        `
        <button onclick="close_box()" id='close_button'> <i class="ri-close-line" id='close_symbol'></i></button>
        <div class='content_box'>${response.data.content}</div>
        `
        readmore_box.style.display='flex'
        
        hidd_spinner()
        }
        catch(error)
        {
            console.log(error)
        }
}

let readmore_box=document.getElementById('readmore')
function close_box()
{
    readmore_box.style.display='none'
    let main__=document.getElementById('main__')
    main__.style.opacity='100%';
    console.log('clseddd')

}

// ---------------------------------send the message-----------------------------//
//--------------------------------------------------------------------------------//

form.addEventListener('submit', send_message)

function send_message()
{
    let email=document.getElementById("email_contact")
    let username=document.getElementById("username_contact")
    let text_area=document.getElementById('text_contact')  
    append_new_message(email.value,username.value,text_area.value)
    username.value=null
    email.value=null
    text_area.value=null
}

async function append_new_message(email_,username_,text_area)
{
    try{
        show_spinner()
        const current_date=new Date()
        const current_time=current_date.toDateString()
        const postdata={email:email_,username:username_,message:text_area, time:current_time}
        const {data:{contact:sent_message}}= await axios.post('http://localhost:3000/api/v1/admin/contact',{token:token,message_data:postdata})
        
        hidd_spinner()
    }
    catch(error){
        console.log(error)
    }
}
