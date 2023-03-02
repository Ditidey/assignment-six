// taking all information from api
const fetchAiAll = (dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
        .then(res => res.json())
        .then(data => showAiUniverse(data.data.tools, dataLimit));
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
    const modalBody = document.getElementById('body-modal');
    modalBody.innerHTML = `
    <div class="d-flex justify-content-between">
    <!-- first div -->
    <div class="bg-danger-subtle bg-opacity-50 p-2">
        <div>
            <h4>${details.description}</h4>
        </div>
        <div class="d-flex justify-content-around">
            <div class="bg-light">
                <p class="text-success-emphasis">${details.pricing[0] ? (details.pricing[0].price, details.pricing[0].plan)  : "Free of cost/basic"}</p>
                
            </div>
            <div class="bg-light">
                <p class="text-primary-emphasis"></p>
            </div>
            <div class="bg-light">
                <p class="text-warning-emphasis"></p>
            </div>
        </div>
        <div class="d-flex justify-content-between">
            <div></div>
            <div></div>
        </div>
    </div>
    <!-- second div -->
    <div>

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
// const showList = feature =>
// {
//   for(const feat of feature)
//   {
//     <ul>
//         <ol>feat</ol>
//     </ul>
//   }
// }