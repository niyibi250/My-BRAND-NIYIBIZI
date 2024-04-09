
//  ----------------------------QUILL Editor----------------------------------------------

const toolbaroptions=[
   ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']  
]

const options = {
   modules: {
     toolbar: toolbaroptions,
   },
   placeholder: 'Compose the Blog......',
   theme: 'snow'
 };
//QUILL Editor for create Blog-----------------
const quill_blog_create = new Quill('#blog_content',options);

//QUILL Editor for Edit Blog

const quill_blog_edit = new Quill('#blog_content_edit',options);

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


//------------------ Reload window---------------------------

window.addEventListener('load', ()=>{
   get_list_of_user()
   get_list_of_blog()
   get_list_of_message()
})

const token =localStorage.getItem('token')

// --------------------------------------user--------------------------------------//
//---------------------------------------------------------------------------------//


async function get_list_of_user()
{
   try{

    show_spinner()
    const {data:{user:list_of_user}}=await axios.get('https://my-bland-backend.onrender.com/api/v1/admin/user')

    const table_user= document.getElementById('table_user')
    for(let i=0; i<list_of_user.length; i++)
    {
      let user_=document.createElement('tr')

      user_.innerHTML=
      `
      <td class="table_data">${list_of_user[i].username}</td>
      <td class="table_data">${list_of_user[i].email}</td>
      <td class="table_data">${list_of_user[i].password}</td>
      <td class="table_data"><button class="icon_" onclick="delete_user(this)"><i class="ri-delete-bin-6-fill"></i></button></td>
      <td class="table_data"><button class="icon_" onclick="edit_user(this)"><i class="ri-pencil-fill"></i></button></td>
      `
      user_.classList.add('table_row')
      user_.setAttribute("id", list_of_user[i]._id)
      table_user.append(user_)
      hidd_spinner()

    }
   //  console.log(list_of_user)
   document.getElementById('number_of_user').innerHTML=list_of_user.length+2
   document.getElementById('number_of_user_').innerHTML=list_of_user.length+2
   }
   catch(error)
   {
      console.log(error)
   }
}



//desplay the wonning box for delete user------------------------------------

var grandparent_id_user;

function delete_user(button)
{
   //get id of clicked user
   var parentElement = button.parentNode;
   var grandparent= parentElement.parentNode
   grandparent_id_user = grandparent.id;

   // worning box

   const delete_user_worning_box=document.getElementById('delete_user_wanning')
   delete_user_worning_box.style.display='flex'

   console.log(grandparent_id_user)

   const main__=document.getElementById('main__')
         main__.style.opacity='9%';
}

// cancel the delete user------------------------------

function cancel_delete_user(child)
{
    const parElement=child.parentNode
    const grandparent=parElement.parentNode
    grandparent.style.display='none'
    console.log(grandparent_id_user)
    const main__=document.getElementById('main__')
         main__.style.opacity='100%';
}

// send the req for delete user----------------------------------

async function send_delete_user_req() {
   try{
            show_spinner()
            //send the delete requirest
            const delete_user_worning_box=document.getElementById('delete_user_wanning')
            delete_user_worning_box.style.opacity='9%'
            const {data:{user:deleted_user}}= await axios.delete(`https://my-bland-backend.onrender.com/api/v1/admin/user/${grandparent_id_user}`)
            console.log(deleted_user)
           
      
            delete_user_worning_box.style.display='none'

            const main__=document.getElementById('main__')
            main__.style.opacity='100%';

            hidd_spinner()
            // reload window
            window.location.reload();
            delete_user_worning_box.style.opacity='100%'
   }
   catch(error){
       console.log(error)
   }
   
}

// edit user--------------------------------------------------


async function edit_user(button)
{
   try{
         show_spinner()
         // get id of clicked user

         var parentElement = button.parentNode;     
         var grandparent= parentElement.parentNode
         grandparent_id_user= grandparent.id;
         console.log(grandparent_id_user)

         // send the get single user requirest
         const response=await axios.get(`https://my-bland-backend.onrender.com/api/v1/admin/user/${grandparent_id_user}`)
         console.log(response.data)


         //set the user editor box
         const edit_user_box=document.getElementById('edit_user_box')
         document.getElementById('username_contact').value=response.data.user.username
         document.getElementById('email_contact').value=response.data.user.email
         document.getElementById('Password_contact').value=response.data.user.password
         edit_user_box.style.display= 'flex';

         hidd_spinner()
         const main__=document.getElementById('main__')
         main__.style.opacity='9%';
   }

   catch(error)
   {
      console.log(error)
   }

}

