const addButton = document.getElementById('add-button');

addButton.addEventListener('click', async ()=>{
    
    const nameInput = document.getElementById("productName");
    const categoryInput = document.getElementById("productCategory");
    const priceInput = document.getElementById("productPrice");
    const quantityInput = document.getElementById("productQuantity");

    const name = nameInput.value;
    const category = categoryInput.value;
    const price = parseFloat(priceInput.value);
    const quantity = parseInt(quantityInput.value);

    if (!name || !category || isNaN(price) || isNaN(quantity)) {
        alert("Fyll i alla fält korrekt!");
        return;
    }

    const newProduct = { name, category, price, quantity };

    try {
        await fetch(`http://localhost:3000/product`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newProduct)
        });

        nameInput.value = "";
        categoryInput.value = "";
        priceInput.value = "";
        quantityInput.value = "";

        setTimeout(async () => {
            await fetchProducts();
        }, 600);

    } catch (error) {
        console.error("Kunde inte skapa produkt:", error);
    }
});


async function fetchProducts() {
    try {
        const response = await fetch(`http://localhost:3000/products`);
        const data = await response.json();
        
        const list = document.getElementById("product-list");
        list.innerHTML = data.map(product => `
            <tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price} SEK</td>
                <td>${product.quantity} St</td>
            </tr>
        `).join("");
    } catch (error) {
        console.error("Kunde inte hämta produkter:", error);
    }
}

fetchProducts();