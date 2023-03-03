// taking all information from api
let dates = [];
console.log(dates);

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
    console.log(details);
    document.getElementById('modal-title').innerText = details.tool_name;
    document.getElementById('h-accuracy').innerText = details.accuracy.score * 100;
     let len = details.integrations.length;
     console.log(len);
    const modalBody = document.getElementById('body-modal');
    modalBody.innerHTML = `
    <div class="row g-2">
    <!-- first div -->
    <div class="col-6 bg-danger-subtle bg-opacity-50 p-2">
        <div>
            <h4>${details.description}</h4>
        </div>
        <div class="d-flex justify-content-between pe-2">
            <div class="bg-light ms-2 p-2 rounded w-50">
                <p class="text-success-emphasis">${details.pricing[0] !== '0' ? details.pricing[0].price : "Free of cost/"}</p>
                <p class="text-success-emphasis"${details.pricing[0] !== '0' ?   details.pricing[0].plan  : "Basic"}</p>
                
            </div>
            <div class="bg-light ms-2 p-2 rounded w-50">
                <p class="text-primary-emphasis">${details.pricing[1] !== '0' ? details.pricing[1].price  : "Free of cost"}</p>
                <p class="text-primary-emphasis">${details.pricing[1]  !== '0' ? details.pricing[1].plan  : "/Pro"} </p>
            </div>
            <div class="bg-light ms-2 me-2 p-2 rounded w-50">
                <p class="text-warning-emphasis">${details.pricing[2] !== '0' ? details.pricing[2].price  : "Free of cost"} </p>
                <p class="text-warning-emphasis">${details.pricing[2] !== '0' ?   details.pricing[2].plan  : "/Eenterprice"}</p>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <div>
            <h4>Features</h4>
            <ul>
            <li>${details.features['1'].feature_name}</li>
            <li>${details.features['2'].feature_name}</li>
            <li>${details.features['3'].feature_name}</li>
            <li>${details.features['4'] ? details.features['4'].feature_name : ''}</li>
            </ul>
        
            <div>
            <h4>Integrations</h4>
                
                    <ul>
                    <li>${details.integrations[0]}</li>
                    <li>${details.integrations[1]}</li>
                    <li>${details.integrations[2]}</li>
                    <li>${details.integrations[3]}</li>
                    </ul>
                     
                  
                  
            </div>
        </div>
    </div>
   
    <!-- second div -->
    <div class="col-6">
       <div class="pt-3">
       <img src="${details.image_link[0]}" alt="" height = 120, width-400>
       </div>
       <div class="text-center">
          <h4>${details.input_output_examples[0].input}</h4>
          <h6>${details.input_output_examples[0].output}</h6>
    </div>
    </div>
    `;
   
}

// to show all info by button click
const showAllButton = () =>
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
            console.log(d);
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
// const showList = feature =>
// {
//   for(const feat of feature)
//   {
//     <ul>
//         <ol>feat</ol>
//     </ul>
//   }
// }