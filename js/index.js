
/*
let products = {
    "Сидры": {
        "Яблочный": {
            "Сорт 1": {
                "GUID": '',
                "count": 5,
                "price": 44
                "measure": "шт"
            },
            "Сорт 2": {
                "GUID": '',
                "count": 14,
                "price": 42
                "measure": "шт"
            }
        },
        "Грушевый": {
            "Сорт 1": {
                "GUID": '',
                "count": 25,
                "price": 44
                "measure": "л"
            },
            "Сорт 2": {
                "GUID": '',
                "count": 15,
                "price": 13
                "measure": "шт"
            }
        }
    },
    "Безалкогольные напитки": {
        "Газированные напитки": {
            "Тархун": {
                "GUID": '',
                "count": 5,
                "price": 44
                "measure": "л"
            },
            "Coca Cola": {
                "GUID": '',
                "count": 14,
                "price": 33
                "measure": "л"
            }
        }
    }

};
*/

let linksList = [];// Список с объектами продуктов для каждого элемента таблицы
let namesList = [];// Наименование иерархии продуктов
let selectedFlag = 0;// Выделен ли продукт
let selectedList = [];
let addId = 0;

document.addEventListener("DOMContentLoaded", () => {
    addressGenerator();
    var titleDom = document.getElementById("content-block__title");
    titleDom.innerText = js_customers[0].name;

    var dateDom = document.getElementById("date-block__print-date");
    dateDom.addEventListener("blur", () => {
        var date = new Date(dateDom.value);
        if(date.getTime() < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()) {
            dateDom.value = null;
            alert("Дата меньше сегодняшней!");
        }
    });
    var addressDom = document.getElementById("order-form__address-hidden");

    document.getElementById("order-form").addEventListener("submit", (e) => {
        var productBlockDom = document.getElementById("product-block");
        if(productBlockDom.childNodes.length === 0) {
            alert("Добавьте продукт в корзину!");
            e.preventDefault();
            return false;
        }


        var date = new Date(dateDom.value);
        if (date.getTime() < new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()).getTime()) {
            alert("Дата меньше сегодняшней!");
            e.preventDefault();
            return false;
        }

        var parentDom = document.getElementById("order-form");
        var hiddenGUID = document.createElement("input");
        hiddenGUID.type = "hidden";
        hiddenGUID.name = "GUID";
        for(var i = 0; i < js_customers.length; i++) {
            if(js_customers[i].address === addressDom.value) {
                hiddenGUID.value = js_customers[i].GUID;
                break;
            }
        }
        parentDom.appendChild(hiddenGUID);
    });
});

// Генерация объекта продуктов из php
function createProductsObject() {
    var productsObject = {};
    js_products.sort(compare);
    addHierarchy(productsObject, js_products, js_prices, js_remains, "");
    return productsObject;
}

function compare( a, b ) {
    if ( a.name < b.name ){
        return -1;
    }
    if ( a.name > b.name ){
        return 1;
    }
    return 0;
}


// Иерархия папок и элементов
function addHierarchy(productObj, productArr, priceArr, remainsArr, parent) {
    for(var i = 0; i < productArr.length; i++) {
        if(productArr[i].parent === parent) {
            if(productArr[i].is_folder === "Истина")
                productObj[productArr[i].name] = {};
            else{
                var price = 0;
                var remains = 0;
                for(var j = 0; j < priceArr.length; j++) {
                    if(priceArr[j].product_GUID === productArr[i].GUID) {
                        price = priceArr[j].price;
                        break;
                    }
                }
                for(var j = 0; j < remainsArr.length; j++) {
                    if(remainsArr[j].product_GUID === productArr[i].GUID) {
                        remains = remainsArr[j].quantity;
                        break;
                    }
                }

                if(remains !== 0 || js_customers[0].orderFlag !== "Нет"){
                    productObj[productArr[i].name] = {
                        "GUID": productArr[i].GUID,
                        "remains": remains,
                        "price": price,
                        "measure": productArr[i].measure,
                        "product_type": productArr[i].product_type
                    };
                }
                else if(productArr[i].product_type === "Услуга") {
                    productObj[productArr[i].name] = {
                        "GUID": productArr[i].GUID,
                        "remains": 999,
                        "price": price,
                        "measure": productArr[i].measure,
                        "product_type": productArr[i].product_type
                    };
                }
            }
            if(productArr[i].is_folder === "Истина")
                addHierarchy(productObj[productArr[i].name], productArr, priceArr, remainsArr, productArr[i].GUID);

            if (productObj[productArr[i].name] && Object.keys(productObj[productArr[i].name]).length === 0 && productObj[productArr[i].name].constructor === Object) {
                delete productObj[productArr[i].name];
            }
        }
    }
}

