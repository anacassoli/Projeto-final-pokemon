const voar = document.getElementById("voar");

const typeColors = {
  flying: "#a0c0e4",
};

// BUSCA POKÉMON
async function fetchAndCreateCard(pokemon) {
  try {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (!response.ok) {
      throw new Error("Erro ao buscar Pokémon");
    }

    const data = await response.json();
    createCardHTML(data);

  } catch (error) {
    console.error("Erro ", error);
  }
}

// CRIA CARD
function createCardHTML(data) {
  const name = data.name;
  const id = data.id.toString().padStart(3, "0");
  const imgUrl =
    data.sprites.other["official-artwork"].front_default ||
    data.sprites.front_default;

  const height = data.height / 10; 
  const weight = data.weight / 10;

  const abilities = data.abilities
    .map((a) => a.ability.name)
    .slice(0, 2)
    .join(", ");

  const stats = {};
  data.stats.forEach((s) => (stats[s.stat.name] = s.base_stat));

  const atk = stats["attack"] || 0;
  const def = stats["defense"] || 0;

  const mainType = data.types[0].type.name;
  const color = typeColors[mainType] || "#a0c0e4";

  // TIPOS EM HTML
  const typesHtml = data.types
    .map((t) => {
      const tName = t.type.name;
      const tColor = typeColors[tName] || "#a0c0e4";
      return `<span class="type-badge" style="background-color: ${tColor}">${tName}</span>`;
    })
    .join("");

  // CARD
  const card = document.createElement("div");
  card.classList.add("pokemon-card");

  card.innerHTML = `
    <div class="card-header" style="background: linear-gradient(to bottom, ${color}, white);">
      <img src="${imgUrl}" alt="${name}" class="poke-img">
    </div>

    <div class="card-body">
      <span class="poke-id">#${id}</span>
      <h2 class="poke-name">${name}</h2>

      <div class="types">${typesHtml}</div>

      <div class="info-row">
        <div class="info-box">
          <h4>Altura</h4>
          <p>${height} m</p>
        </div>
        <div class="info-box">
          <h4>Peso</h4>
          <p>${weight} kg</p>
        </div>
      </div>

      <div class="abilities">
        <strong>Habilidades:</strong> ${abilities}
      </div>

      <div class="stats-wrapper">
        <div class="stat-line">
          <span class="stat-label">ATK</span>
          <span class="stat-value">${atk}</span>
          <div class="progress-bg">
            <div class="progress-fill" style="width: ${Math.min(atk/2,100)}%; background-color: ${color}"></div>
          </div>
        </div>

        <div class="stat-line">
          <span class="stat-label">DEF</span>
          <span class="stat-value">${def}</span>
          <div class="progress-bg">
            <div class="progress-fill" style="width: ${Math.min(def/2,100)}%; background-color: ${color}"></div>
          </div>
        </div>
      </div>
    </div>
  `;

  voar.prepend(card);
}

// INICIALIZAÇÃO
(async function init() { 
  await fetchAndCreateCard("butterfree"); 
  await fetchAndCreateCard("pidgeot"); 
  await fetchAndCreateCard("zubat"); 
  await fetchAndCreateCard("farfetchd"); 
  await fetchAndCreateCard("dodrio"); 
  await fetchAndCreateCard("articuno"); 
  await fetchAndCreateCard("fearow"); 
  await fetchAndCreateCard("golbat"); 
  await fetchAndCreateCard("aerodactyl"); 
  await fetchAndCreateCard("hoothoot"); 
  await fetchAndCreateCard("togetic"); 
  await fetchAndCreateCard("lugia"); 
})();
