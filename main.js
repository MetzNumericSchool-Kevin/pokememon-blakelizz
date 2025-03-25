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
  const halfListePokemon = listePokemon.slice(0, 6); //A MODIFIER AVEC 6
  halfListePokemon.sort(() => Math.random() - 0.5);
  console.log(halfListePokemon);

  //Multiplie le tableau divisé
  const duplicateListePokemon = [...halfListePokemon, ...halfListePokemon];
  console.log(duplicateListePokemon);

  return duplicateListePokemon;
}

const duplicateListePokemon = tabPokemon(listePokemon);

const grille = document.querySelector("#grille_de_jeu");
const boxes = document.querySelectorAll(".box");
const bush = document.querySelectorAll(".bush");
const pokemonCaptures = document.querySelector(".liste_pokemons_captures");

let pokemonCLick = [];

if (bush) {

  bush.forEach((bush, index) => {
    bush.addEventListener("click", () => {
      const pokemonName = duplicateListePokemon[index].name;
      const pokemonSprite = document.createElement("img");
      pokemonSprite.src = duplicateListePokemon[index].sprite;
      bush.parentElement.appendChild(pokemonSprite); //ajout du pokemon

      pokemonSprite.classList.add('pokemon');

      bush.style.display = "none"; //cache le bush

      pokemonCLick.push({ name: pokemonName, index: index, sprite: pokemonSprite });
      console.log(pokemonCLick);

      if (pokemonCLick.length == 2) {
        const [pokemonA, pokemonB] = pokemonCLick;

        if (pokemonA.name == pokemonB.name) {

          setTimeout(() => {
              document.querySelectorAll('img.pokemon').forEach(img => {
              const pokeballSprite = document.createElement("img");
              pokeballSprite.classList.add('pokeball');
              pokeballSprite.src = "assets/pokeball.png";
              img.parentElement.appendChild(pokeballSprite);
            });
          }, 500);

        } else { 
          setTimeout(() => {
            //ré affichage du bush pokemon A et B
            document.querySelectorAll('.bush')[pokemonA.index].style.display = "block"; 
            document.querySelectorAll('.bush')[pokemonB.index].style.display = "block"; 
            // Supp le pokemonSprite
            pokemonA.sprite.remove();
            pokemonB.sprite.remove();
          }, 1000);
        }
        //ré initialisation du tableau
        pokemonCLick = [];
      }
    });
  });
}