// Добавление нового продукта
function addProduct(currentProducts) {
    let productBlockDom = document.getElementById("product-block");

    let rowDom = document.createElement("div");
    rowDom.className = "product-block__product-row product-row";

    let buttonSelectDom = document.createElement("div");
    buttonSelectDom.className = "product-row__elem product-row__name";
    buttonSelectDom.innerText = "Выберите товар";

    let countInputDom = document.createElement("input");
    countInputDom.className = "product-row__elem product-row__count";
    countInputDom.type = "tel";
    countInputDom.min = "1";
    countInputDom.max = "9999";
    countInputDom.required = true;
    countInputDom.placeholder = "кол.";
    countInputDom.name = "count" + addId;
    countInputDom.addEventListener('focus', () => {
        countInputDom.value = null;
    });
    countInputDom.addEventListener('input', () => {
        countInputDom.value = countInputDom.value.replace(/\D/g, '');
        if(parseInt(countInputDom.value) === 0) {
            countInputDom.value = "1";
            for(let i = 0; i < selectedList.length; i++){
                if(buttonSelectDom.innerHTML === selectedList[i][0]) {
                    selectedList[i][1] = countInputDom.value;
                    break;
                }
            }
            updatePrice(countInputDom);
            updateTotalPrice();
        }
        else if (parseInt(countInputDom.value) > parseInt(countInputDom.max)) {
            countInputDom.value = countInputDom.max;
            for(let i = 0; i < selectedList.length; i++){
                if(buttonSelectDom.innerHTML === selectedList[i][0]) {
                    selectedList[i][1] = countInputDom.value;
                    break;
                }
            }
            updatePrice(countInputDom);
            updateTotalPrice();
        }
        else {
            for (var i = 0; i < selectedList.length; i++) {
                if (buttonSelectDom.innerHTML === selectedList[i][0]) {
                    selectedList[i][1] = countInputDom.value;
                    break;
                }
            }
            updatePrice(countInputDom);
            updateTotalPrice();
        }
    });

    let countMeasureDom = document.createElement("div");
    countMeasureDom.className = "product-row__measure";
    countMeasureDom.innerText = "шт.";
    let totalDom = document.createElement("div");
    totalDom.className = "product-row__elem product-row__total";
    let span = document.createElement("span");
    span.innerText = "0";
    totalDom.appendChild(span);
    span = document.createElement("span");
    span.innerHTML = "&nbsp;р.";
    totalDom.appendChild(span);

    let priceDom = document.createElement("div");
    priceDom.className = "product-row__elem product-row__price";
    span = document.createElement("span");
    span.innerText = "0";
    priceDom.appendChild(span);
    span = document.createElement("span");
    span.innerHTML = "&nbsp;р.";
    priceDom.appendChild(span);

    let hiddenGUID = document.createElement("input");
    hiddenGUID.type = "hidden";
    hiddenGUID.name = "productGUID" + addId;

    let hiddenMaxCount = document.getElementById("order-form__max-count-hidden");
    hiddenMaxCount.value = addId;
    addId++;
    let removeDom = document.createElement("div");
    removeDom.className = "product-row__remove";
    removeDom.innerText = "X";
    removeDom.onclick = () => {removeRow(removeDom)};


    rowDom.appendChild(buttonSelectDom);
    rowDom.appendChild(priceDom);
    rowDom.appendChild(countInputDom);
    rowDom.appendChild(countMeasureDom);
    rowDom.appendChild(totalDom);
    rowDom.appendChild(hiddenGUID);
    rowDom.appendChild(removeDom);

    productBlockDom.appendChild(rowDom);


    var searchDom = document.getElementById("search");
    searchDom.addEventListener("input", () => {
        namesList = [];
        linksList = [];
        if(searchDom.value === ""){
            namesList = [];
            linksList = [];
            selectProduct(buttonSelectDom, null);
            return;
        }
        var productsObject = {};
        js_products.sort(compare);
        for(var i = 0; i < js_products.length; i++) {
            if(js_products[i].name.toLowerCase().includes(searchDom.value.toLowerCase())) {
                if(js_products[i].is_folder === "Истина")
                    continue;
                else {
                    var price = 0;
                    var remains = 0;
                    for(var j = 0; j < js_prices.length; j++) {
                        if(js_prices[j].product_GUID === js_products[i].GUID) {
                            price = js_prices[j].price;
                            break;
                        }
                    }
                    for(var j = 0; j < js_remains.length; j++) {
                        if(js_remains[j].product_GUID === js_products[i].GUID) {
                            remains = js_remains[j].quantity;
                            break;
                        }
                    }

                    if(remains !== 0 || js_customers[0].orderFlag !== "Нет"){
                        productsObject[js_products[i].name] = {
                            "GUID": js_products[i].GUID,
                            "remains": remains,
                            "price": price,
                            "measure": js_products[i].measure,
                            "product_type": js_products[i].product_type
                        };
                    }
                    else if(js_products[i].product_type === "Услуга") {
                        productsObject[js_products[i].name] = {
                            "GUID": js_products[i].GUID,
                            "remains": 999,
                            "price": price,
                            "measure": js_products[i].measure,
                            "product_type": js_products[i].product_type
                        };
                    }
                }
            }
        }
        generateTable(productsObject, "Поиск", buttonSelectDom);
        namesList.pop();
        linksList.pop();
    });
    if(currentProducts)
        selectProduct(buttonSelectDom, currentProducts);
    else
        selectProduct(buttonSelectDom, null);
}

