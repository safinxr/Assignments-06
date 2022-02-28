// Global variable🧲🧲🧲🧲🧲🧲🧲🧲🧲
const mainDiv =document.getElementById("mainDiv");

// search button 🔍🔍🔍🔍🔍🔍 
document.getElementById("search-button").addEventListener('click', function(){
    const input=document.getElementById("input");
    input.style.border ="1px solid lightgray"
    if(input.value ===""){
        input.style.border ="1px solid red"
    }
    else{
        fetch(`https://openapi.programming-hero.com/api/phones?search=${input.value}`)
        .then(res => res.json())
        .then(data =>phoneSearch(data))
    }
})

const phoneSearch = (data) =>{
    if(data.status ===false){
        mainDiv.innerHTML=`<h3 class="mx-auto text-center text-muted">No result found <i class="fa-solid fa-face-sad-tear"></i></h3>`
    }
    else{
        const phoneList =data.data.slice(0,19);
    mainDiv.innerHTML="";
    for (const phone of phoneList){
        const div =document.createElement("div");
        div.className="col"
        div.innerHTML=`
                  <div class="card h-100 shadow-sm">
                    <img class="p-3" src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">Brand: ${phone.brand}</p>
                    </div>
                    <div class="card-footer border-top-0 bg-white">
                      <small class="">Slug: ${phone.slug}</small>
                    </div>
                  </div>     
        `
        mainDiv.appendChild(div);
    }
    }
}