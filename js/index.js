document.addEventListener("DOMContentLoaded", () => {
    let promise = setName();
});

async function setName() {
    let url = "../php/getName.php";
    let response = await fetch(url);
    let commits = await response.json();
    let nameDom = document.querySelector(".js-name");
    nameDom.innerHTML = commits["firstname"] + " " + commits["lastname"];
}