// Открыть выбор продукта
function selectProduct(selectDom, currentProducts) {
    let contentBlockDom = document.getElementById("content-block");
    let selectProductDom = document.getElementById("select-product");
    contentBlockDom.classList.add("content-block_hidden");
    selectProductDom.classList.remove("content-block_hidden");
    if(currentProducts)
        generateTable(currentProducts, "Все", selectDom, 0, 1);
    else{
        var products = createProductsObject();
        if(Object.keys(products).length === 0){
            closeSelectProduct();
            if(js_remains.length === 0)
                alert("На складе нет доступных остатков, обратитесь к своему менеджеру.");
            else if(js_prices.length === 0)
                alert("Вам не присвоен тип цен в учетной системе, обратитесь к своему менеджеру.");
        }
        else
            generateTable(products, "Все", selectDom);
    }
}

// Закрыть выбор продукта
function closeSelectProduct() {
    let productBlockDom = document.getElementById("product-block");
    removeRow(productBlockDom.lastChild.lastChild);
    let contentBlockDom = document.getElementById("content-block");
    let selectProductDom = document.getElementById("select-product");
    contentBlockDom.classList.remove("content-block_hidden");
    selectProductDom.classList.add("content-block_hidden");

    let searchDom = document.getElementById("search");
    searchDom.value = "";
    namesList = [];
    linksList = [];
    selectedFlag = 0;
}

