const BASE_URL = "https://dogapi.dog/api/v2";

// DOM elements
const status = document.getElementById("status");
const breedsContainer = document.getElementById("breeds");
const breedDetails = document.getElementById("breedDetails");
const factContainer = document.getElementById("fact");
const groupsContainer = document.getElementById("groups");

// Buttons
document.getElementById("loadBreeds").addEventListener("click", fetchBreeds);
document.getElementById("getFact").addEventListener("click", fetchDogFact);
document.getElementById("loadGroups").addEventListener("click", fetchGroups);

// ------------------ FETCH BREEDS ------------------
async function fetchBreeds() {
  status.textContent = "Loading breeds...";
  breedsContainer.innerHTML = "";

  try {
    const response = await fetch(`${BASE_URL}/breeds`);
    if (!response.ok) throw new Error("Failed to fetch breeds");

    const data = await response.json();

    data.data.forEach(breed => {
      const div = document.createElement("div");

      div.innerHTML = `
        <h3>${breed.attributes.name}</h3>
        <p>${breed.attributes.description}</p>
        <p><strong>Hypoallergenic:</strong> ${breed.attributes.hypoallergenic}</p>
        <p><strong>Life Span:</strong> ${breed.attributes.life.min} - ${breed.attributes.life.max} years</p>
        <p><strong>Male Weight:</strong> ${breed.attributes.male_weight.min} - ${breed.attributes.male_weight.max} kg</p>
        <p><strong>Female Weight:</strong> ${breed.attributes.female_weight.min} - ${breed.attributes.female_weight.max} kg</p>
      `;

      // Click event to fetch single breed
      div.addEventListener("click", () => {
        fetchBreedById(breed.id);
      });

      breedsContainer.appendChild(div);
    });

    status.textContent = "Breeds loaded successfully!";
  } catch (error) {
    status.textContent = "Failed to load breeds. Please try again.";
  }
}

// ------------------ FETCH SINGLE BREED ------------------
async function fetchBreedById(id) {
  breedDetails.innerHTML = "Loading breed details...";

  try {
    const response = await fetch(`${BASE_URL}/breeds/${id}`);
    if (!response.ok) throw new Error("Failed to fetch breed");

    const data = await response.json();
    const breed = data.data;

    breedDetails.innerHTML = `
      <h3>${breed.attributes.name}</h3>
      <p>${breed.attributes.description}</p>
      <p><strong>Life Span:</strong> ${breed.attributes.life.min} - ${breed.attributes.life.max}</p>
      <p><strong>Weight:</strong> ${breed.attributes.male_weight.min} - ${breed.attributes.male_weight.max} kg</p>
    `;
  } catch (error) {
    breedDetails.innerHTML = "Failed to load breed details.";
  }
}

//  FETCH DOG FACT ------------------
async function fetchDogFact() {
  status.textContent = "Loading dog fact...";
  factContainer.textContent = "";

  try {
    const response = await fetch(`${BASE_URL}/facts?limit=1`);
    if (!response.ok) throw new Error("Failed to fetch fact");

    const data = await response.json();
    factContainer.textContent = data.data[0].attributes.body;

    status.textContent = "Dog fact loaded!";
  } catch (error) {
    status.textContent = "Failed to load dog facts. Please try again.";
  }
}

//  FETCH GROUPS
async function fetchGroups() {
  status.textContent = "Loading groups...";
  groupsContainer.innerHTML = "";

  try {
    const response = await fetch(`${BASE_URL}/groups`);
    if (!response.ok) throw new Error("Failed to fetch groups");

    const data = await response.json();

    data.data.forEach(group => {
      const div = document.createElement("div");

      div.innerHTML = `
        <h3>${group.attributes.name}</h3>
        <p><strong>Breed IDs:</strong> ${group.relationships.breeds?.data.map(b => b.id).join(", ") || "N/A"}</p>
      `;

      groupsContainer.appendChild(div);
    });

    status.textContent = "Groups loaded!";
  } catch (error) {
    status.textContent = "Failed to load groups.";
  }
}