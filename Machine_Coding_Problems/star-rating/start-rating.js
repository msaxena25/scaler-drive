const starContainer = document.querySelector(".container__stars");
const countElement = document.querySelector("#count");
const starArray = document.querySelectorAll(".container__stars__star");
console.log("👉  starArray:", starArray);

let currentSelectedValue = 0;

/* Instead of adding listeners on every star item, attach listener on star-container.
Process logic after checking e.target. 
If e.target is star_container itself then simply return. */
starContainer.addEventListener('click', (e) => {
    if (e.target === starContainer) {
        return;
    }
    console.log(e.target);
    const value = e.target.dataset.idx;
    countElement.textContent = value;
    currentSelectedValue = value;
    highlightStars(value);
})

// On Mouse over we have to highlight stars only.
starContainer.addEventListener('mouseover', (e) => {
    if (e.target === starContainer) {
        return;
    }
    const value = e.target.dataset.idx;
    highlightStars(value);
})

// When mouse leave, it must be back to its previous state.
starContainer.addEventListener('mouseleave', (e) => {
    highlightStars(currentSelectedValue);
})

// highlight all previous stars including selected one with yellow color.
// Rest remaining must be in gray only.
function highlightStars(value) {
    starArray.forEach((element, i) => {
        if (i < value) {
            element.style.color = 'yellow';
        } else {
            element.style.color = 'gray';
        }
    });
}