// Генерация таблицы для выбора продукта
function generateTable(productsList, elemName, selectDom, isDelete, isSamePage) {
    if(isDelete){
        // Переход по ссылке на родителя
        while(namesList[namesList.length - 1] !== elemName) {
            namesList.pop();
            linksList.pop();
        }
        selectedFlag = 0;
    }
    else if(!isSamePage){
        linksList.push(productsList);
        namesList.push(elemName);
    }
    let tableDom = document.getElementById("select-table");
    while (tableDom.lastElementChild) {
        tableDom.removeChild(tableDom.lastElementChild);
    }
    if(Object.keys(productsList).length === 0){
        return;
    }
    // Заголовок таблицы
    let rowDom = document.createElement("div");
    rowDom.className = "select-table__select-row select-row";
    let rowElemDom = document.createElement("div");
    rowElemDom.className = "select-row__elem select-row_linked";

    for(let i = 0; i < namesList.length - 1; i++) {
        let linkDom = document.createElement("span");
        linkDom.className = "select-row__elem_linked";
        linkDom.innerText = namesList[i];
        linkDom.onclick = () => {generateTable(linksList[i], namesList[i], selectDom, 1)};
        rowElemDom.appendChild(linkDom);
        linkDom = document.createElement("span");
        linkDom.innerText = " / ";
        rowElemDom.appendChild(linkDom);
    }
    rowDom.appendChild(rowElemDom);

    rowElemDom = document.createElement("div");
    rowElemDom.className = "select-row__elem";
    if(js_customers[0].orderFlag === "Нет")
        rowElemDom.innerText = "Остаток";
    else
        rowElemDom.innerHTML = "Под&nbsp;заказ";
    rowDom.appendChild(rowElemDom);

    rowElemDom = document.createElement("div");
    rowElemDom.className = "select-row__elem";
    rowElemDom.innerText = "Цена";
    rowDom.appendChild(rowElemDom);

    rowElemDom = document.createElement("div");
    rowElemDom.className = "select-row__elem select-row__submit";
    rowElemDom.innerText = "";

    rowDom.appendChild(rowElemDom);

    tableDom.appendChild(rowDom);

    // Назад
    if(namesList.length > 1 && elemName !== "Поиск"){
        // Ссылка на родителя продукта
        rowDom = document.createElement("div");
        rowDom.className = "select-table__select-row select-row select-row_folder select-row_back";
        rowDom.onclick = () => {generateTable(linksList[linksList.length - 2], namesList[namesList.length - 2], selectDom, 1)};

        rowElemDom = document.createElement("div");
        rowElemDom.className = "select-row__elem";
        rowElemDom.innerText = namesList[namesList.length - 1];
        rowDom.appendChild(rowElemDom);

        rowElemDom = document.createElement("div");
        rowElemDom.className = "select-row__elem";
        if(js_customers[0].orderFlag === "Нет")
            rowElemDom.innerText = "-";
        else
            rowElemDom.innerText = "";
        rowDom.appendChild(rowElemDom);

        rowElemDom = document.createElement("div");
        rowElemDom.className = "select-row__elem";
        rowElemDom.innerText = "-";
        rowDom.appendChild(rowElemDom);

        rowElemDom = document.createElement("div");
        rowElemDom.className = "select-row__elem select-row__submit";
        rowElemDom.innerText = "Назад";
        rowDom.appendChild(rowElemDom);

        tableDom.appendChild(rowDom);
    }

    // Для папок
    for(let elem in productsList) {
        let rowDom = document.createElement("div");

        let isSelected = 0;
        let elemCount = 0;
        let elemId = -1;
        for(let i = 0; i < selectedList.length; i++){
            if(elem === selectedList[i][0]) {
                isSelected = 1;
                elemCount = selectedList[i][1];
                elemId = i;
                break;
            }
        }
        // Изменить условие, если была произведена замена положений в базе данных
        // Конечный продукт
        if(Object.keys(productsList[elem])[0] !== "GUID"){
            rowDom.className = "select-table__select-row select-row select-row_folder";
            rowDom.onclick = () => {generateTable(productsList[elem], elem, selectDom)};
            let rowElemDom = document.createElement("div");
            rowElemDom.className = "select-row__elem";
            rowElemDom.innerText = elem;
            rowDom.appendChild(rowElemDom);

            rowElemDom = document.createElement("div");
            rowElemDom.className = "select-row__elem";
            if(js_customers[0].orderFlag === "Нет")
                rowElemDom.innerText = "-";
            else
                rowElemDom.innerText = "";
            rowDom.appendChild(rowElemDom);

            rowElemDom = document.createElement("div");
            rowElemDom.className = "select-row__elem";
            rowElemDom.innerText = "-";
            rowDom.appendChild(rowElemDom);

            rowElemDom = document.createElement("div");
            rowElemDom.className = "select-row__elem select-row__submit";
            rowElemDom.innerText = "Открыть";

            rowDom.appendChild(rowElemDom);
        }
        tableDom.appendChild(rowDom);
    }

    // Для продуктов
    for(let elem in productsList) {
        let rowDom = document.createElement("div");

        let isSelected = 0;
        let elemCount = 0;
        let elemId = -1;
        for(let i = 0; i < selectedList.length; i++){
            if(elem === selectedList[i][0]) {
                isSelected = 1;
                elemCount = selectedList[i][1];
                elemId = i;
                break;
            }
        }
        // Изменить условие, если была произведена замена положений в базе данных
        // Конечный продукт
        if(Object.keys(productsList[elem])[0] === "GUID"){
            // Название продукта
            if(isSelected)
                rowDom.className = "select-table__select-row select-row select-row__elem_active";
            else
                rowDom.className = "select-table__select-row select-row";
            if(!isSelected)
                rowDom.onclick = () => {
                    selectResult(productsList[elem], elem, selectDom, rowDom, productsList);
                };
            let rowElemDom = document.createElement("div");
            rowElemDom.className = "select-row__elem";
            rowElemDom.innerText = elem;
            rowDom.appendChild(rowElemDom);

            // Количество продукта на складе
            rowElemDom = document.createElement("div");
            rowElemDom.className = "select-row__elem";
            let span = document.createElement("span");
            if(js_customers[0].orderFlag === "Нет" && Object.values(productsList[elem])[4] === "Товар")
                span.innerText = Object.values(productsList[elem])[1];
            else
                span.innerText = "";
            rowElemDom.appendChild(span);
            span = document.createElement("span");
            if(js_customers[0].orderFlag === "Нет")
                span.innerHTML = "&nbsp;" + Object.values(productsList[elem])[3];
            else
                span.innerHTML = "";
            rowElemDom.appendChild(span);
            rowDom.appendChild(rowElemDom);

            // Цена продукта
            rowElemDom = document.createElement("div");
            rowElemDom.className = "select-row__elem";

            span = document.createElement("span");
            span.innerText = Object.values(productsList[elem])[2];
            rowElemDom.appendChild(span);

            span = document.createElement("span");
            span.innerHTML = "&nbsp;р.";
            rowElemDom.appendChild(span);

            rowDom.appendChild(rowElemDom);
            rowElemDom = document.createElement("div");
            if(!isSelected) {
                rowElemDom.className = "select-row__elem select-row__submit";
                rowElemDom.innerText = "Выбрать";
            }
            else {
                rowElemDom.className = "select-row__elem select-row__basket basket";
                let rowElemCountDom = document.createElement("div");
                rowElemCountDom.className = "basket__count-folder";
                let minusButton = document.createElement("div");
                minusButton.innerText = "-";
                minusButton.className = "basket__sign basket__minus";
                let input = document.createElement("input");
                input.type = "tel";
                input.value = elemCount;
                if(js_customers[0].orderFlag !== "Да")
                    input.max = Object.values(productsList[elem])[2];
                input.min = 1;

                input.addEventListener('focus', () => {
                    input.value = null;
                });
                input.addEventListener("input", () => {
                    if((parseInt(input.value) <= parseInt(Object.values(productsList[elem])[1]) || js_customers[0].orderFlag === "Да") && parseInt(input.value) > 0){
                        selectedList[elemId][1] = input.value;
                        // count dom
                        selectedList[elemId][2].parentNode.childNodes[2].value = input.value;
                        updatePrice(selectedList[elemId][2].parentNode.childNodes[4]);
                        updateTotalPrice();
                    }
                    else if(parseInt(input.value) === 0) {
                        removeRow(selectedList[elemId][2].parentNode.childNodes[2]);
                        updateTotalPrice();
                        generateTable(productsList, elemName, selectDom, isDelete, 1);
                    }
                });
                input.className = "basket__count";


                let plusButton = document.createElement("div");
                plusButton.innerText = "+";
                plusButton.className = "basket__sign basket__plus";

                minusButton.onclick = () => {
                    if(parseInt(input.value) > 1) {
                        input.value--;
                        selectedList[elemId][1] = input.value;
                        // count dom
                        selectedList[elemId][2].parentNode.childNodes[2].value = input.value;
                        updatePrice(selectedList[elemId][2].parentNode.childNodes[4]);
                        updateTotalPrice();
                    }
                    else if(parseInt(input.value) === 1) {
                        removeRow(selectedList[elemId][2].parentNode.childNodes[2]);
                        updateTotalPrice();
                        generateTable(productsList, elemName, selectDom, isDelete, 1);
                    }
                };
                plusButton.onclick = () => {
                    if(parseInt(input.value) < parseInt(Object.values(productsList[elem])[1]) || js_customers[0].orderFlag === "Да"){

                        input.value++;
                        selectedList[elemId][1] = input.value;
                        // count dom
                        selectedList[elemId][2].parentNode.childNodes[2].value = input.value;
                        updatePrice(selectedList[elemId][2].parentNode.childNodes[4]);
                        updateTotalPrice();
                    }
                };


                rowElemCountDom.appendChild(minusButton);
                rowElemCountDom.appendChild(input);
                rowElemCountDom.appendChild(plusButton);

                rowElemDom.appendChild(rowElemCountDom);
                let submit = document.createElement("div");
                submit.className = "basket__send";
                submit.innerHTML = "Перейти в&nbsp;корзину";
                submit.onclick = () => {closeSelectProduct()};
                rowElemDom.appendChild(submit);
            }

            rowDom.appendChild(rowElemDom);
        }

        tableDom.appendChild(rowDom);
    }

}

