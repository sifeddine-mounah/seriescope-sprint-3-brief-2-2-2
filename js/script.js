import { getSeries } from "./serviceSerie.js";
import { createSerie } from "./serviceSerie.js";
import { deleteSerie } from "./serviceSerie.js";

const series = [];
const containerCarte = document.querySelector("#carteContainer");
const ajouterBtn = document.getElementById("ajoute-btn");
const nomInput = document.getElementById("serie");
const genreInput = document.getElementById("list-genre");
const descriptionInput = document.getElementById("description");
const searchInput = document.getElementById("search");
const resetBtn = document.getElementById("resetButton");
const formulaire = document.getElementById("formulaire");
const count = document.getElementById("compteur");
const addGenre = document.getElementById("category");
const ajoutForm = document.getElementById("formulaire-ajout");
const langueInput = document.getElementById("list-langue");
const addLangue = document.getElementById("add-langue");

// const isAdded = null;

function afficher(data = series) {
  containerCarte.textContent = "";
  data.forEach((serie) => {
    const carte = document.createElement("article");
    carte.classList.add(
      "bg-[#191919]",
      "border",
      "border-[#393939]",
      "rounded-lg",
      "mt-5",
      "w-full",
    );
    containerCarte.appendChild(carte);

    const image = document.createElement("img");
    image.src = serie.image?.medium || serie.image || "";
    image.alt = "thumbnail";
    image.classList.add("rounded-t-lg", "w-full", "h-70", "object-cover");
    carte.appendChild(image);

    const div = document.createElement("div");
    div.classList.add("pl-3");
    carte.appendChild(div);

    const title = document.createElement("h2");
    title.classList.add("text-[#FAFAFA]", "p-2");
    title.textContent = serie.name;
    div.appendChild(title);

    const genreDiv = document.createElement("div");
    genreDiv.classList.add("flex", "gap-3", "p-2");
    div.appendChild(genreDiv);

    serie.genres.forEach((genre) => {
      const genreOne = document.createElement("h4");
      genreOne.classList.add(
        "text-[11px]",
        "text-[#EEEEEE]",
        "bg-[#292929]",
        "rounded-xl",
        "text-center",
        "w-100",
        "pt-0.5",
        "whitespace-nowrap",
      );
      genreOne.textContent = genre;
      genreDiv.appendChild(genreOne);
    });

    const description = document.createElement("p");
    description.classList.add(
      "text-[#BABABA]",
      "text-[11px]",
      "pt-1",
      "pb-2",
      "line-clamp-1",
      "md:line-clamp-2",
      "lg:line-clamp-3",
      "p-2",
    );
    description.innerHTML = serie.summary + "...";
    div.appendChild(description);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("Delete");
    deleteBtn.classList.add(
      "bg-[#DC143C]",
      "text-[#FAFAFA]",
      "w-full",
      "rounded-lg",
      "mt-5",
      "mb-5",
      "h-8.75",
      "lg:w-37.5",
    );
    carte.appendChild(deleteBtn);

    const editBtn = document.createElement("button");
    editBtn.textContent = "Modifier";
    editBtn.classList.add(
      "bg-[#24A0ED]",
      "text-[#FAFAFA]",
      "w-full",
      "rounded-lg",
      "mb-5",
      "h-8.75",
      "lg:w-37.5",
    );
    carte.appendChild(editBtn);
  });
}

afficher();

// async function getData() {
//   try {
//     const response = await fetch("https://api.tvmaze.com/shows?page=0");
//     const data = await response.json();
//     series.push(...data.slice(0 , 20));
//     console.log(series);
//     afficher(series);
//   } catch (erreur) {
//     alert("erreur");
//   }
//   count.textContent = series.length + " séries affichées";
// }
// getData();

async function getDataAxios() {
  try {
    // console.log("bda...");

    const data = await getSeries();

    // console.log("jat data : ", data);

    series.push(...data);
    afficher(data);
  } catch (erreur) {
    alert("erreur");
  }
  count.textContent = series.length + " séries affichées";
}

ajouterBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const nom = nomInput.value;
  const genre = addGenre.value;
  const sum = descriptionInput.value;
  const lang = addLangue.value;
  if (
    nomInput.value == "" ||
    addGenre.value == "" ||
    descriptionInput.value == ""
  ) {
    alert("Please fill the fields correctly");
    return;
  }

  const newSerie = {
    name: nom,
    genres: genre.split(","),
    summary: sum,
    image: { medium: "https://placehold.net/default.png" },
    language: lang,
  };
  console.log(newSerie);

  try {
    const data = await createSerie(newSerie);
    console.log(data);
  } catch (erreur) {
    alert(erreur);
  }

  series.unshift(newSerie);
  afficher(series);
  ajoutForm.reset();
  descriptionInput.value = "";
});
searchInput.addEventListener("input", () => {
  rechercheFiltrer();
});

genreInput.addEventListener("change", () => {
  rechercheFiltrer();
});

langueInput.addEventListener("change", () => {
  rechercheFiltrer();
});

function rechercheFiltrer() {
  const recherche = searchInput.value.trim().toLowerCase();
  const filtreGenre = genreInput.value;
  const filtreLangue = langueInput.value;
  const result = series.filter((S) => {
    return (
      S.name.toLowerCase().includes(recherche) &&
      S.genres.includes(filtreGenre) &&
      S.language.includes(filtreLangue)
    );
  });
  count.textContent = result.length + " séries affichées";
  afficher(result);
}
resetBtn.addEventListener("click", (e) => {
  e.preventDefault();
  formulaire.reset();
  count.textContent = series.length + " séries affichées";
  afficher(series);
});
getDataAxios();

containerCarte.addEventListener("click", async function (event) {
  if (event.target.classList.contains("Delete")) {
    console.log("delete clicked");
    confirm("etes vous sur de supprimer cette serie !?");
    series = series.filter((serie) => serie.id !== target.id);
    afficher();
  }
  try {
    const data = await deleteSerie(suppression);
    console.log(data);

  } catch (erreur) {
    alert(erreur);
  }
});
