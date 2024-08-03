document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('search').value;
    fetchProducts(query);
});

async function fetchProducts(query) {
    try {
        const response = await fetch(`https://api.mercadolibre.com/sites/MCO/search?q=${encodeURIComponent(query)}`);
        const data = await response.json();

        if (data.results) {
            displayResults(data.results);
        } else {
            displayNoResults();
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        displayError();
    }
}

function displayResults(results) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    results.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'col-md-4 mb-4';
        productDiv.innerHTML = `
            <div class="product">
                <img src="${product.thumbnail}" alt="${product.title}">
                <strong>${product.title}</strong>
                <p>Precio: $${product.price}</p>
                <p>Categoría: ${product.category_id}</p>
                <a href="${product.permalink}" target="_blank" class="btn btn-primary" style="color: black;">Ver en Mercado Libre</a>
            </div>
        `;
        resultsDiv.appendChild(productDiv);
    });
}

function displayNoResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p class="no-results">No se encontraron resultados.</p>';
}

function displayError() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '<p class="no-results">Error al cargar los resultados. Intenta de nuevo.</p>';
}
