document.addEventListener("DOMContentLoaded", function() {
    sezioneNovitaEInEvidenza = document.querySelector('#elenco-pannello1');
    sezioneUomo = document.querySelector('#elenco-pannello2');
    sezioneDonna = document.querySelector('#elenco-pannello3');
    sezioneKids = document.querySelector('#elenco-pannello4');
    sezioneOutlet = document.querySelector('#elenco-pannello5');

    const novitaEInEvidenzaLink = document.querySelector('#navbar2-C a:first-child');
    novitaEInEvidenzaLink.addEventListener('mouseenter', function() {
        closePanels();
        sezioneNovitaEInEvidenza.style.display = 'block';
    });
    sezioneNovitaEInEvidenza.addEventListener('mouseleave', function() {
        sezioneNovitaEInEvidenza.style.display = 'none';
    });

    const uomoLink = document.querySelector('#navbar2-C a:nth-child(2)');
    uomoLink.addEventListener('mouseenter', function() {
        closePanels();
        sezioneUomo.style.display = 'block';
    });
    sezioneUomo.addEventListener('mouseleave', function() {
        sezioneUomo.style.display = 'none';
    });

    const donnaLink = document.querySelector('#navbar2-C a:nth-child(3)');
    donnaLink.addEventListener('mouseenter', function() {
        closePanels();
        sezioneDonna.style.display = 'block';
    });
    sezioneDonna.addEventListener('mouseleave', function() {
        sezioneDonna.style.display = 'none';
    });

    const kidsLink = document.querySelector('#navbar2-C a:nth-child(4)');
    kidsLink.addEventListener('mouseenter', function() {
        closePanels();
        sezioneKids.style.display = 'block';
    });
    sezioneKids.addEventListener('mouseleave', function() {
        sezioneKids.style.display = 'none';
    });

    const outletLink = document.querySelector('#navbar2-C a:nth-child(5)');
    outletLink.addEventListener('mouseenter', function() {
        closePanels();
        sezioneOutlet.style.display = 'block';
    });
    sezioneOutlet.addEventListener('mouseleave', function() {
        sezioneOutlet.style.display = 'none';
    });
}); 

function closePanels() {
    sezioneNovitaEInEvidenza.style.display = 'none';
    sezioneUomo.style.display = 'none';
    sezioneDonna.style.display = 'none';
    sezioneKids.style.display = 'none';
    sezioneOutlet.style.display = 'none';
}


/******* Cambio immagine preferito al click *******/
document.addEventListener("DOMContentLoaded", function() {
    const hearts = document.querySelectorAll('.img-preferito');

    hearts.forEach(function(heart) {
        heart.addEventListener('click', function() {
            if (heart.src.includes('immagini/preferiti.png')) {
                heart.src = 'immagini/preferito-pieno.png';
            } else {
                heart.src = 'immagini/preferiti.png';
            }
        });
    });
});


/******* Gestione carrello *******/
document.addEventListener("DOMContentLoaded", function() {
    let object = document.querySelector('#img-cart');
    let tendinaCarrello = document.querySelector('#carrello .tendinaCarrello'); 

    object.addEventListener("click", function() {
        tendinaCarrello.style.display = 'flex';   
    });
 
    const exit=document.getElementById('exit');
    exit.addEventListener("click", function() {
        tendinaCarrello.style.display = 'none';   
    });
});

let totalPriceCart = 0;

class Cart {
    constructor(cartItemsContainer, totalValueSpan) {
        this.cartItemsContainer = cartItemsContainer;
        this.totalValueSpan = totalValueSpan;
        this.totalPrice = 0;
        this.cartItems = [];

        this.init();
    }

    init() {
        this.setupEventListeners();
        this.updateTotalValue();
    }

    setupEventListeners() {
        this.cartItemsContainer.addEventListener('click', this.handleCartClick.bind(this));
        this.cartItemsContainer.addEventListener('change', this.handleQuantityChange.bind(this));
    }

    handleCartClick(event) {
        if (event.target.classList.contains('remove-object')) {
            this.removeCartItem(event.target.parentElement);
        }
    }

    handleQuantityChange(event) {
        if (event.target.classList.contains('object-quantity')) {
            const quantity = parseInt(event.target.value) || 1;
            event.target.value = quantity;
            this.updateCartItem(event.target.closest('.object'), quantity);
        }
    }