//post edited user------

async function post_user()
{
   try{
         show_spinner()
         const edit_user_box=document.getElementById('edit_user_box')
         edit_user_box.style.opacity='9%'
         const username=document.getElementById('username_contact').value
         const email=document.getElementById('email_contact').value
         const password=document.getElementById('Password_contact').value
         
         const update_user_data={username:username, email:email, password:password}

         const response=await axios.patch(`https://my-bland-backend.onrender.com/api/v1/admin/user/${grandparent_id_user}`,{token:token, user_data:update_user_data})
         

         hidd_spinner()
         window.location.reload()
         //set user editor
         edit_user_box.style.display= 'none';
         const main__=document.getElementById('main__')
         main__.style.opacity='100%';
         edit_user_box.style.opacity='100%'
   }
   catch(error)
   {
     console.log(error)
   }

}

// ------------------------------blog--------------------------------------//
//-------------------------------------------------------------------------//

async function get_list_of_blog()
{
   try{
    
     show_spinner() 
    const {data:{blog:list_of_blog}}=await axios.get('https://my-bland-backend.onrender.com/api/v1/admin/blog')
     

    const table_blog= document.getElementById('table_blog')
    for(let i=0; i<list_of_blog.length; i++)
    {
      let blog_=document.createElement('tr')
      
      blog_.innerHTML=
      `
      <td class="table_data" id="blog_first_low">${list_of_blog[i].title}</td>
      <td class="table_data">${list_of_blog[i].categorly}</td>
      <td class="table_data">${list_of_blog[i].time}</td>
      <td class="table_data"><button class="icon_" onclick="delete_blog(this)"><i class="ri-delete-bin-6-fill delete"></i></button></td>
      <td class="table_data"><button class="icon_" onclick="Edit_blog(this)"><i class="ri-pencil-fill"></i></button></td>
      `
      blog_.classList.add('table_row')
      blog_.setAttribute("id", list_of_blog[i]._id)
      table_blog.append(blog_)
      document.getElementById('last_mod_blog').innerHTML=list_of_blog[i].time
      hidd_spinner()
    }
   
    document.getElementById('number_of_blogs').innerHTML=list_of_blog.length+3
    document.getElementById('number_of_blog_').innerHTML=list_of_blog.length+3
    
   }
   catch(error)
   {
      console.log(error)
   }
}
// desplay the delete blog wonning box-----------------------------------

var grandparent_id_blog

function delete_blog(button)
{
            var parentElement = button.parentNode;
            
            var grandparent= parentElement.parentNode
            grandparent_id_blog = grandparent.id;

            const delete_blog_worning_box=document.getElementById('delete_blog_wanning')
            delete_blog_worning_box.style.display='flex'

            console.log(grandparent_id_blog)

            const main__=document.getElementById('main__')
           main__.style.opacity='9%';


}

// send delete blog req-----------------------------------------------------------------

async function send_delete_blog_req() {
   try{

            show_spinner()
            
            const delete_blog_worning_box=document.getElementById('delete_blog_wanning')
            delete_blog_worning_box.style.opacity='9%'

            const response= await axios.delete(`https://my-bland-backend.onrender.com/api/v1/admin/blog/${grandparent_id_blog}`)
            console.log(response.data)

            // reload window---------
            const main__=document.getElementById('main__')
            main__.style.opacity='9%';

            hidd_spinner()
           
            window.location.reload();

            delete_blog_worning_box.style.opacity='100%'
   }
   catch(error){
       console.log(error)
   }
   
}


// Edit single blog------------------------------------

var grandparent_id_blog;

