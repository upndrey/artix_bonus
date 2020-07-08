document.addEventListener("DOMContentLoaded", async () => {
    if(js_page !== "admin") {
        let data = await getData("../php/getProfile.php");
        await setShortInfo(data);
        await setFullInfo(data);
        await setInput(data);
        if(js_page === "profile") {
            let transactions = await getData("../php/getTransactions.php");
            await setTransactions(transactions)
        }
    }
    else {
        let transactions = await getData("../php/getTransactions.php");
        await setTransactionInputs(transactions);
    }
});

async function getData(url) {
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
        let statusDom = document.querySelector(".js-status");
        loginDom.innerHTML = data["login"];
        firstnameDom.innerHTML = data["firstname"];
        lastnameDom.innerHTML = data["lastname"];
        pointsDom.innerHTML = data["points"];
        emailDom.innerHTML = data["email"];
        statusDom.innerHTML = data["privilege_id"];
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

function setTransactions(transactions) {
    let transactionsDom = document.querySelector(".js-transaction__select");
    for(let elem in transactions) {
        let optionDom = document.createElement("option");
        optionDom.innerText = transactions[elem]['title'] + " " + transactions[elem]['price'] + "р.";
        optionDom.value = transactions[elem]['title'];
        transactionsDom.appendChild(optionDom);
    }
    transactionsDom.addEventListener("select", ()=> {

    });
}

function setTransactionInputs(data) {
    if(document.querySelector(".js-transactions__list")) {
        let transactionsDom = document.querySelector(".js-transactions__list");
        let transactionsHeaderDom = document.querySelector(".js-transactions__header");

        /* Заголовок таблицы */
        let rowDom = document.createElement("div");
        rowDom.className = "list__row";
        let titleDom = document.createElement("div");
        titleDom.innerText = "Название";

        let aboutDom = document.createElement("div");
        aboutDom.innerText = "Описание";

        let priceDom = document.createElement("div");
        priceDom.innerText = "Цена";

        rowDom.appendChild(titleDom);
        rowDom.appendChild(aboutDom);
        rowDom.appendChild(priceDom);
        transactionsHeaderDom.appendChild(rowDom);

        let maxIdDom = document.createElement("input");
        maxIdDom.type = "hidden";
        maxIdDom.name = "max_id";

        for(let elem in data) {
            let rowDom = document.createElement("label");
            rowDom.className = "list__row";
            rowDom.htmlFor = "transaction_" + data[elem]['id'];
            let titleDom = document.createElement("div");
            titleDom.innerText = data[elem]['title'];

            let aboutDom = document.createElement("div");
            aboutDom.innerText = data[elem]['about'];

            let priceDom = document.createElement("div");
            priceDom.innerText = data[elem]['price'] + "р.";

            let checkboxDom = document.createElement("input");
            checkboxDom.type = "checkbox";
            checkboxDom.name = "transaction_" + data[elem]['id'];
            checkboxDom.id = "transaction_" + data[elem]['id'];
            checkboxDom.className = "js-transaction_checkbox";


            rowDom.appendChild(titleDom);
            rowDom.appendChild(aboutDom);
            rowDom.appendChild(priceDom);
            transactionsDom.appendChild(checkboxDom);
            transactionsDom.appendChild(rowDom);

            maxIdDom.value = data[elem]['id'];
        }
        transactionsDom.appendChild(maxIdDom);
    }
}





















