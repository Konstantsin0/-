document.addEventListener('DOMContentLoaded', (event) => {
    // Получаем id товара из URL
    const url = new URLSearchParams(window.location.search);
    const id = url.get('id');

    fetch('/products.xml')
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        // Находим товар с нужным id
        const product = Array.from(data.getElementsByTagName('product')).find(product => product.getElementsByTagName('id')[0].textContent === id);

        // Заполняем информацию о товаре на странице
        document.querySelector('.main-product-image').src = product.getElementsByTagName('main-image')[0].textContent;
        document.querySelector('.product-info-title').textContent = product.getElementsByTagName('information-title')[0].textContent;
        document.querySelector('.product-description-title').textContent = product.getElementsByTagName('description-title')[0].textContent;
        document.querySelector('.product-description-text').textContent = product.getElementsByTagName('description-text')[0].textContent;
        document.querySelector('.order-link').href = product.getElementsByTagName('order-button')[0].textContent;

        const productImagesInner = document.querySelector('.product-images-inner');
        const productInfoInner = document.querySelector('.product-info-inner');
       
        Array.from(product.getElementsByTagName('image')).forEach(function(image) {
            const img = document.createElement('img');
            
            img.src = image.textContent;
            img.alt = 'product-image';
            img.className = 'product-image';
            productImagesInner.appendChild(img);
        });
        
        Array.from(product.getElementsByTagName('information-line')).forEach(function(informationLine) {
            const div = document.createElement('div');
           
            div.className = 'product-info-inner-line';
            div.innerHTML = `
                <p class="product-info-inner-title">${informationLine.getElementsByTagName('information-line-title')[0].textContent}</p>
                <p class="product-info-inner-text">${informationLine.getElementsByTagName('information-line-text')[0].textContent}</p>
            `;
            productInfoInner.appendChild(div);
        });
    });
});
