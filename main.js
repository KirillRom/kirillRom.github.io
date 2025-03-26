window.addEventListener('load', async () => {
	try {
		if ('serviceWorker' in navigator) {
			const sw = await navigator.serviceWorker.register('./sw.js');
		} else {
			console.log('Service Workers are not supported in this browser.');
		}
	} catch (error) {
		console.log('error', error);
	}
});

const fetchButton = document.getElementById('fetchButton');
const renderList = (list) => {
	list.forEach(pet => {
		const petElement = document.createElement('div');
		petElement.textContent = pet.name;
		document.getElementById('list').appendChild(petElement);
	})
}

const addToCache = async () => {
	console.log('ADDED TO CACHE');

	// const cache = await caches.open('my-cache-v1')
	// await cache.add(['/src/list.js'])
}

fetchButton.addEventListener('click', async () => fetchData('https://petstore3.swagger.io/api/v3/pet/findByStatus?status=available'))

const fetchData = async (url) => {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}
		const data = await response.json();
		renderList(data);
		addToCache()
		return data;
	} catch (error) {
		console.error('Fetch error:', error);
	}
};