async function Edit_blog(button)
{
   try{
        show_spinner() 
        var parentElement = button.parentNode;     
         var grandparent= parentElement.parentNode
         grandparent_id_blog= grandparent.id;
 

         const response= await axios.get(`https://my-bland-backend.onrender.com/api/v1/admin/blog/${grandparent_id_blog}`)

         console.log(response)

         document.getElementById('edit_blog_title').value=response.data.title                         
         document.getElementById('edit_blog_categorly').value=response.data.categorly         
         quill_blog_edit.root.innerHTML=response.data.content


         const edit_blog_box=document.getElementById('edit_blog_container')

         edit_blog_box.style.display= 'flex';  
         
         const main__=document.getElementById('main__')
         main__.style.opacity='9%';
         
         console.log('am called')
         hidd_spinner()
   }
catch(error)
{
   console.log(error)
}

}
// post edited blog-----

async function post_edited_blog()
{
   try{
        show_spinner()
        
        const edit_blog_container=document.getElementById('edit_blog_container')
        
        edit_blog_container.style.opacity='9%'

        const title=document.getElementById('edit_blog_title').value                      
         const categorly=document.getElementById('edit_blog_categorly').value        
         const content=quill_blog_edit.root.innerHTML
         const photo=localStorage.getItem('image_url')
         localStorage.removeItem('image_url')
         const current_date=new Date()
         const current_time=current_date.toDateString() 
         const blog_post_data={title:title, categorly:categorly, photo,content:content, time:current_time}
         
         const response=await axios.patch(`https://my-bland-backend.onrender.com/api/v1/admin/blog/${grandparent_id_blog}`, {token:token, blog_data:blog_post_data})

         console.log(response)
         const edit_blog_box=document.getElementById('edit_blog_container')
         edit_blog_box.style.display= 'none';  
         
         const main__=document.getElementById('main__')
         main__.style.opacity='100%';

         hidd_spinner()
         window.location.reload();
         edit_blog_container.style.opacity='100%'
         
   }
   catch(error)
   {
      console.log(error)
      console.log(grandparent_id_blog)
   }
}

// create blog_box-------------------------------------


function create_blog_func()
{
   const create_blog_box=document.getElementById('create_blog_container')

    create_blog_box.style.display= 'flex'; 
    
    const main__=document.getElementById('main__')
    main__.style.opacity='9%';

    
    console.log('am called')
}

// concel the blog_creation------------------------------

function concelingfunc()
{
   console.log('the concel button is colled')
   const create_blog_box=document.getElementById('create_blog_container')
   const edit_blog_box=document.getElementById('edit_blog_container')

   if(create_blog_box || edit_blog_box)
   {
      if(create_blog_box)
      {
         create_blog_box.style.display='none'
      }
      edit_blog_box.style.display='none'
   }
   document.getElementById('blog_title').value=null
   document.getElementById('blog_categorly').value=null
   document.getElementById('blog_photo').value=null
   
   if(quill_blog_create || quill_blog_edit)
   {
      if(quill_blog_create)
      {
         quill_blog_create.setText('')
      }
      quill_blog_edit.setText('')
   }
   
   const main__=document.getElementById('main__')
    main__.style.opacity='100%';
}

//convert image into base 64--------------------------------------------//

function convert_image_to_base64(event)
{
    let filereader=new FileReader()
    filereader.onload=function()
    {
        localStorage.setItem('image_url',filereader.result)
      //   console.log(filereader.result)
    }
    filereader.readAsDataURL(event.target.files[0])
}


//post blog in database--------------------------------------------------//

async function postblog()
{ 
   try{
      show_spinner()
      var htmlContent = quill_blog_create.root.innerHTML;

      const create_blog_box=document.getElementById('create_blog_container')
      create_blog_box.style.opacity='9%'
      var blog_title=document.getElementById('blog_title')
      var blog_categorly=document.getElementById('blog_categorly')
      var blog_photo=localStorage.getItem('image_url')

      var current_date=new Date()
      var current_time=current_date.toDateString()
      localStorage.removeItem('image_url')
      const blog_data={title:blog_title.value, categorly:blog_categorly.value, photo:blog_photo, content:htmlContent, time:current_time}
     
      
      const response=await axios.post('https://my-bland-backend.onrender.com/api/v1/admin/blog',{token:token, blog_data:blog_data})
      

      

   concelingfunc()

   hidd_spinner()

   //   reload the window----
     window.location.reload();

     create_blog_box.style.opacity='100%'
    
   }
   catch(error)
   {
       console.log(error)
       console.log({token})
   }
}

