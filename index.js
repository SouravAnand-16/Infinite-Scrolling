let container = document.getElementById("container") ;
let flag = true ;
fetchData();

async function fetchData(page=1){
    try{
        let res = await fetch(`https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=20`);
        let data = await res.json();
       console.log(data);
       appendData(data);
    }
    catch(error){
        console.log(error);
    }
}
function appendData(data){
    data.forEach((item)=>{
        let card = createCard(item);
        container.append(card);
        flag = true ;
    })
  
}
function createCard(item){
    let div = document.createElement("div");
    div.classList.add("card");

    let image = document.createElement("img");
    image.src = item.url ;
    image.alt = item.title ;

    let title = document.createElement("h2");
    title.textContent = item.title ;

    div.append(image,title);
    return div ;
}
let page = 1 ;
window.addEventListener("scroll",()=>{
    let clientHeight = document.documentElement.clientHeight ; 
    let scrollHeight = document.documentElement.scrollHeight ;
    let scrollTop = document.documentElement.scrollTop ;
    console.log(clientHeight,scrollHeight,scrollTop);
    if(scrollHeight-clientHeight <= Math.ceil(scrollTop)&&flag){
        page++;
        fetchData(page);
         flag = false ;
    }
})