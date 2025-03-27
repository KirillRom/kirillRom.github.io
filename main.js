window.addEventListener('load', async () => {
	try {
		// Проверка поддержки Service Worker
		if ('serviceWorker' in navigator) {
			// Регистрация Service Worker
			await navigator.serviceWorker.register('./sw.js');
		} else {
			console.log('Service Workers are not supported in this browser.');
		}
	} catch (error) { // Обработка ошибок если не получилось зарегистрировать Service Worker
		console.log('error', error);
	}
});

// Получение селектора кнопки
const fetchButton = document.getElementById('fetchButton');

// Добавление обработчика события на кнопку
fetchButton.addEventListener('click', async () => fetchData('https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available'))

// Рендер списка
const renderList = (list) => {
	const listParent = document.getElementById('list')
	listParent.innerHTML = ''

	if(!list || !list.length) {
		console.log('No data');

		const srt = `
		<div class="list__item">
			<div class="list__item__title">No data</div>
		</div>`
		listParent.insertAdjacentHTML('beforeend', srt)
		return
	}
	list.forEach(pet => {
		const srt = `
		<div class="list__item">
			<div class="list__item__title">ID: <span>${pet.id}</span></div>
			<div class="list__item__title">Name: <span>${pet.name}</span></div>
		</div>`
		listParent.insertAdjacentHTML('beforeend', srt)

	})
}

const getToCache = async () => {
	console.log('GET TO CACHE');
	const cache = await caches.open('dynamic-cache')
	const response = await cache.match('https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available')
	const data = await response.json();
	console.log(data);
}

// Запрос на получение данных и рендер
const fetchData = async (url) => {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		renderList(data);
		getToCache()
		return data;
	} catch (error) {
		renderList([]);
		console.error('Fetch error:', error);
	}
};