// edit OR update Blog-----------------------------------------------------//




//------------------------contact Message----------------------------------//
//-------------------------------------------------------------------------//

async function get_list_of_message()
{
   
   try{
    show_spinner()
    const {data:{contact:list_of_message}}=await axios.get('https://my-bland-backend.onrender.com/api/v1/admin/contact')

    const table_message= document.getElementById('table_message')
    for(let i=0; i<list_of_message.length; i++)
    {
      let message_=document.createElement('tr')
      
      message_.innerHTML=
      `
      <td class="table_data">${list_of_message[i].username}</td>
      <td class="table_data">${list_of_message[i].email}</td>
      <td class="table_data">${list_of_message[i].time}</td>
      <td class="table_data"> <button class="icon_" onclick="read_message(this)"><i class="ri-mail-unread-line read_"></i></button></td>
      <td class="table_data"><button class="icon_" onclick="delete_message(this)"><i class="ri-delete-bin-6-fill delete_c"></i></button></td>
      `
      message_.classList.add('table_row')
      message_.setAttribute("id", list_of_message[i]._id)
      table_message.append(message_)
      document.getElementById('last_mod_message').innerHTML=list_of_message[i].time
     
    }
    hidd_spinner()
    document.getElementById('number_of_message').innerHTML=list_of_message.length+2
    document.getElementById('number_of_message_').innerHTML=list_of_message.length+2
    

   //  console.log(list_of_message, 'finshed message')
   }
   catch(error)
   {
      console.log(error)
   }
}


// delete message wanning box---------------------------------

var grandparent_id_message;

function delete_message(button)
{
   var parentElement = button.parentNode;
            
   var grandparent= parentElement.parentNode
   grandparent_id_message = grandparent.id;

   const delete_message_worning_box=document.getElementById('delete_message_wanning')
   delete_message_worning_box.style.display='flex'

   console.log(grandparent_id_message)

   const main__=document.getElementById('main__')
         main__.style.opacity='9%';
}

// send delete message req----------------------------------

async function send_delete_message_req() {
   try{
            show_spinner()
            const delete_message_worning_box=document.getElementById('delete_message_wanning')
            delete_message_worning_box.style.opacity='9%'
            const {data:{contact:deleted_contact}}= await axios.delete(`https://my-bland-backend.onrender.com/api/v1/admin/contact/${grandparent_id_message}`)
            console.log(deleted_contact)

            hidd_spinner()
            // reload window
            window.location.reload();
            delete_message_worning_box.style.opacity='100%'
   }

   catch(error){
       console.log(error)
   }
   
}

// read message----------------


async function read_message(button)
{
   try{
        show_spinner()
         var parentElement = button.parentNode;       
         var grandparent= parentElement.parentNode
         grandparent_id_message = grandparent.id;
         
         const response=await axios.get(`https://my-bland-backend.onrender.com/api/v1/admin/contact/${grandparent_id_message}`)

         console.log(response)
         document.getElementById('username_message').value=response.data.contact.username
         document.getElementById('emai_massage').value=response.data.contact.email
         document.getElementById('text_message').value=response.data.contact.message

         const edit_user_box=document.getElementById('edit_message_box')
         edit_user_box.style.display= 'flex';
         const main__=document.getElementById('main__')
         main__.style.opacity='9%';
         hidd_spinner()

   
}
catch(error)
{
   console.log(error)
}
}

// delete message from inside message view box---

async function delete_message_in_box()
{
   try{
      show_spinner()
      const response= await axios.delete(`https://my-bland-backend.onrender.com/api/v1/admin/contact/${grandparent_id_message}`)
         
         console.log(response)

         cancel_message_viewing()

         hidd_spinner()

         window.location.reload()
   }
   catch(error)
   {
       console.log(error)
   }
}


function cancel_message_viewing()
{
   const view_message_box=document.getElementById('edit_message_box')
   const edit_user_box=document.getElementById('edit_user_box')
   if(view_message_box || edit_user_box)
   {
      if(view_message_box)
      {
         view_message_box.style.display= 'none';
      }
      edit_user_box.style.display= 'none';
   }
   
   const main__=document.getElementById('main__')
   main__.style.opacity='100%';
}


//-------------------------------------------------------------
