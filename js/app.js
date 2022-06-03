/*
 * Drag and drop function
 * https://www.javascripttutorial.net/web-apis/javascript-drag-and-drop/#:~:text=Introduction%20to%20JavaScript%20Drag%20and%20Drop%20API&text=To%20drag%20an%20image%2C%20you,you%20would%20drag%20an%20image.
 * https://www.youtube.com/watch?v=4bzJrEETW4w
 */

const blocks = document.querySelectorAll(".block");
const slots = document.querySelectorAll(".slot");

blocks.forEach((block) => {
    block.addEventListener("dragstart", dragStart);
    block.addEventListener("dragend", dragEnd);
});

document.querySelectorAll(".slot").forEach((slot) => {
    slot.addEventListener("dragover", dragOver);
    slot.addEventListener("dragenter", dragEnter);
    slot.addEventListener("dragleave", dragLeave);
    slot.addEventListener("drop", drop);
});

function dragStart(e) {
    console.log("dragStart");
    e.dataTransfer.setData("text/plain", e.target.id);

    setTimeout(() => {
        e.target.classList.add("hide");
    }, 0);
}

function dragEnd(e) {
    e.target.classList.remove("hide");
}

function dragEnter(e) {
    console.log("dragEnter");
    e.preventDefault();

    if (e.target.classList.contains("slot")) {
        e.target.classList.add("drag-over");
    }
}

function dragOver(e) {
    console.log("dragOver");
    e.preventDefault();

    if (e.target.classList.contains("slot")) {
        e.target.classList.add("drag-over");
    }
}

function dragLeave(e) {
    e.preventDefault();
    console.log("dragLeave");

    if (e.target.classList.contains("slot")) {
        e.preventDefault();
        e.target.classList.remove("drag-over");
    }
}

function drop(e) {
    console.log("drop");
    e.target.classList.remove("drag-over");

    // get the draggable element
    const id = e.dataTransfer.getData("text/plain");
    const draggable = document.getElementById(id);

    // add it to the drop target
    if (e.target.classList.contains("slot")) {
        e.target.appendChild(draggable);
    }

    // display the draggable element
    draggable.classList.remove("hide");
}
