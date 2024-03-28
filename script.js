const burgerBtn = document.querySelector('.burger__btn')
const burgerClose = document.querySelector('.burger__close')
const burgerMenu = document.querySelector('.burger__menu')
const burgerOverlay = document.querySelector('.burger__overlay')
const colorsWrapperMan = document.querySelector('.colors__wrapper.man')
const colorsWrapperWoman = document.querySelector('.colors__wrapper.woman')
const merryedTimer = document.querySelector('.merryed__timer')
const mapBtn = document.querySelector('.map__btn')
const mapWrapper = document.querySelector('.map__wrapper')

import colors from './colors.js'

burgerBtn.addEventListener('click', () => {
	burgerMenu.classList.add('active')
	burgerOverlay.classList.add('active')
})

burgerOverlay.addEventListener('click', () => {
	burgerMenu.classList.remove('active')
	burgerOverlay.classList.remove('active')
})

burgerClose.addEventListener('click', () => {
	burgerMenu.classList.remove('active')
	burgerOverlay.classList.remove('active')
})

mapBtn.addEventListener('click', () => {
	if(mapWrapper.classList.contains('active')) {
		mapWrapper.classList.remove('active')
		mapBtn.children[0].innerHTML = 'Показать карту'
		return
	}
	mapWrapper.classList.add('active')
	mapBtn.children[0].innerHTML = 'Скрыть карту'
})

const creareColors = (array,wrapper) => {
	array.forEach((color) => {
		const div = document.createElement('div')
		div.className = 'colors__color'
		div.style.background = color
		wrapper.insertAdjacentElement('beforeend', div)
	})
}

creareColors(colors.man, colorsWrapperMan)
creareColors(colors.woman, colorsWrapperWoman)

const prepareTime = (time) => {
	if (time < 10) return `0${time}`
	return `${time}`
}


const updateTime = () => {
	const currentTime = new Date().getTime()
	const endTime = new Date('2024-08-10').getTime()
	const diff = (endTime - currentTime) / 1000

	const days = Math.floor((((endTime - currentTime) / 1000) / 60 / 60 / 24))
	const hours = prepareTime(Math.floor((diff / (60 * 60) % 24)))
	const minutes = prepareTime(Math.floor((diff / 60) % 60))
	const seconds = prepareTime(Math.floor(diff % 60) )

	const time = `${days} : ${hours} : ${minutes} : ${seconds}`
	merryedTimer.innerHTML= time
}

setInterval(updateTime, 1000)