function selectResult(productList, name, selectDom, currElem, products) {
    if(Object.values(productList)[1] > 0 || js_customers[0].orderFlag === "Да"){
        let btn = currElem.childNodes[3];
        let input = document.createElement("input");
        input.type = "tel";
        input.value = 1;
        input.className = "select-row__count";
        input.addEventListener('focus', () => {
            input.value = null;
        });
        btn.appendChild(input);
        let submit = document.createElement("div");
        submit.innerHTML = "Перейти в&nbsp;корзину";
        btn.appendChild(input);
        getProduct(productList, name, selectDom);
        addProduct(products);
    }
}

function getProduct(productList, name, selectDom) {
    let nameDom = selectDom.parentNode.childNodes[0];
    nameDom.innerText = name;
    selectedList.push([name, 1, selectDom]);

    // hidden product GUID input
    let hiddenGUID = selectDom.parentNode.childNodes[5];
    hiddenGUID.value = Object.values(productList)[0];

    // count input
    let countDom = selectDom.parentNode.childNodes[2];
    countDom.value = 1;

    selectDom.parentNode.childNodes[3].innerText = Object.values(productList)[3];

    if(js_customers[0].orderFlag === "Нет")
        countDom.max = Object.values(productList)[1];
    // price input
    let priceDom = selectDom.parentNode.childNodes[1].childNodes[0];
    priceDom.innerText = Object.values(productList)[2];

    updatePrice(nameDom);
    updateTotalPrice();

}

