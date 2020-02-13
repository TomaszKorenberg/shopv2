import {cartView} from "./script.js";
import Api from "./api.js";

const api = new Api();

class Cart {
    constructor() {
        this.isModalOpen = false;
        this.link = document.querySelector("#cart-items-link");
        this.link.addEventListener("click", () => {
            if(this.isModalOpen){
                console.log("Modal now is open")
                return;
            }
            else{
            this.modal()
            }
        })
    }

    modal() {
        this.cartModal = document.createElement("div");
        this.cartModal.className = "cart-modal";
        this.cartModal.innerHTML = "<p>" + "Aktualny stan koszyka:" + "</p>";
        this.closeButton = document.createElement("button");
        this.closeButton.innerText = "ⓧ";
        this.closeButton.className = "close-button";
        this.closeButton.addEventListener("click", () => {
            this.cartModal.remove();
            this.isModalOpen = false;
        });
        this.cartModal.appendChild(this.closeButton);
        this.cartModal.appendChild(this.modalTable());
        this.cartModal.appendChild(this.modalButtonOrder());
        this.isModalOpen = true;
        document.documentElement.appendChild(this.cartModal);
    }

    modalTable() {
        this.table = document.createElement("table");
        this.table.appendChild(this.modalTableHeader());
        if (cartView.length > 0) {
            for (let i = 0; i < cartView.length; i++) {
                api.getOne(cartView[i].id).then(res => this.table.appendChild(this.modalTableRow(cartView[i], res)))
            }
        }
        return this.table;
    }

    modalTableRow(cartData, apiData) {
        console.log(cartData);
        console.log(apiData);
        this.cellNames = ["ID", "Name", "Price", "Count"];
        this.tableRow = document.createElement("tr");

        for (let i = 0; i < this.cellNames.length; i++) {
            if (this.cellNames[i] === "ID") {
                this.tableRow.appendChild(this.modalTableCell(this.cellNames[i].toLowerCase(), cartData.id))
            } else if (this.cellNames[i] === "Name") {
                this.tableRow.appendChild(this.modalTableCell(this.cellNames[i].toLowerCase(), apiData.result.data.name))
            } else if (this.cellNames[i] === "Price") {
                this.tableRow.appendChild(this.modalTableCell(this.cellNames[i].toLowerCase(), apiData.result.data.price))
            } else if (this.cellNames[i] === "Count") {
                this.tableRow.appendChild(this.modalTableCell(this.cellNames[i].toLowerCase(), cartData.count))
            }

        }
        this.tableRow.appendChild(this.modalButtonPlus());
        this.tableRow.appendChild(this.modalButtonMinus());
        this.tableRow.appendChild(this.modalButtonRemove());
        //TODO: Jeżeli koszyk puty to wyswietlic informację że jest pusty
        return this.tableRow;
    }

    modalTableHeader() {
        this.tableHeaderRow = document.createElement("tr");
        this.tableHeaderRow.innerHTML = "<th>ID</th> <th>Name</th>Price<th>Count:</th>";
        return this.tableHeaderRow;
    }

    modalTableCell(cellName, cellData) {
        this.tableCell = document.createElement("td");
        this.tableCell.className = cellName;
        this.tableCell.innerText = cellData;
        return this.tableCell;
    }

    modalButtonPlus(){
        this.plusButton = document.createElement("button");
        this.plusButton.innerText = "+";
        this.plusButton.addEventListener("click", () => {
            console.log("Dodaj produkt");
            console.log(cartView);
            //TODO: Dodawanie produktu w koszyku
        });
        return this.plusButton
    }
    modalButtonMinus(){
        this.minusButton = document.createElement("button");
        this.minusButton.innerText = "-";
        this.minusButton.addEventListener("click", () => {
            console.log("Odejmij produkt");
            //TODO: Odejmowanie produktu z koszyka

        });
        return this.minusButton
    }
    modalButtonOrder(){
        this.orderButton = document.createElement("button");
        this.orderButton.innerText = "Zamow";
        this.orderButton.addEventListener("click", () => {
            console.log("Przycisk zamow");
            //TODO: Przejcie do zamowien
        });
        return this.orderButton
    }
    modalButtonRemove(){
        this.removeButton = document.createElement("button");
        this.removeButton.innerText = "Usun";
        this.removeButton.addEventListener("click", () => {
            console.log("Usuń produkt i usuń go z modala");
        });
        return this.removeButton
    }
}

export default Cart;