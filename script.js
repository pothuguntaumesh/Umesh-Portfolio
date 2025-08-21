function toggleDetails(projectId) {
  const details = document.getElementById(projectId);
  const arrowBtn = event.target;

  if (details.style.display === "none" || details.style.display === "") {
    details.style.display = "block";
    arrowBtn.innerHTML = "⌃"; // Up caret
    arrowBtn.classList.remove("down-caret");
    arrowBtn.classList.add("up-caret");
  } else {
    details.style.display = "none";
    arrowBtn.innerHTML = "⌄"; // Down caret
    arrowBtn.classList.remove("up-caret");
    arrowBtn.classList.add("down-caret");
  }
}

function toggleCard(cardId) {
  const content = document.getElementById(cardId);
  const cardHeader = event.currentTarget;
  const toggleBtn = cardHeader.querySelector(".card-toggle");

  if (content.style.display === "none" || content.style.display === "") {
    content.style.display = "block";
    toggleBtn.textContent = "CLOSE";
  } else {
    content.style.display = "none";
    toggleBtn.textContent = "OPEN";
  }
}

function scrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}
