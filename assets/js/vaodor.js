const voar = document.getElementById("voar");

const typeColors = {
    flying: "#a0c0e4",
};

// BUSCA POKÉMON
async function fetchAndCreateCard(pokemon) {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        if (!res.ok) throw new Error("Erro ao buscar Pokémon");
        
        const data = await res.json();
        createCardHTML(data);

    } catch (err) {
        console.error(err);
    }
}

// CRIA CARD
function createCardHTML(data) {
    const name = data.name;
    const id = data.id.toString().padStart(3, "0");
    const imgUrl =
        data.sprites.other["official-artwork"].front_default ||
        data.sprites.front_default;

    const height = (data.height / 10).toFixed(1);
    const weight = (data.weight / 10).toFixed(1);

    const abilities = data.abilities
        .map(a => a.ability.name)
        .slice(0, 2)
        .join(", ");

    const stats = {};
    data.stats.forEach(s => stats[s.stat.name] = s.base_stat);

    const atk = stats.attack || 0;
    const def = stats.defense || 0;

    const mainType = data.types[0].type.name;
    const color = typeColors[mainType] || "#b5cdf5ff";

    // TIPOS EM HTML
    const typesHtml = data.types
        .map(t => {
            const tName = t.type.name;
            const tColor = typeColors[tName] || "#83c5f4ff";
            return `
                <span class="type-badge" style="background-color:${tColor}">
                    ${tName}
                </span>
            `;
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
                        <div class="progress-fill" style="width:${Math.min(atk/2,100)}%; background:${color};"></div>
                    </div>
                </div>

                <div class="stat-line">
                    <span class="stat-label">DEF</span>
                    <span class="stat-value">${def}</span>
                    <div class="progress-bg">
                        <div class="progress-fill" style="width:${Math.min(def/2,100)}%; background:${color};"></div>
                    </div>
                </div>
            </div>
        </div>
    `;

    voar.prepend(card);
}

// INICIALIZAÇÃO
(async function init() {
    const list = [
        "butterfree", "pidgeot", "zubat", "farfetchd", "dodrio", "articuno",
        "fearow", "golbat", "aerodactyl", "hoothoot", "togetic", "lugia"
    ];

    for (const p of list) {
        await fetchAndCreateCard(p);
    }
})();