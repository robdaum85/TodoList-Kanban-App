function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    const draggedTask = event.target;
    draggedTask.classList.add("dragging");
    event.dataTransfer.setData("text", draggedTask.innerText);
}

function drop(event) {
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    const draggedTask = document.createElement("div");
    draggedTask.innerText = data;
    draggedTask.className = "task";
    draggedTask.draggable = true;
    draggedTask.addEventListener("dragstart", drag);
    draggedTask.addEventListener("dblclick", editTask);

    // Remove a task do quadro anterior (se houver)
    const previousColumn = document.querySelector(".task.dragging");
    if (previousColumn && previousColumn.parentNode) {
        previousColumn.parentNode.removeChild(previousColumn);
    }

    event.target.appendChild(draggedTask);

    // Remove a classe "dragging" após o drop
    if (previousColumn) {
        previousColumn.classList.remove("dragging");
    }
}

function editTask(event) {
    const task = event.target;
    task.contentEditable = true;
    task.classList.add("edit-mode");
    task.focus();

    task.addEventListener("blur", function () {
        task.contentEditable = false;
        task.classList.remove("edit-mode");
    });
}
