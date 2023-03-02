// taking all information from api
const fetchAiAll = () =>{
    const url = `https://openapi.programming-hero.com/api/ai/tools`;
    fetch(url)
    .then(res => res.json())
    .then(data => showAiUniverse(data.data));
}
const showAiUniverse = tools =>{
    console.log(tools);
    const divContainer = document.getElementById('container-div');
}