
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
})
console.log('helllo')