function removeRow(elem) {
    let parent = elem.parentNode;
    for(let i = 0; i < selectedList.length; i++) {
        if(parent.childNodes[0].innerHTML === selectedList[i][0]) {
            selectedList.splice(i, 1);
        }
    }
    while (parent.lastElementChild) {
        parent.removeChild(parent.lastElementChild);
    }
    parent.remove();
    updateTotalPrice();
    let productBlockDom = document.getElementById("product-block");
    let productsTitleDom = document.getElementById("order-form__title");
    if(productBlockDom.childNodes.length === 1)
        productsTitleDom.classList.add("order-form__title_hidden");
    else
        productsTitleDom.classList.remove("order-form__title_hidden");
}

function updatePrice(elem) {
    var parentDom = elem.parentNode;
    var priceDom = parentDom.childNodes[4].childNodes[0];
    priceDom.innerText = Math.floor(parseFloat(parentDom.childNodes[1].childNodes[0].innerText * parentDom.childNodes[2].value) * 100) / 100;
}

function updateTotalPrice() {
    var totalPriceDom = document.getElementById("total-price");
    var spanDom = totalPriceDom.childNodes[1];
    var productBlockDom = document.getElementById("product-block");
    var sum = 0;

    for (var i = 0; i < productBlockDom.childNodes.length; i++) {
        var rowDom = productBlockDom.childNodes[i];
        rowDom = rowDom.childNodes[4];
        var priceDom = rowDom.childNodes[0];
        sum += parseFloat(priceDom.innerText);
    }

    spanDom.innerText = "";
    spanDom.innerText = Math.floor(sum * 100) / 100;
}


