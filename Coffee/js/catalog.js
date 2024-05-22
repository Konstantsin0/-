// Дожидаемся загрузки страницы
document.addEventListener('DOMContentLoaded', (event) => {
    // Загружаем XML-файл
    fetch('/catalog.xml')
    .then(response => response.text())
    .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
    .then(data => {
        console.log(data);
    
        // Функция для загрузки данных из XML в HTML
        const loadDataXml = (section, preCatalog) => {
            // Получаем все продукты из pre-catalog и находим контейнер для продуктов в текущей секции
            const products = preCatalog.getElementsByTagName('product');
            const productContainer = section.querySelector('.product-container');
            
            for(let i = 0; i < products.length; i++) {
                 // Получаем данные продукта из XML
                const product = products[i];
                const image = product.getElementsByTagName('image')[0].textContent;
                const title = product.getElementsByTagName('title')[0].textContent;
                const info = Array.from(product.getElementsByTagName('info')).map(info => info.textContent);
                const cost = product.getElementsByTagName('cost')[0].textContent;
                const button = product.getElementsByTagName('button')[0].textContent;
                const productId = product.getElementsByTagName('id')[0].textContent;
                // Создаем HTML-элемент для продукта
                const productElement = document.createElement('div');
                productElement.className = 'product';
                productElement.innerHTML = `
                    <img src="${image}" alt="product-image">
                    <h3 class="product-title">${title}</h3>
                    ${info.map(i => `<p class="product-info">${i}</p>`).join('')}
                    <p class="product-cost">${cost}</p>
                    <a href="${button}.html?id=${productId}" class="product-link">Подробнее</a>
                `;
                // Добавляем элемент продукта в контейнер продуктов
                productContainer.appendChild(productElement);
            }
        }            
        // Получаем все секции на странице
        const sections = Array.from(document.querySelectorAll('.catalog-coffee'));
         // Получаем все pre-catalog из XML-данных
        const preCatalogs = Array.from(data.getElementsByTagName('pre-catalog'));
        
        // Загружаем данные из каждого pre-catalog в соответствующую секцию
        sections.forEach((section, index) => {
            loadDataXml(section, preCatalogs[index]);
        });

    });
});
