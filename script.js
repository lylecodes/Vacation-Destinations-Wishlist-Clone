document
  .querySelector("#destination_details_form")
  .addEventListener("submit", handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();

  const destinationName = event.target.elements["name"].value;
  const destinationLocation = event.target.elements["location"].value;
  const destinationPhoto = event.target.elements["photo"].value;
  const destinationDesc = event.target.elements["description"].value;

  resetFormValues(event.target);

  const destinationCard = createDestinationCard(
    destinationName,
    destinationLocation,
    destinationPhoto,
    destinationDesc
  );

  const wishListContainer = document.querySelector("#destinations_container");

  if (wishListContainer.children.length === 0) {
    document.querySelector("#title").innerHTML = "My Wishlist";
  }

  document
    .querySelector("#destinations_container")
    .appendChild(destinationCard);
}

function resetFormValues(form) {
  for (let i = 0; i < form.length; i++) {
    form.elements[i].value = "";
  }
}

function createDestinationCard(name, location, photoUrl, description) {
  const card = document.createElement("div");
  card.setAttribute("class", "card");
  card.style.width = "15rem";
  card.style.height = "fit-content";
  card.style.margin = "20px;";

  const image = document.createElement("img");
  image.setAttribute("class", "card-img-top");
  image.setAttribute("alt", name);

  const constantPhotoUrl =
    "https://cavchronicle.org/wp-content/uploads/2018/03/top-travel-destination-for-visas-900x504.jpg";

  if (photoUrl.length === 0) {
    image.setAttribute("src", constantPhotoUrl);
  } else {
    image.setAttribute("src", photoUrl);
  }

  card.appendChild(image);

  const cardBody = document.createElement("div");
  cardBody.setAttribute("class", "card-body");

  const cardTitle = document.createElement("h5");
  cardTitle.setAttribute("class", "card-title");
  cardTitle.innerText = name;
  cardBody.appendChild(cardTitle);

  const cardSubtitle = document.createElement("h6");
  cardSubtitle.setAttribute("class", "card-subtitle mb-2 text-muted");
  cardTitle.innerText = location;
  cardBody.appendChild(cardSubtitle);

  if (description.length !== 0) {
    const cardText = document.createElement("p");
    cardText.setAttribute("class", "card-text");
    cardText.innerText = description;
    cardBody.appendChild(cardText);
  }

  const buttonsContainer = document.createElement("div");
  buttonsContainer.setAttribute("class", "buttons_container");

  const editCardBtn = document.createElement("button");
  editCardBtn.setAttribute("class", "btn btn-warning");
  editCardBtn.innerText = "Edit";
  editCardBtn.addEventListener("click", editDestination);

  const deleteCardBtn = document.createElement("button");
  deleteCardBtn.setAttribute("class", "btn btn-danger");
  deleteCardBtn.innerText = "Delete";
  deleteCardBtn.addEventListener("click", removeDestination);

  buttonsContainer.appendChild(editCardBtn);
  buttonsContainer.appendChild(deleteCardBtn);

  cardBody.append(buttonsContainer);

  card.appendChild(cardBody);

  return card;
}

function editDestination(event) {
  const cardBody = event.target.parentElement.parentElement;
  const title = cardBody.children[0];
  const subTitle = cardBody.children[1];

  const card = cardBody.parentElement;
  photoUrl = card.children[0];

  const newTitle = window.prompt("Enter new name");
  const newSubtitle = window.prompt("Enter new location");
  const newPhotoUrl = window.prompt("Enter new photo url");

  if (newTitle.length > 0) {
    title.innerText = newTitle;
  }

  if (newSubtitle.length > 0) {
    subTitle.innerText = newSubtitle;
  }

  if (newPhotoUrl.length > 0) {
    photoUrl.setAttribute("src", newPhotoUrl);
  }
}

function removeDestination(event) {
  const cardBody = event.target.parentElement.parentElement;
  const card = cardBody.parentElement;
  card.remove();
}
