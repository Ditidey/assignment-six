// taking all information from api
let dates = [];
// console.log(dates);

const fetchAiAll = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showAiUniverse(data.data.tools, dataLimit)
   
        });
}
 
const showAiUniverse = (tools, dataLimit) => {
    // console.log(tools);
     
    const divContainer = document.getElementById('container-div');
    divContainer.innerHTML = "";

    // showing 6 cards
    if(dataLimit){
        tools = tools.slice(0, 6);
    }
    tools.forEach(tool => {
        dates.push(tool);
        // console.log(tool);
        const divCard = document.createElement('div');
        divCard.classList.add('col')
        divCard.innerHTML = `
          <div class="card h-100 p-3">
           <img src="${tool.image}" class="card-img-top" alt="...">
              <div class="card-body">
                 <h5 class="card-title">Features</h5>
                   <ol><li>${tool.features[0]}</li>
                   <li>${tool.features[1]}</li>
                   <li>${tool.features[2]}</li></ol>
                   <hr>
                 
              </div>
              <div class="d-flex justify-content-between ps-2">
                 <div>
                 <h5 class="card-title">${tool.name}</h5>
                 <p><i class="fa-solid fa-calendar-days"></i> ${tool.published_in}</p>
                 </div>
                <div>
                <button data-bs-toggle="modal" data-bs-target="#modalId" onclick = "fetchModal('${tool.id}')"><i class="fa-solid fa-arrow-right"></i></i></button>
                </div>
              </div>
               
          </div>
          `;
          divContainer.appendChild(divCard)

          spinnerLoading(false);
    })
     
}

// showing modal 
const fetchModal = async(id) =>{
      const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`;
      const res = await fetch(url);
      const data = await res.json();
      displayModal(data.data);
     
}
const displayModal = details =>{
    // console.log(details);
    document.getElementById('modal-title').innerText = details.tool_name;
    if(details.accuracy.score * 100 > 0)
     {
        document.getElementById('h-accuracy').innerText = details.accuracy.score * 100;
        document.getElementById('div-accu').classList.remove('d-none')
     }
     else
     {
        document.getElementById('div-accu').classList.add('d-none')
     }
     
     
    const {integrations, features} = details;
    // console.log(integrations);
  
    const modalBody = document.getElementById('body-modal');
    modalBody.innerHTML = `    
    <!-- first div -->
<div class="bg-danger-subtle bg-opacity-50 p-2 mb-4" style="width-200">
    <div>
        <h4>${details.description}</h4>
    </div>
    <div class="d-flex justify-content-between pe-2">
        <div class=" bg-light ms-2 p-2 rounded ">
            <p class="text-success-emphasis">${details.pricing !== null ? details.pricing[0].price : "Free of cost/"}, ${details.pricing !== null ? details.pricing[0].plan : 'Basic'}</p>  
        </div>
        <div class=" bg-light ms-2 p-2 rounded ">
            <p class="text-primary-emphasis">${details.pricing !== null ? details.pricing[1].price  : "Free of cost/"}, ${details.pricing !== null ? details.pricing[1].plan : 'Pro' }</p>
        </div>
        <div class=" bg-light ms-2 me-2 p-2 rounded ">
            <p class="text-warning-emphasis">${details.pricing !== null ? details.pricing[2].price  : "Free of cost/"}, ${details.pricing !== null ? details.pricing[2].plan : 'Enterprise'} </p>
        </div>
    </div>
    <div class="d-flex justify-content-between pe-2 mt-3">
        <div class=" bg-danger-subtle bg-opacity-75 ms-2 p-2 rounded w-50">
           <h4>Features</h4>
            <div id="fdiv">
            </div>
        </div>
        <div class=" bg-danger-subtle bg-opacity-75 p-2 rounded w-50">
              <h4>Integrations</h4>
              
                <div id="sList">
                </div>
        </div>
    </div>
</div>
</div>
    <!-- second div -->
<div class="ms-4" style="width-200">
    <div class="pt-3 text-center">
       <img src="${details.image_link[0]}" alt="" height=200, width=200 class="img-fluid">
    </div>
    <div class="text-center">
          <h4>${details.input_output_examples !== null ? details.input_output_examples[0].input : 'Hi, How can I help you?'}</h4>
          <h6>${details.input_output_examples !== null ? details.input_output_examples[0].output : 'No, No, Take a break, it is the 12 card! So dangerous'}</h6>
         
    </div>
</div>
    `; 
     const lidiv = document.getElementById('sList');
     if(integrations === null)
     {
        // console.log('null div');
        let liId = document.createElement('h6');
        liId.innerText = 'Not found data';
        lidiv.appendChild(liId);
     }
     else{
        for(let i=0; i<integrations.length; i++) {
            // console.log(integrations[i]);
            let liId = document.createElement('li');
            liId.innerText = integrations[i];
            lidiv.appendChild(liId);
        //   console.log("liId", liId);
        }
     }
     
    //  for features
     const fdiv = document.getElementById('fdiv');
     console.log(features.length)
        for(let i in features) {
            console.log(features[i]);
            let liId = document.createElement('li');
             liId.innerText = features[i].feature_name;
          fdiv.appendChild(liId);
          console.log("liId", liId);
        }
 
   
}

 
// to show all info by button click
const showAllButton = (isTrue) =>
{
 
    fetchAiAll();
    
    spinnerLoading(true);
}
// showing spinner
const spinnerLoading = isLoading => {
    const loader = document.getElementById('spinner-div');
    if(isLoading)
    {
       loader.classList.remove('d-none');
    }
    else
    {
        loader.classList.add('d-none')
    }
}
// sorting by date
const sortingDate = () =>
{
         publishDate = dates.sort((x, y) => {
            x = new Date(x.published_in)
            y = new Date(y.published_in)
            return x - y;
         })

         dates.forEach((d) => {
            // console.log(d);
         })
    const divContainer = document.getElementById('container-div');
    divContainer.innerHTML = "";
  
       dates.forEach(tool => {
        // dates.push(tool);
        // console.log(tool);
        const divCard = document.createElement('div');
        divCard.classList.add('col')
        divCard.innerHTML = `
          <div class="card h-100 p-3">
           <img src="${tool.image}" class="card-img-top" alt="...">
              <div class="card-body">
                 <h5 class="card-title">Features</h5>
                   <ol><li>${tool.features[0]}</li>
                   <li>${tool.features[1]}</li>
                   <li>${tool.features[2]}</li></ol>
                   <hr>
                 
              </div>
              <div class="d-flex justify-content-between ps-2">
                 <div>
                 <h5 class="card-title">${tool.name}</h5>
                 <p><i class="fa-solid fa-calendar-days"></i> ${tool.published_in}</p>
                 </div>
                <div>
                <button data-bs-toggle="modal" data-bs-target="#modalId" onclick = "fetchModal('${tool.id}')"><i class="fa-solid fa-arrow-right"></i></i></button>
                </div>
              </div>
               
          </div>
          `;
          divContainer.appendChild(divCard)

          spinnerLoading(false);
    })
}
 