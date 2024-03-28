// -----------------user-------------------//
//-----------------------------------------//


window.addEventListener('load', get_list_of_user)
window.addEventListener('load',get_list_of_blog)

async function get_list_of_user()
{
   try{

    const {data:{user:list_of_user}}=await axios.get('http://localhost:3000/api/v1/admin/user')

    const table_user= document.getElementById('table_user')
    for(let i=0; i<list_of_user.length; i++)
    {
      let user_=document.createElement('tr')

      user_.innerHTML=
      `
      <td class="table_data">${list_of_user[i].username}</td>
      <td class="table_data">${list_of_user[i].email}</td>
      <td class="table_data">${list_of_user[i].password}</td>
      <td class="table_data"><i class="ri-delete-bin-6-fill"></i></td>
      <td class="table_data"><i class="ri-pencil-fill"></i></td>
      `
      user_.classList.add('table_row')
      table_user.append(user_)
    }
    console.log(list_of_user)
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
    const {data:{blog:list_of_blog}}=await axios.get('http://localhost:3000/api/v1/admin/blog')
    const table_blog= document.getElementById('table_blog')
    for(let i=0; i<list_of_blog.length; i++)
    {
      let blog_=document.createElement('tr')
      
      blog_.innerHTML=
      `
      <td class="table_data" id="blog_first_low">${list_of_blog[i].title}</td>
      <td class="table_data">${list_of_blog[i].categorly}</td>
      <td class="table_data">-----</td>
      <td class="table_data"><i class="ri-delete-bin-6-fill"></i></td>
      <td class="table_data"><i class="ri-pencil-fill"></i></td
      `
      blog_.classList.add('table_row')
      table_blog.append(blog_)
    }
    console.log(list_of_blog, 'finshed blog')
   }
   catch(error)
   {
      console.log(error)
   }
}


//------------------------contact Message----------------------------------//
//-------------------------------------------------------------------------//

async function get_list_of_blog()
{
   try{
    const {data:{contact:list_of_message}}=await axios.get('http://localhost:3000/api/v1/admin/contact')
    const table_message= document.getElementById('table_message')
    for(let i=0; i<list_of_message.length; i++)
    {
      let message_=document.createElement('tr')
      
      message_.innerHTML=
      `
      <td class="table_data">${list_of_message[i].username}</td>
      <td class="table_data">${list_of_message[i].email}</td>
      <td class="table_data">------</td>
      <td class="table_data"> <i class="ri-mail-unread-line read_"></i></td>
      <td class="table_data"><i class="ri-delete-bin-6-fill delete_c"></i></td>
      `
      message_.classList.add('table_row')
      table_message.append(message_)
    }
    console.log(list_of_message, 'finshed message')
   }
   catch(error)
   {
      console.log(error)
   }
}