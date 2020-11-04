let addContainer = document.querySelector(".container__add");
let modal = document.querySelector(".modal");


addContainer.addEventListener("click", (event) => {
    modal.style.display = "block";
    event.stopPropagation();
})

window.addEventListener("click", (event) => {
    if ( event.target == modal) {
        modal.style.display = "none";
    }
})