    addCartItem(productName, productPrice, imageSrc) {
        const existingCartItem = this.cartItems.find(item => item.name === productName);
    
        if (existingCartItem) {
            const quantityInput = this.cartItemsContainer.querySelector(`.object[data-name="${productName}"] .object-quantity`);

        } else {
            const newItem = {
                name: productName,
                price: productPrice,
                quantity: 1,
                imageSrc: imageSrc
            };
            this.cartItems.push(newItem);
            this.renderCartItem(newItem);
        }
    
        this.totalPrice += productPrice;
        this.updateTotalValue();
        totalPriceCart = this.totalPrice; 
    }
    
    updateCartItem(cartItemElement, quantity) {
        const itemName = cartItemElement.querySelector('.object-name').textContent;
        const index = this.cartItems.findIndex(item => item.name === itemName);
        const item = this.cartItems[index];

        const priceDifference = (item.price * quantity) - (item.price * item.quantity);
        this.totalPrice += priceDifference;

        item.quantity = quantity;

        cartItemElement.querySelector('.object-price').textContent = '€' + (item.price).toFixed(2);

        this.updateTotalValue();
        totalPriceCart = this.totalPrice;
    }

    removeCartItem(cartItemElement) {
        const index = this.cartItems.findIndex(item => item.name === cartItemElement.querySelector('.object-name').textContent);
        const removedItem = this.cartItems.splice(index, 1)[0];
        this.totalPrice -= removedItem.price * removedItem.quantity;
        cartItemElement.remove();
        this.updateTotalValue();
        totalPriceCart = this.totalPrice;
    }

    renderCartItem(cartItem) {
        const cartItemHTML = `
            <div class="object">
                <img class="object-img" src="${cartItem.imageSrc}">
                <span class="object-name">${cartItem.name}</span>
                <span class="object-price">€${(cartItem.price * cartItem.quantity).toFixed(2)}</span>
                <div class="quantity-box">
                    <span class="quantity-box-text">Q.tà</span>
                    <input class="object-quantity" type="number" value="${cartItem.quantity}">
                </div>
                <img class="remove-object" src="immagini/rimuovi.png">
            </div>
        `;
        this.cartItemsContainer.insertAdjacentHTML('beforeend', cartItemHTML);
    }

    updateTotalValue() {
        this.totalValueSpan.textContent = '€' + this.totalPrice.toFixed(2);
        totalPriceCart = this.totalPrice; 
    }
}

document.addEventListener("DOMContentLoaded", function() {
    const addToCartButtons = document.querySelectorAll('.buttonAddToCart');
    const cartItemsContainer = document.getElementById('object-list');
    const totalValueSpan = document.getElementById('prezzo-totale');

    const cart = new Cart(cartItemsContainer, totalValueSpan);

    addToCartButtons.forEach(button => {
        button.addEventListener('click', event => {
            event.preventDefault();
            const productContainer = event.target.closest('.BoxInterno2');
            const productName = productContainer.querySelector('.info-scarpa #scarpa').textContent;
            const productPrice = parseFloat(productContainer.querySelector('#prezzo p').textContent);
            const productImageSrc = productContainer.querySelector('#img-scarpa').src;
            cart.addCartItem(productName, productPrice, productImageSrc);
            
        });
    });
});



/******* Menù laterale mobile ******/
document.addEventListener("DOMContentLoaded", function() {
    let item = document.querySelector('#Hamburger-icon');
    item.addEventListener("click", function() {
        document.body.classList.toggle('menu-open');
    });
});


/****** Tooltip Nike ******/
document.addEventListener("DOMContentLoaded", function() {
    const image = document.querySelector('#Nike');
    const tooltipText = image.getAttribute('data-text');
    const tooltip = document.createElement('div');
    tooltip.classList.add('tooltip');
    tooltip.textContent = tooltipText;
    document.body.appendChild(tooltip);

    image.addEventListener('mouseenter', function() {
        tooltip.style.display = 'block';
    });

    image.addEventListener('mousemove', function(e) {
        updateTooltipPosition(e);
    });

    image.addEventListener('mouseleave', function() {
        tooltip.style.display = 'none';
    });

    function updateTooltipPosition(e) {
        const xOffset = 20;
        const yOffset = 10;

        let x = e.clientX + xOffset;
        let y = e.clientY + yOffset;


        tooltip.style.left = x + 'px';
        tooltip.style.top = y + 'px';
    }
});


