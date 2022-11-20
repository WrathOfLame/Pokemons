let unnombered = document.getElementById("select").value
let select = Number(unnombered)
let select2 = document.getElementById('select')
let empty = document.getElementById("empty")
let list = document.getElementById("list")
let bottom= document.getElementById("bottom")
let pre = document.getElementById("back")
let forward = document.getElementById("forward")
let first = document.getElementById("first")
let second = document.getElementById("secont")
let third = document.getElementById("third")
let fourth = document.getElementById("fourth")
let fifth = document.getElementById("fifth")
let offsetValue = Number(0)
let url = `https://pokeapi.co/api/v2/pokemon?limit=5&offset=0`
let but = document.getElementById("but")
let backwards = document.getElementById("backwards")
but.addEventListener("click", makeList)

function makeList(){
    list.innerHTML = ''
    let request = new XMLHttpRequest()
    request.open("GET", url)
    request.responseType = "json"
    request.send()
    request.onload = ()=>{
        if(request.status<400){
            let responseMassive = request.response.results
            responseMassive.forEach((pokemon)=>{
        console.log(pokemon)
        list.innerHTML += `
        <li class = "li" onclick="setNotations('${pokemon.url}')">${pokemon.name}</li>
        `
            })
        }
    }
}
pre.addEventListener("click", previous)
forward.addEventListener("click", next)

function next(){
    offsetValue += Number(document.getElementById('select'))
    list.innerHTML = ''
    url = `https://pokeapi.co/api/v2/pokemon?limit=${document.getElementById("select")}&offset=${offsetValue}`
    makeList()
}

function previous(){
    offsetValue -= Number(document.getElementById('select'))
    list.innerHTML = ''
    url = `https://pokeapi.co/api/v2/pokemon?limit=${document.getElementById('select')}&offset=${offsetValue}`
    makeList()
}
document.getElementById("select").addEventListener("change", ()=>{
    list.innerHTML = ""
    select = Number(document.getElementById('select').val)
    url = `https://pokeapi.co/api/v2/pokemon?limit=${document.getElementById('select')}&offset=${offsetValue}`
    makeList()
})
function setNotations(pokeUrl){
    let request2 = new XMLHttpRequest()
    request2.open("GET", pokeUrl)
    request2.responseType = "json"
    request2.send()
    request2.onload = ()=>{    
    document.getElementById("container1").style.display = "none"
    document.getElementById("header").style.display = "none"
    document.getElementById("container2").style.display = "flex"
    document.getElementById("p1").innerHTML = `Покемон ${request2.response.id}`
    document.getElementById("p2").innerHTML = `${request2.response.name}`
    document.getElementById("pokemonImg").setAttribute("src", request2.response.sprites.front_default)
}

}
backwards.addEventListener("click", function (){
    document.getElementById("container1").style.display = "block"
    document.getElementById("header").style.display = "block"
    document.getElementById("container2").style.display = "none"
    list.innerHTML = ''
    makeList()

})

select2.value.addEventListener("change", ()=>{
    list.innerHTML = ''
    url = `https://pokeapi.co/api/v2/pokemon?limit=${Number(document.getElementById("select").value)}&offset=${offsetValue}`
    makeList()
})