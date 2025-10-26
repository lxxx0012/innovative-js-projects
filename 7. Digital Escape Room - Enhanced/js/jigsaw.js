document.addEventListener("DOMContentLoaded", () => {
    const grid = document.getElementById("jigsaw-grid");

    // Drag and Drop Logic
    grid.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text", e.target.id);
    });

    grid.addEventListener("drop", (e) => {
        e.preventDefault();
        const draggedElementId = e.dataTransfer.getData("text");
        const draggedElement = document.getElementById(draggedElementId);
        const targetElement = e.target;

        // Swap elements
        const parent = targetElement.parentNode;
        parent.insertBefore(draggedElement, targetElement.nextSibling);
    });

    grid.addEventListener("dragover", (e) => e.preventDefault());
});