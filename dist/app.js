"use strict";
const container = document.getElementById("app");
const buttons = document.getElementById("buttons").children;
let start = 1;
let end = 152;
const fetchData = async () => {
    for (let i = start; i < end; i++) {
        await getPokemon(i);
    }
};
const getPokemon = async (id) => {
    const data = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokemon = await data.json();
    const pokemonTypes = await pokemon.types
        .map((poke) => poke.type.name)
        .join(", ");
    let pokemonInfo = {
        id: pokemon.id,
        name: pokemon.name,
        image: `${pokemon.sprites.front_default}`,
        type: pokemonTypes,
    };
    displayPokemon(pokemonInfo);
};
const displayPokemon = (pokemon) => {
    let output = `
        <div class="card">
            <span class="card--id">#${pokemon.id}</span>
            <img class="card--image" src=${pokemon.image} alt=${pokemon.name} />
            <h1 class="card--name">${pokemon.name}</h1>
            <span class="card--details">${pokemon.type}</span>
        </div>
    `;
    container.innerHTML += output;
};
[...buttons].forEach((button) => button.addEventListener("click", () => {
    container.innerHTML = "";
    start = +button.getAttribute("data-start");
    end = +button.getAttribute("data-end");
    fetchData();
}));
fetchData();
