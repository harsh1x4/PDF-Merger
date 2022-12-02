const inputWrapper = document.querySelector(".input-wrapper"),
fileInput = document.querySelector(".file-input")

inputWrapper.addEventListener("click", () => {
  fileInput.click();
});

fileInput.onchange = ({target}) => {
  let files = target.files;
  console.log(files.length)

  if (files.length <= 2) {
    for (let index = 0; index < files.length; index++) {
      console.log(files[index].name)
      document.getElementById('uploaded').innerHTML += `<div class="uploaded_files" id="uploaded_files" ><img src="./doc.svg" alt="document svg"> <span id="filename">${files[index].name}</span></div>`
    }
  }else{
    document.getElementById('uploaded').innerHTML = `<div class="uploaded_files" id="uploaded_files" ><img src="./error.svg" alt="document svg"> <span id="filename">Error!!! Refresh the page and try uploading two files.</span></div>`
    document.getElementById('filename').style.color = "#ff0000"
    document.getElementById('uploaded_files').style.borderColor = "#ff0000"
    document.getElementById('filename').style.fontWeight = "600"
  }
}