function addressGenerator() {
    var parentGUID = 0;
    var addressDom = document.getElementById("order-form__address");
    for(var i = 0; i < js_customers.length; i++) {
        if(js_customers[i].parent === "" && js_customers[i].login == js_login) {
            if(js_customers[i].address) {
                let addressElemDom = document.createElement("div");
                addressElemDom.innerText = js_customers[i].address;
                addressElemDom.className = "select-address-row";
                addressElemDom.addEventListener("click", () => {changeAddress(addressElemDom.innerText)});
                addressDom.appendChild(addressElemDom);
            }
            for(var j = 0; j < js_customers.length; j++) {
                if(js_customers[j].parent === js_customers[i].GUID && js_customers[j].address !== "") {
                    let addressElemDom = document.createElement("div");
                    addressElemDom.className = "select-address-row";
                    addressElemDom.innerText = js_customers[j].address;
                    addressElemDom.addEventListener("click", () => {changeAddress(addressElemDom.innerText)});
                    addressDom.appendChild(addressElemDom);
                }
            }
            break;
        }
    }
}

function changeAddress(address) {
    var addressHiddenDom = document.getElementById("order-form__address-hidden");
    var addressTextareaDom = document.getElementById("order-form__address-textarea");

    addressHiddenDom.value = address;
    addressTextareaDom.innerText = address;
    closeSelectAddress();
}

// Открыть выбор адреса
function selectAddress() {
    let contentBlockDom = document.getElementById("content-block");
    let selectAddressDom = document.getElementById("select-address");
    contentBlockDom.classList.add("content-block_hidden");
    selectAddressDom.classList.remove("address-block_hidden");
}

// Закрыть выбор адреса
function closeSelectAddress() {
    var hiddenAddressDom = document.getElementById("order-form__address-hidden");
    if(hiddenAddressDom.value !== "") {
        var addressSelectButtonDom = document.getElementById("order-form__address-button");
        addressSelectButtonDom.innerText = "Выбрать другой адрес";
    }
    let contentBlockDom = document.getElementById("content-block");
    let selectAddressDom = document.getElementById("select-address");
    contentBlockDom.classList.remove("content-block_hidden");
    selectAddressDom.classList.add("address-block_hidden");
}