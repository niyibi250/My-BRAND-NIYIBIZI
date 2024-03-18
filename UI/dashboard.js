
let experiance=document.getElementById("experience")
let speciality=document.getElementById("speciality")
let address=document.getElementById("address_")
let email=document.getElementById("email")
let phone=document.getElementById("Phone")
let avaiblity=document.getElementById("availblelity")
let submit_button=document.getElementById("Add_to_local_storege")
let form=document.getElementById("form")


form.addEventListener('submit', (ev)=>
{
    localStorage.setItem('experiance',experiance.value)

    localStorage.setItem('speciality',speciality.value)

    localStorage.setItem('address',address.value)

    localStorage.setItem('email',email.value)

    localStorage.setItem('phone',phone.value)

    localStorage.setItem('avaiblity',avaiblity.value)
    console.log('helllo')
})


// make blog create box visible
// ------------------------------//

// get div of create blog
let blog_create_box=document.getElementById('create_box')
// get create button
let create_button=document.getElementById('create_')

// put event listerner to crate button

create_button.addEventListener('click',show_create_box)

function show_create_box()
{
    blog_create_box.style.display='flex'
}

// make save button function
// --------------------------//
 
let create_blog=document.getElementById('create_button')

// attach on it event listerner

create_blog.addEventListener('click', create_blog_func)

let blog_list=JSON.parse(localStorage.getItem('blog_list')) || []

// get selected image
// ---------------------//

let blog_image=document.getElementById('input_image')

blog_image.addEventListener('change',tolacal)

    function tolacal(event)
    {
        let filereader=new FileReader()
        filereader.onload=function()
        {
            localStorage.setItem('image_url',filereader.result)
            console.log(filereader.result)
        }
        filereader.readAsDataURL(event.target.files[0])
    }


function create_blog_func()
{
    let blog_title=document.getElementById('title_')
    let blog_category=document.getElementById('category_')
    let blog_content=document.getElementById('text_')
    
    // get image from local storege
    let url_of_image=localStorage.getItem('image_url')

    // save it to local storege
    
    add_blog_to_local_storege(
    blog_title.value,
    blog_category.value,
    blog_content.value,
    url_of_image)
   

    // !!!!!!!!!!!!problem
    localStorage.removeItem('image_url')
    
}

function add_blog_to_local_storege(title, category, content, image)
{
   blog_list.push({
    title,
    category,
    content,
    image
   })
//    blog_list=[]
   localStorage.setItem('blog_list', JSON.stringify(blog_list))
   blog_create_box.style.display='none'
}


// cancel button 

let concel_button=document.getElementById('cancel_create')

concel_button.addEventListener('click',()=>
{
    blog_create_box.style.display='none'
})

window.addEventListener('load', showblog_on_admin)

function showblog_on_admin()
{
    let blog_list=JSON.parse(localStorage.getItem('blog_list'))
    let list_of_blog_cont=document.getElementById('list_of_blog_cont')
    
    for(let i=0; i<blog_list.length; i++)
    {
        let blog_cont=document.createElement('li')

        blog_cont.innerHTML=
        `
        <h4 class="titles">${blog_list[i].title}</h4>
        <h4 class="Blogs_categolies">${blog_list[i].category}</h4>
        <h4 class="last_madified">----</h4>
        <i class="ri-delete-bin-6-fill"></i>
        <i class="ri-pencil-fill"></i>
        `
        blog_cont.classList.add('blog')
        list_of_blog_cont.append(blog_cont)
    }
    let number_of_blog=document.getElementById('number_of_blogs')
    number_of_blog.innerHTML=blog_list.length+3

    
}
// DELETE all blog
// --------!!!!!!!!!---------//

let delete_all_blog_button=document.getElementById('delete_all_blog')

delete_all_blog_button.addEventListener('click',deleteworning)
//  get worning box
let worning_box=document.getElementById('worning_box')

// delete worning box delete all box
function deleteworning()
{
    worning_box.style.display='flex'
}
// abort delete
function close_delet_box()
{
    worning_box.style.display='none'
}
// yes delete all blog
function yes_delete_all_blog()
{
    localStorage.removeItem("blog_list")
    worning_box.style.display='none'
}

// ----------------------------------------------Message-------------------------------------------------------//

window.addEventListener('load', show_messages_on_dashboard)

async function show_messages_on_dashboard()
{
    try{
    const {data:{contact:message_list}}=await axios.get('http://localhost:3000/api/v1/admin/contact')

    let message_list_cont=document.getElementById('contact_message_list')
    
    for(let i=0; i<message_list.length; i++)
    {
        let massage_=document.createElement('li')

        massage_.innerHTML=
        `
        <h4 class="name_">${message_list[i].username}</h4>
        <h4 class="email_">${message_list[i].email}</h4>
        <h4 class="time_">----</h4>
        <i class="ri-mail-unread-line read_"></i>
        <i class="ri-delete-bin-6-fill delete_c"></i>
        <i class="ri-discuss-fill respond_"></i>
        `
        massage_.classList.add('message_')
        message_list_cont.append(massage_)
    }

    console.log('finished')

    }

    catch(error)
    {
        console.log(error)
    }
    
}

// ------------------------------------user-----------------------------------//


window.addEventListener('load',user_list_show)

async function user_list_show()
{
    try{
        
        const {data:{user:list_of_user}}=await axios.get('http://localhost:3000/api/v1/admin/user')
        
        let user_lists_cont=document.getElementById('user_list')
        for(let i=0;i<list_of_user.length; i++)
        {
            let user_list_element=document.createElement('li')
            user_list_element.innerHTML=
            `
            <h4 class="name_">${list_of_user[i].username}</h4>
            <h4 class="email_">${list_of_user[i].email}</h4>
            <h4 class="password">${list_of_user[i].password}</h4>
            <i class="ri-delete-bin-6-fill delete_c"></i>
            <i class="ri-pencil-fill"></i>
            `
            user_list_element.classList.add('user_row')
            user_lists_cont.append(user_list_element)
        }
        let number_of_users=document.getElementById('number_of_user')
        number_of_users.innerHTML=list_of_user.length+1
   }
   catch(error){
    console.log('user list not received', error)
   }
}