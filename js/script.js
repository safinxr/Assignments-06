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
    const mainDiv =document.getElementById("mainDiv");
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
                    <img class="p-3 w-75 h-auto mx-auto" src="${phone.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">Brand: ${phone.brand}</p>
                    </div>
                    <div class="card-footer border-top-0 bg-white">
                      <button  onclick="detailsButton('${phone.slug}')" class="btn btn-primary">Details</button>
                    </div>
                  </div>     
        `
        mainDiv.appendChild(div);
    }
    }
}

const detailsButton =(details)=>{
    fetch(`https://openapi.programming-hero.com/api/phone/${details}`)
    .then(res => res.json())
    .then(data =>phoneDetails(data.data))
}

const phoneDetails =(data) =>{
    const leftArea =document.getElementById("left-area");
    const rightArea =document.getElementById("right-area");
    let sensors =""
    data.mainFeatures.sensors.forEach(element => {
        sensors=element+','+sensors;
    });
    leftArea.innerHTML=`
    <img class="w-75 h-auto ms-5" src="${data.image}"> 
    `
    rightArea.innerHTML=`
    <p><span class="span-width">Name</span> : ${data.name}</p>
    <p><span class="span-width">ReleaseDate</span> : ${data.releaseDate}</p>
    <p><span class="span-width">Storage</span> : ${data.mainFeatures.storage}</p>
    <p><span class="span-width">DisplaySize</span> : ${data.mainFeatures.displaySize}</p>
    <p><span class="span-width">ChipSet</span> : ${data.mainFeatures.chipSet}</p>
    <p><span class="span-width">Memory</span> : ${data.mainFeatures.memory}</p>
    <p><span class="span-width">Sensors</span> : ${sensors}</p>
    
    

    `
    console.log(data)

}   