
const table = document.getElementById('tbl');

// used fragment here for performance
const tableFragment = document.createDocumentFragment();
let boxesArr;

/* 
Code which needs to execute on window load, we do that in window load method.
In below code we are using two for loop for creating chessboard boxes.
Create tr and td and append each td into tr accordingly.
Append tr in table fragment.
Finally append that fragment into real table element.
*/
window.addEventListener('load', () => {
    for (let i = 0; i < 8; i++) {
        let tr = document.createElement("tr");
        let white = i % 2 == 0 ? true : false; // for even white color, for odd black color.
        for (let j = 0; j < 8; j++) {
            let cell = document.createElement("td");
            // apply box class on every cell.
            // apply while and black based on odd and even cell number
            cell.setAttribute("class", `box ${white ? "white" : "black"}`);
            cell.textContent = `${i}-${j}`; // this is just know boxes Id, we can remove this.
            cell.setAttribute('data-index', `${i}-${j}`); // this is data Id which we are using.
            tr.appendChild(cell);
        }
        tableFragment.appendChild(tr);
    }
    table.appendChild(tableFragment);
    // store all boxes div in boxesArr to loop over to highlight.
    boxesArr = document.querySelectorAll(".box");
});

/*
Now we have to add an event of mouse hover on each boxes.
So Instead of adding event on each box, we will add event on table and based on current target property, 
we can find box class element.

*/

table.addEventListener('mouseover', (event) => {
    if (event.target == table) {
        return;
    }
    const clickedBoxIndex = event.target.dataset.index;
    console.log("👉  clickedBoxIndex:", clickedBoxIndex);
    const [row, col] = clickedBoxIndex.split('-');
    //  highlightBoxes(findBoxes(row, col));
    highlightBoxes(findDiagonalBoxes(row, col));


});

// when mouse leave from table, remove highlight yellow color.
table.addEventListener('mouseleave', () => {
    boxesArr.forEach(element => {
        element.classList.remove('yellow');
    });
})

function highlightBoxes(connectedBoxes) {
    boxesArr.forEach(element => {
        if (connectedBoxes.has(element.dataset.index)) {
            element.classList.add('yellow');
        } else {
            element.classList.remove('yellow');
        }
    });
}

// Highlight horizontal and vertical boxes
function findBoxes(row, col) {
    let connectedBoxes = new Set(); // to avoid duplicate values
    // find boxes at left and right side.
    let right = col;
    while (right <= 7) {
        connectedBoxes.add(`${row}-${right}`);
        right++;
    }
    let left = col;
    while (left >= 0) {
        connectedBoxes.add(`${row}-${left}`);
        left--;
    }
    // find boxes to top & bottom side
    let top = row;
    while (top >= 0) {
        connectedBoxes.add(`${top}-${col}`);
        top--;
    }
    let bottom = row;
    while (bottom <= 7) {
        connectedBoxes.add(`${bottom}-${col}`);
        bottom++;
    }
    return connectedBoxes;
}

// Highlight diagonal boxes
function findDiagonalBoxes(row, col) {
    let connectedBoxes = new Set(); // to avoid duplicate values
    // top left - both row and col will decrease here.
    let top = row;
    let left = col;
    while (top >= 0 && left >= 0) {
        connectedBoxes.add(`${top}-${left}`);
        top--;
        left--;
    }

    // top right - top is decreasing and right is increasing.
    let top1 = row;
    let right = col;
    while (top1 >= 0 && right <= 7) {
        connectedBoxes.add(`${top1}-${right}`);
        top1--;
        right++;
    }

    // bottom left - bottom increasing and left decreasing
    let bottom = row;
    let left1 = col;
    while (bottom <= 7 && left1 >= 0) {
        connectedBoxes.add(`${bottom}-${left1}`);
        bottom++;
        left1--;
    }

    // bottom right - both will increase
    let bottom1 = row;
    let right1 = col;
    while (bottom1 <= 7 && right1 <= 7) {
        connectedBoxes.add(`${bottom1}-${right1}`);
        bottom1++;
        right1++;
    }
    return connectedBoxes;
}