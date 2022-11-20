const container = document.getElementById("container")
const form = document.querySelector("form")
const url = 'https://pokeapi.co/api/v2/pokemon?limit=127&offset=0'
let allPokemons = []
let allPromises = []
const request = new XMLHttpRequest()
request.open("GET", url)
request.responseType = "json"
request.send()
request.onload = ()=>{
    let answer = request.response.results;
    for(let pokemon of answer){
        const promise = new Promise((resolve, reject)=>{
            const request2 = new XMLHttpRequest()
            request2.open("GET", pokemon.url)
            request2.send()
            request2.responseType = "json"
            request2.onload = function(){
                if(request2.status === 200){
                    resolve(JSON.parse(request2.response));
                }
                else{
                    form.innerHTML = "Something went wrong"
                }
            }
        })
        promise.then((pokemon)=>{
            allPokemons.push(pokemon)
        })
        allPromises.push(promise)
    }
    Promise.all(allPromises).then(makeList)
}
form.addEventListener("change", makeList)
function makeList(event){
    container.innerHTML += `
    <div id = "pokemonDiv">
    <p> Pokemon Nom. ${pokemon.id}</p>
    <h3>${pokemon.name}</h3>
    <img src = "${pokemon.sprites.front_default}" alt = "Issue with image">
    <div id = "stats">
                <p class="hp stat">&#10084;${pokemon.stats[0].base_stat}</p>
                <p class="attack stat">&#9876;${pokemon.stats[1].base_stat}</p>
                <p class="defense stat">&#128737;${pokemon.stats[2].base_stat}</p>
                <p class="speed stat">&#128007;${pokemon.stats[5].base_stat}</p>
        </div>
    </div>
    `
}
form.addEventListener("change", (event)=>{
    let value = event.target.value
    switch(value){
        case "id":
            object = "id"
            break;
            case "hp":
            object = "hp"
            break;
            case "defence":
            object = "defence"
            break;
            case "attack":
            object = "attack"
            break;
            case "speed":
            object = "speed"
            break;
            case "upToDown":
            object = "upToDown"
            break;
            case "downToUp":
            object = "downToUp"
            break;
    }
    sort()
})
function sort(){
    let order = true;
    container.innerHTML = null
    switch(object){
        case "id":
            allPokemons = allPokemons.sort(function (first, second) {
                if (first.id > second.id) {
                    return order;
                }
                if (first.id < second.id) {
                    return -order;
                }
            });
            break;
        case "hp":
            allPokemons = allPokemons.sort(function (first, second) {
                if (first.stats[0].base_stat > second.stats[0].base_stat) {
                    return order;
                }
                if (first.stats[0].base_stat < second.stats[0].base_stat) {
                    return -order;
                }
            });
            break;
        case "attack":
            allPokemons = allPokemons.sort(function (first, second) {
                if (first.stats[1].base_stat > second.stats[1].base_stat) {
                    return order;
                }
                if (first.stats[1].base_stat < second.stats[1].base_stat) {
                    return -order;
                }
            });
            break;
        case "defense":
            allPokemons = allPokemons.sort(function (first, second) {
                if (first.stats[2].base_stat > second.stats[2].base_stat) {
                    return order;
                }
                if (first.stats[2].base_stat < second.stats[2].base_stat) {
                    return -order;
                }
            });
            break;
        case "speed":
            allPokemons = allPokemons.sort(function (first, second) {
                if (first.stats[5].base_stat > second.stats[5].base_stat) {
                    return order;
                }
                if (first.stats[5].base_stat < second.stats[5].base_stat) {
                    return -order;
                }
            });
            break;
    
    }
}
if (order != true){
    allPokemons.reverse()
}
allPokemons.forEach(drawPokemon(pokemon))