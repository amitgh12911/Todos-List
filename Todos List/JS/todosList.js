let notesArr = [];
let addNote = document.getElementById("add-note");
let addBtn = document.getElementById("add-btn");
let notesContainer = document.getElementById("notes-container");
let searchInputElement = document.getElementById("search");
showNotes();

addBtn.addEventListener("click", () => {
    if (
        addNote.value === "" ||
        getComputedStyle(addNote).getPropertyValue("border") ===
            "2px solid rgb(255, 0, 0)"
    ) {
        addNote.style.border = "2px solid rgb(255,0,0)"; // 1px solid rgb(118, 118, 118)
        addNote.style.color = "red";
        addNote.value = "Please Enter Something Here...";
    } else {
        notesArr.push(addNote.value);
        localStorage.setItem("notes", JSON.stringify(notesArr));
        showNotes();
        addNote.value = "";
    }
});

addNote.addEventListener("click", () => {
    if (addNote.style.border === "2px solid rgb(255, 0, 0)") {
        addNote.style.border = "1px solid rgb(118, 118, 118)";
        addNote.style.color = "black";
        addNote.value = "";
    }
});

function showNotes() {
    notesContainer.innerHTML = "";
    if (localStorage.getItem("notes") !== null) {
        notesArr = JSON.parse(localStorage.getItem("notes"));
        Array.from(notesArr).forEach((e, i) => {
            html = `
            <div class="box">
                <h4>Note ${i + 1}</h4>
                <p>${e}</p>
                <button class="btn delete-btn" id="${i}" onclick="deleteNote(this.id)">Delete</button>
            </div>
        `;
            notesContainer.insertAdjacentHTML("beforeend", html);
        });
        if (notesArr.length === 0) {
            forEmpty = "<small>Please, Add Your notes to display here.</small>";
            notesContainer.innerHTML = forEmpty;
        }
    }
    if (localStorage.getItem("notes") === null) {
        forEmpty = "<small>Please, Add Your notes to display here.</small>";
        notesContainer.innerHTML = forEmpty;
    }
}

function deleteNote(n) {
    if (
        localStorage.getItem("notes") !== "[]" ||
        localStorage.getItem("notes") !== null
    ) {
        let newNotes = JSON.parse(localStorage.getItem("notes"));
        newNotes.splice(n, 1);
        localStorage.setItem("notes", JSON.stringify(newNotes));
        showNotes();
    }
}

searchInputElement.addEventListener("input", function () {
    if (notesArr.length !== 0) {
        let boxElement = document.querySelectorAll(".box");
        Array.from(boxElement).forEach((e) => {
            if (
                e.innerHTML
                    .toLocaleLowerCase()
                    .includes(this.value.toLocaleLowerCase())
            ) {
                e.style.display = "block";
            } else {
                e.style.display = "none";
            }
        });
    }
});
