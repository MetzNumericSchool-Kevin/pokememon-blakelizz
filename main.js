async function Pokemon() {
  try {
    let response = await fetch("http://127.0.0.1:5500/data/pokemon.json");
    if (!response.ok) {
      throw new Error("Problème de requête !");
    }
    let listePokemon = await response.json();
    return listePokemon;

  } catch (error) {
    console.error("Erreur :", error);
  }
}

Pokemon();

let listePokemon = await Pokemon();


function tabPokemon(listePokemon) {
  //mélange le tableau
  listePokemon.sort(() => Math.random() - 0.5);
  console.log(listePokemon);

  //divise le tableau et le re mélange
  const halfListePokemon = listePokemon.slice(0, 6);
  halfListePokemon.sort(() => Math.random() - 0.5);
  console.log(halfListePokemon);

  //Multiplie le tableau divisé
  const duplicateListePokemon = [...halfListePokemon, ...halfListePokemon];
  console.log(duplicateListePokemon);
  
  return duplicateListePokemon;
}

const duplicateListePokemon = tabPokemon(listePokemon);


//---Test avec const ---
// const pairOfPokemonIds = [
//   {
//     "name": "charmander",
//     "sprite": "https://img.pokemondb.net/sprites/scarlet-violet/normal/charmander.png"
//   },
//   {
//     "name": "squirtle",
//     "sprite": "https://img.pokemondb.net/sprites/scarlet-violet/normal/squirtle.png"
//   }
// ]
// console.log(pairOfPokemonIds);


const grille = document.querySelector("#grille_de_jeu");
const boxes = document.querySelectorAll(".box");
const bush = document.querySelectorAll(".bush");

const pokemonCaptures = document.querySelector(".liste_pokemons_captures");


if (bush) {

  bush.forEach((bush, index) => {
    bush.addEventListener("click", () => {
      
      const pokemonSprite = document.createElement("img");
      // pokemonSprite.src = pairOfPokemonIds[index].sprite; 
      pokemonSprite.src = duplicateListePokemon[index].sprite;
      bush.parentElement.appendChild(pokemonSprite); //ajout du pokemon

      pokemonSprite.style.width = "100%";
      pokemonSprite.style.height = "100%";


      bush.style.display = "none"; //cache le bush
      pokemonSprite.style.display = "block";//affiche le pokemon

      if (pokemonSprite) {
        const pokemonClick = duplicateListePokemon[index].name;
        console.log(pokemonClick);
      }


    });
  });
}