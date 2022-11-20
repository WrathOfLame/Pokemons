const but = document.getElementById("but")
const url = 'https://pokeapi.co/api/v2/pokemon/'
const  notes = document.getElementById("notes")
const text = document.getElementById("text")
but.addEventListener("click", function(event){
let pokemon = text.value
text.value = ""
let request = new XMLHttpRequest()
request.open("GET", `${url}${pokemon}`)
request.responseType = "json"
request.send()
request.onload = ()=> {
    if(request.status < 400){
        drawPokemon(request.response)
    }
    else{
        notes.innerHTML = `
        <div id = "pokemon">
        <h1 style = "...">Something went wrong( Try again</h1>
        </div>
        `
    }
}
})
function drawPokemon(pokemon){
    console.log(pokemon)
    if(document.getElementById("pokemon")){
        document.getElementById("pokemon").remove()
    }
    let div = document.createElement("div")
    div.id = "pokemon"
    div.innerHTML = `
    <h3>pokemon ${pokemon.id}</h3>
    <h2>${pokemon.name[0].toUpperCase() + pokemon.name.substring(1)}</h2>
    <img src = "${pokemon.sprites.front_default}" alt = "" height = "200px" width = "200px">
    `
    notes.append(div)
}
