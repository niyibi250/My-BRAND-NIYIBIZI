
//  QUILL Editor----------------------------------------------


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


// Reload window---------------------------

window.addEventListener('load', get_list_of_user)
window.addEventListener('load',get_list_of_blog)
window.addEventListener('load',get_list_of_message)

// -----------------user-------------------//
//-----------------------------------------//


async function get_list_of_user()
{
   try{

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
    }
    console.log(list_of_user)
   }
   catch(error)
   {
      console.log(error)
   }
}

async function delete_user(button) {
   try{
           //get id of clicked user
            var parentElement = button.parentNode;
            var grandparent= parentElement.parentNode
            var grandparent_id = grandparent.id;
            
            //send the delete requirest
            const {data:{user:deleted_user}}= await axios.delete(`https://my-bland-backend.onrender.com/api/v1/admin/user/${grandparent_id}`)
            console.log(deleted_user)

            // reload window
            window.location.reload();
   }
   catch(error){
       console.log(error)
   }
   
}

// edit user--------------------------------------------------

var grandparent_id_user;

async function edit_user(button)
{
   try{
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
         const main__=document.getElementById('main__')
         main__.style.opacity='4%';
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
         const edit_user_box=document.getElementById('edit_user_box')
         const username=document.getElementById('username_contact').value
         const email=document.getElementById('email_contact').value
         const password=document.getElementById('Password_contact').value
         
         const update_user_data={username:username, email:email, password:password}

         const response=await axios.patch(`https://my-bland-backend.onrender.com/api/v1/admin/user/${grandparent_id_user}`,update_user_data)
         
         console.log(response)
         //set user editor
         edit_user_box.style.display= 'none';
         const main__=document.getElementById('main__')
         main__.style.opacity='100%';
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
    const {data:{blog:list_of_blog}}=await axios.get('https://my-bland-backend.onrender.com/api/v1/admin/blog')
    const table_blog= document.getElementById('table_blog')
    for(let i=0; i<list_of_blog.length; i++)
    {
      let blog_=document.createElement('tr')
      
      blog_.innerHTML=
      `
      <td class="table_data" id="blog_first_low">${list_of_blog[i].title}</td>
      <td class="table_data">${list_of_blog[i].categorly}</td>
      <td class="table_data">-----</td>
      <td class="table_data"><button class="icon_" onclick="delete_blog(this)"><i class="ri-delete-bin-6-fill delete"></i></button></td>
      <td class="table_data"><button class="icon_" onclick="Edit_blog(this)"><i class="ri-pencil-fill"></i></button></td>
      `
      blog_.classList.add('table_row')
      blog_.setAttribute("id", list_of_blog[i]._id)
      table_blog.append(blog_)
    }
    console.log(list_of_blog, 'finshed blog')
   }
   catch(error)
   {
      console.log(error)
   }
}
// delete single blog-----------------------------------
async function delete_blog(button) {
   try{

            var parentElement = button.parentNode;
            
            var grandparent= parentElement.parentNode
            var grandparent_id = grandparent.id;
            const {data:{blog:deleted_blog}}= await axios.delete(`https://my-bland-backend.onrender.com/api/v1/admin/blog/${grandparent_id}`)
            console.log(deleted_blog)

            // reload window---------
            window.location.reload();
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
         var parentElement = button.parentNode;     
         var grandparent= parentElement.parentNode
         grandparent_id_blog= grandparent.id;


         const response= await axios.get(`https://my-bland-backend.onrender.com/api/v1/admin/blog/${grandparent_id_blog}`)

         console.log(response)

         document.getElementById('edit_blog_title').value=response.data.title                         
         document.getElementById('edit_blog_categorly').value=response.data.categorly         
         document.getElementById('blog_content_edit').value=response.data.content

         // document.getElementById('blog_photo').value=response.data.photo

         const edit_blog_box=document.getElementById('edit_blog_container')

         edit_blog_box.style.display= 'flex';  
         
         const main__=document.getElementById('main__')
         main__.style.opacity='9%';
         
         console.log('am called')
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
         const title=document.getElementById('edit_blog_title').value                      
         const categorly=document.getElementById('edit_blog_categorly').value        
         const content= document.getElementById('blog_content_edit').value
         const photo=document.getElementById('blog_photo')
         photo.value=null
         const blog_post_data={title:title, categorly:categorly, content:content}
        
         const response=await axios.patch(`https://my-bland-backend.onrender.com/api/v1/admin/blog/${grandparent_id_blog}`, blog_post_data)

         console.log(response)
         const edit_blog_box=document.getElementById('edit_blog_container')
         edit_blog_box.style.display= 'none';  
         
         const main__=document.getElementById('main__')
         main__.style.opacity='100%';

         window.location.reload();
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

//post blog in database--------------------------------------------------//
var image_url='the image'

async function postblog()
{ 
   try{
      // var htmlContent = quill.root.innerHTML;
      var content = JSON.stringify(quill_blog_create.getContents());
      const create_blog_box=document.getElementById('create_blog_container')
      var blog_title=document.getElementById('blog_title')
      var blog_categorly=document.getElementById('blog_categorly')
      var blog_photo=document.getElementById('blog_photo')
      const blog_post={title:blog_title.value, categorly:blog_categorly.value, photo:image_url, content:content}
      const response=await axios.post('https://my-bland-backend.onrender.com/api/v1/admin/blog',blog_post)
      
      https://my-bland-backend.onrender.com

   concelingfunc()

   //   reload the window----
     window.location.reload();
   }
   catch(error)
   {
       console.log(error)
   }
}

// edit OR update Blog-----------------------------------------------------//




//------------------------contact Message----------------------------------//
//-------------------------------------------------------------------------//

async function get_list_of_message()
{
   try{
    const {data:{contact:list_of_message}}=await axios.get('https://my-bland-backend.onrender.com/api/v1/admin/contact')
    const table_message= document.getElementById('table_message')
    for(let i=0; i<list_of_message.length; i++)
    {
      let message_=document.createElement('tr')
      
      message_.innerHTML=
      `
      <td class="table_data">${list_of_message[i].username}</td>
      <td class="table_data">${list_of_message[i].email}</td>
      <td class="table_data">------</td>
      <td class="table_data"> <button class="icon_" onclick="read_message(this)"><i class="ri-mail-unread-line read_"></i></button></td>
      <td class="table_data"><button class="icon_" onclick="delete_message(this)"><i class="ri-delete-bin-6-fill delete_c"></i></button></td>
      `
      message_.classList.add('table_row')
      message_.setAttribute("id", list_of_message[i]._id)
      table_message.append(message_)
    }
    console.log(list_of_message, 'finshed message')
   }
   catch(error)
   {
      console.log(error)
   }
}
//delete massege-----------------------

async function delete_message(button) {
   try{

            var parentElement = button.parentNode;
            
            var grandparent= parentElement.parentNode
            var grandparent_id = grandparent.id;
            const {data:{contact:deleted_contact}}= await axios.delete(`https://my-bland-backend.onrender.com/api/v1/admin/contact/${grandparent_id}`)
            console.log(deleted_contact)

            // reload window
            window.location.reload();
   }

   catch(error){
       console.log(error)
   }
   
}

// read message----------------

var grandparent_id_message;

async function read_message(button)
{
   try{

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
      console.log('am deleteding') 
      const response= await axios.delete(`https://my-bland-backend.onrender.com/api/v1/admin/contact/${grandparent_id_message}`)
         
         console.log(response)

         cancel_message_viewing()

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
