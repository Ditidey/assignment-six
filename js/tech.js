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
        console.log(tool);
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
              <div class="d-flex justify-content-between">
                 <div>
                 <h5 class="card-title">${tool.name}</h5>
                 <p><i class="fa-solid fa-calendar-days"></i> ${tool.published_in}</p>
                 </div>
                <div>
                <button  onclick = "FetchModal('${tool.id}')"><i class="fa-solid fa-arrow-right"></i></i></button>
                </div>
              </div>
               
          </div>
          `;
          divContainer.appendChild(divCard)
    })
}

// to show all info by button click
const showAllButton = () =>
{
    fetchAiAll();
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