/***** Login *******/
document.addEventListener("DOMContentLoaded", function() {
    var accediLink = document.getElementById("accedi-link");
    var accessoDiv = document.getElementById("accesso-div");

    accediLink.addEventListener("click", function(event) {
        event.preventDefault();
        accessoDiv.style.display = "block";
    });

    window.addEventListener("click", function(event) {
        if (event.target === accessoDiv) {
            accessoDiv.style.display = "none";
        }
    });
});



/**** API PayPal *******/

const client_id = "XXXXX";
const client_secret = "YYYYYYY";
const environment = 'sandbox';
const endpoint_url = environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';

const generateAccessToken = async () => {
    try {
        const response = await fetch(`${endpoint_url}/v1/oauth2/token`, {
            method: "POST",
            body: "grant_type=client_credentials",
            headers: {
                "Authorization": `Basic ${btoa(client_id + ":" + client_secret)}`
            },
        });
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error("Failed to generate Access Token:", error);
    }
};

const createOrder = async () => {
    try {
        const accessToken = await generateAccessToken();
        const url = `${endpoint_url}/v2/checkout/orders`;
        const payload = {
            intent: "CAPTURE",
            purchase_units: [
                {
                    amount: {
                        currency_code: "EUR",
                        value: totalPriceCart,
                    },
                },
            ],
        };

        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
            method: "POST",
            body: JSON.stringify(payload),
        });

        const jsonResponse = await response.json();
        console.log(jsonResponse);
        
        window.location.href = `https://www.sandbox.paypal.com/checkoutnow?token=${jsonResponse.id}`;
    } catch (error) {
        console.error("Failed to create order:", error);
    }
};

document.addEventListener("DOMContentLoaded", function() {
    const payButton = document.querySelector('#Acquista-btn');
    payButton.addEventListener('click', createOrder);
});



/**Carrello Mobile**/
document.addEventListener("DOMContentLoaded", function() {
    let object = document.querySelector('#img-cart-mobile');
    let tendinaCarrello = document.querySelector('#carrello .tendinaCarrello'); 

    object.addEventListener("click", function() {
        tendinaCarrello.style.display = 'flex';   
    });
 
    const exit=document.getElementById('exit');
    exit.addEventListener("click", function() {
        tendinaCarrello.style.display = 'none';   
    });
});



/** Cambio Valuta API**/

document.addEventListener("DOMContentLoaded", function() {
    const exchangeSelect = document.querySelectorAll(".CurrencyExchangeContainer .currency");
    const exchangeBtn = document.getElementById("CurrencyExchange-btn");
    const exchangeInput = document.getElementById("currencyInput");
    const exchangeOutput = document.getElementById("currencyOutput");

    fetch("https://api.frankfurter.app/currencies")
        .then((data) => data.json())
        .then((data) => {
            displayExchange(data);
        });

    function displayExchange(data) {
        const entries = Object.entries(data);
        for (var i = 0; i < entries.length; i++) {
            exchangeSelect[0].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
            exchangeSelect[1].innerHTML += `<option value="${entries[i][0]}">${entries[i][0]}</option>`;
        }
    }

    exchangeBtn.addEventListener("click", () => {
        let currency1 = exchangeSelect[0].value;
        let currency2 = exchangeSelect[1].value;
        let value = exchangeInput.value;

        if (currency1 !== currency2) {
            convertExchange(currency1, currency2, value);
        } else {
            alert("Stai provando a convertire il valore nella stessa valuta!");
        }
    });

    function convertExchange(currency1, currency2, value) {
        const host = "api.frankfurter.app";
        fetch(
                `https://${host}/latest?amount=${value}&from=${currency1}&to=${currency2}`
            )
            .then((val) => val.json())
            .then((val) => {
                exchangeOutput.value = Object.values(val.rates)[0];
            });
    }
});


document.addEventListener("DOMContentLoaded", function() {
    const currencyExchangeImg = document.getElementById("CurrencyExchange");
    const currencyExchangeContainer = document.querySelector(".CurrencyExchangeContainer");

    currencyExchangeImg.addEventListener("click", function() {
        currencyExchangeContainer.style.display = "block";
    });

    const exit = document.getElementById('ExchangeExit');
    exit.addEventListener("click", function() {
        currencyExchangeContainer.style.display = 'none';   
    });
});
