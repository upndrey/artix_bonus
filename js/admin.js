document.addEventListener("DOMContentLoaded", async () => {
    let transactions = await getTransactions();
    await setTransactionInputs(transactions);
});

async function getTransactions() {
    let url = "../php/getTransactions.php";
    let response = await fetch(url);
    return await response.json();
}

function setTransactionInputs(data) {
    if(document.querySelector(".js-transactions__list")) {
        let transactionsDom = document.querySelector(".js-transactions__list");

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
        transactionsDom.appendChild(rowDom);

        for(let elem in data) {
            let rowDom = document.createElement("div");
            rowDom.className = "list__row";
            let titleDom = document.createElement("div");
            titleDom.innerText = data[elem]['title'];

            let aboutDom = document.createElement("div");
            aboutDom.innerText = data[elem]['about'];

            let priceDom = document.createElement("div");
            priceDom.innerText = data[elem]['price'] + "р.";

            let checkboxDom = document.createElement("input");
            checkboxDom.type = "checkbox";
            checkboxDom.name = "transaction_" + data[elem]['id'];

            rowDom.appendChild(titleDom);
            rowDom.appendChild(aboutDom);
            rowDom.appendChild(priceDom);
            rowDom.appendChild(checkboxDom);
            transactionsDom.appendChild(rowDom);
        }
    }
}






























