document.addEventListener("DOMContentLoaded", async () => {
    let data = await getData();
    await setShortInfo(data);
    await setFullInfo(data);
    await setInput(data);
});

async function getData() {
    let url = "../php/getData.php";
    let response = await fetch(url);
    return await response.json();
}

function setShortInfo(data) {
    let nameDom = document.querySelector(".js-name");
    nameDom.innerHTML = data["firstname"] + " " + data["lastname"];
}

function setFullInfo(data) {
    if(document.querySelector(".js-login")) {
        let loginDom = document.querySelector(".js-login");
        let firstnameDom = document.querySelector(".js-firstname");
        let lastnameDom = document.querySelector(".js-lastname");
        let pointsDom = document.querySelector(".js-points");
        let emailDom = document.querySelector(".js-email");
        loginDom.innerHTML = data["login"];
        firstnameDom.innerHTML = data["firstname"];
        lastnameDom.innerHTML = data["lastname"];
        pointsDom.innerHTML = data["points"];
        emailDom.innerHTML = data["email"];
    }
}

function setInput(data) {
    if(document.querySelector(".js-login-input")) {
        let loginDom = document.querySelector(".js-login-input");
        let firstnameDom = document.querySelector(".js-firstname-input");
        let lastnameDom = document.querySelector(".js-lastname-input");
        let addressDom = document.querySelector(".js-address-input");
        let emailDom = document.querySelector(".js-email-input");
        loginDom.placeholder = data["login"];
        firstnameDom.placeholder = data["firstname"];
        lastnameDom.placeholder = data["lastname"];
        addressDom.placeholder = data["address"];
        emailDom.placeholder = data["email"];

        document.getElementById("sendDataForm").addEventListener("submit", (e) => {

            let newPasswordDom = document.querySelector(".js-newPassword-input");
            let repeatPasswordDom = document.querySelector(".js-repeatPassword-input");
            if(newPasswordDom.value && newPasswordDom.value !== repeatPasswordDom.value) {
                e.preventDefault();
                alert("Пароли не совпадают!")
            }
        });
    }
}






























