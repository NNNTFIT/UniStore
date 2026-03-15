const btnDownload = document.getElementById("btn-download")
const btnNo = document.getElementById("btn-download-no")
const btnYes = document.getElementById("btn-download-yes")
const popupAcept = document.getElementById("popup-accept")
const popupLoading = document.getElementById("popup-loading")
btnDownload.addEventListener("click", () =>{
    popupAcept.classList.add("active")
})
btnNo.addEventListener("click", ()=>{
    popupAcept.classList.remove("active")
})
btnYes.addEventListener("click", ()=>{
    popupAcept.classList.remove("active")
    popupLoading.classList.add("active")
    setTimeout(() =>{
        popupLoading.classList.remove("active")
    },4000)
})
popupAcept.addEventListener("click", (e) => {
    if (e.target === popupAcept) {
        popupAcept.classList.remove("active")
    }
})
popupLoading.addEventListener("click", (e) => {
    if (e.target === popupLoading) {
        popupLoading.classList.remove("active")
    }
})