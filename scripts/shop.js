import Api from "./api.js";
const api = new Api();


class Shop {

    constructor() {
        this.cart = [];

    }

    buyAndReloadElement(data){

        function reload (productId){
            let reloadCount = ""
            reloadCount = document.querySelector("#product-"+data._id+"-count-div")
            api.getOne(productId).then(res => reloadCount.innerText = "Dostępna ilośc: " + res.result.data.count + " szt.")
        }
        api.buy(data._id, {count: document.querySelector("#add-to-cart-input" + data._id).value})
            .then(res => reload(res.result.id))

    }

    itemsInCartShowing(cart) {
        this.numberOfItems = document.querySelector("#cart-items-number")
        this.numberOfItems.innerText = cart.length
    }

    isProductInCart(data, cart) {
        let isProduct = false;
        if (cart.length === 0) {
            //console.log("Koszyk jest pusty - dodaj pierwszy produkt")
            return isProduct
        } else {
            if (cart.find(el => el.id === data._id) === undefined) {
                //console.log("W koszyku nie ma tego produktu - dadaj produkt")
                return isProduct
            } else {
                //console.log("W koszyku jest ten produkt - podmien ilośc")
                return isProduct = true;
            }
        }
    }

    findProductIndexInCart(data, cart) {
        this.productIndex = cart.findIndex(el => el.id === data._id)
        return this.productIndex
    }


    addToCart(data) {
        if (data.data.count <= 0){
            //FIXME: Jeżeli jest jeden produkt i klikniemu kup 2 lub klikniemy 2x kup to wchodzi naminus

            console.log("Nie ma wiecej tego produktu!")
            console.log("")
            console.log(document.querySelector("#product-"+data._id+"-count-div"))
            //TODO: Wywietlic modal z informacją o braku produktu
        }

        else if (this.isProductInCart(data, this.cart) === false) {
            this.cart.push({
                id: data._id,
                count: document.querySelector("#add-to-cart-input" + data._id).value
            })
            this.itemsInCartShowing(this.cart)
            this.buyAndReloadElement(data)

        } else {
            this.productIndex = this.findProductIndexInCart(data, this.cart)
            this.cart[this.productIndex].count = parseInt(this.cart[this.productIndex].count) + parseInt(document.querySelector("#add-to-cart-input" + data._id).value)
            this.buyAndReloadElement(data)
        }


    }

    /**
     * Product detail list
     * @param one product data
     */
    detailList(data) {
        this.productDiv.appendChild(this.idDivBuilder(data));
        this.productDiv.appendChild(this.nameDivBuilder(data));
        this.productDiv.appendChild(this.countDivBuilder(data));
        this.productDiv.appendChild(this.priceDivBuilder(data));
        this.productDiv.appendChild(this.addToCartDivBuilder(data));
    }

    /**
     * @param all products data
     * @returns <div> with product details
     */
    productDivBuilder(data) {
        this.productDiv = '';
        this.productDiv = document.createElement("div");
        this.detailList(data)
        return this.productDiv
    }
    ;

    /**
     * @param one product data
     * @returns <div> with product ID
     */
    idDivBuilder(data) {
        this.idDiv = "";
        this.idDiv = document.createElement("div");
        this.idDiv.innerText = "ID: " + data._id;
        this.idDiv.className = "product-id-div"
        return this.idDiv;
    }

    /**
     * @param one product data
     * @returns <div> with product name
     */
    nameDivBuilder(data) {
        this.nameDiv = "";
        this.nameDiv = document.createElement("div");
        this.nameDiv.innerText = "Nazwa: " + data.data.name;
        this.nameDiv.className = "product-name-div"
        return this.nameDiv;
    }

    /**
     * @param one product data
     * @returns <div> with product count
     */
    countDivBuilder(data) {
        this.countDiv = "";
        this.countDiv = document.createElement("div");
        this.countDiv.innerText = "Dostępna ilośc: " + data.data.count + " szt.";
        this.countDiv.className = "product-count-div"
        this.countDiv.id = "product-"+data._id+"-count-div"
        return this.countDiv;
    }

    /**
     * @param one product data
     * @returns <div> with product price
     */
    priceDivBuilder(data) {
        this.priceDiv = "";
        this.priceDiv = document.createElement("div");
        this.priceDiv.innerText = "Cena: " + data.data.price + " zł";
        this.priceDiv.className = "product-price-div"
        return this.priceDiv;
    }

    /**
     * @returns add to cart <input>
     */
    addToCartInputBuilder(data) {
        this.addToCartInput = document.createElement("input");
        this.addToCartInput.type = "number";
        this.addToCartInput.step = "1";
        this.addToCartInput.value = "1";
        this.addToCartInput.className = "add-to-cart-input";
        this.addToCartInput.id = "add-to-cart-input" + data._id
        return this.addToCartInput;
    }

    /**
     * @returns add to cart <button>
     */
    addToCartButtonBuilder(data) {

        this.addToCartButton = document.createElement("button");
        this.addToCartButton.innerText = "Dodaj do koszyka";
        this.addToCartButton.className = "add-to-cart-button";
        this.addToCartButton.addEventListener("click", () => {
            this.addToCart(data)
        })
        return this.addToCartButton
    }

    /**
     * @param one product data
     * @returns <div> with numbers of product to cart & add to cart button
     */
    addToCartDivBuilder(data) {
        this.addToCartDiv = "";
        this.addToCartDiv = document.createElement("div");
        this.addToCartDiv.appendChild(this.addToCartInputBuilder(data));
        this.addToCartDiv.appendChild(this.addToCartButtonBuilder(data));
        this.addToCartDiv.className = "product-add-to-cart-div";
        return this.addToCartDiv;
    }

    /**
     * Show all products from database
     * @param all data from database
     */
    showAllProducts(data) {
        this.allProductsDiv = "";
        this.allProductsDiv = document.querySelector("#all-products");
        for (let i = 0; i < data.length; i++) {
            //TODO: Jeżeli produkt jest <= 0 to nie wyswietlaj
            this.product = this.productDivBuilder(data[i]);
            this.product.id = "product-" + data[i]._id;
            this.product.className = "product-div";
            this.allProductsDiv.appendChild(this.product)
        }
    }

}
export default Shop;


