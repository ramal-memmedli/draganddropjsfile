let fileInputButton = document.getElementById("fileInputButton");
let fileInput = document.getElementById("fileInput")
let imageBox = document.querySelector(".images");

window.addEventListener("dragover", (event) => {
    event.preventDefault();
});

window.addEventListener("drop", (event) => {
    event.preventDefault();
});

fileInputButton.addEventListener("dragover", (event) => {
    event.preventDefault();
});

fileInputButton.addEventListener("click", () => {
    fileInput.click();
});

fileInputButton.addEventListener("drop", (event) => {
    let inputFiles = event.dataTransfer.files;
    if (checkFileType(inputFiles) != false) {
        fileInput.files = inputFiles;
        let images = fileInput.files;
        createImage(images);
    }
    else {
        alert("File(s) must be an image.");
    }
});

fileInput.addEventListener("change", () => {
    let images = fileInput.files;
    createImage(images);
});

function checkFileType(inputFiles) {
    for (const singleFile of inputFiles) {
        if (!singleFile.type.includes("image/")) {
            return false;
        }
    }
}

function createImage(images) {
    for (const image of images) {
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.addEventListener("loadend", () => {
            let imageOnHTML = document.createElement("img");
            imageOnHTML.className = "image";
            let imageBase64 = reader.result;
            imageOnHTML.setAttribute("src", `${imageBase64}`);
            imageBox.appendChild(imageOnHTML);
        });
    }
}
