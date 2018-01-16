document.addEventListener("DOMContentLoaded", function (event) {

	var paragraph = document.querySelector(".midPage__paragraph")
	const nextS = document.querySelector(".nextS");
	const prevS = document.querySelector(".prevS");
	const sImages = document.querySelectorAll(".slideShowViewContainer img");
	var active = document.querySelector(".active");
	const sViewer = document.querySelector(".slideShowViewContainer");
	const iconBars = document.querySelector(".icon-bars");
	const menu = document.querySelector(".dropdownMenu");
	const menuOptions = document.querySelectorAll(".menuOption");
	var totalTranslate = 0;
	const container = document.querySelector(".container");
	var winWidth = document.body.clientWidth;
	//Get the value without the units of a css variable and divide it by 100 to get a percentage
	var moveXcss = parseInt(getComputedStyle(document.body).getPropertyValue('--moveX')) / 100;
	var moveX = Math.floor(winWidth * moveXcss);
	console.log(moveX);
	var width1 = moveX;
	var width2;
	var showMenu = false;
	
	var offP = winWidth * 0.07;
	var marginParag = offP - paragraph.getBoundingClientRect().left;
	document.documentElement.style.setProperty('--paragraphMargin', `${marginParag}px`);

	
	
	function toggleMenu() {
		if(showMenu) {
			menuOptions.forEach(o => {
				o.classList.remove("menuOption--show");
			});
			showMenu = false;
		} else {
			menuOptions.forEach(o => {
				o.classList.add("menuOption--show");
			});
			showMenu = true;
		}
	}
	
	function hideMenu(e) {
		if (showMenu) {
			if(e.target !== menu && e.target !== iconBars) {
				toggleMenu();
			}
		} else return;
	}
	
	function slideImages() {
		//Get the value without the units of a css variable and divide it by 100 to get a percentage
		moveXcss = parseInt(getComputedStyle(document.body).getPropertyValue('--moveX')) / 100;
		
		winWidth = document.documentElement.clientWidth;
		moveX = Math.floor(winWidth * moveXcss);
		width1 = moveX;
		
		if (this === nextS) {
			if (active.nextElementSibling === null) {
				prevS.style.transform = 'translateX(-30%)';
				prevS.addEventListener("transitionend", () => prevS.style.transform = 'translateX(0)');
				return;
			}

			totalTranslate -= moveX;
			sViewer.style.transform = `translateX(${totalTranslate}px)`;

			active.nextElementSibling.classList.add("active");
			active.classList.remove("active");
			active = document.querySelector(".active");

		} else {
			if (active.previousElementSibling === null) {
				nextS.style.transform = 'translateX(30%)';
				nextS.addEventListener("transitionend", () => nextS.style.transform = 'translateX(0)');
				return;
			}

			totalTranslate += moveX;
			sViewer.style.transform = `translateX(${totalTranslate}px)`;

			active.previousElementSibling.classList.add("active");
			active.classList.remove("active");
			active = document.querySelector(".active");
		}
	}

	
	function reAdjust() {
		//Get the value without the units of a css variable and divide it by 100 to get a percentage
		moveXcss = parseInt(getComputedStyle(document.body).getPropertyValue('--moveX')) / 100;
		
		winWidth = document.documentElement.clientWidth;
		width2 = Math.floor(winWidth * moveXcss);
		
		totalTranslate = (totalTranslate * width2) / width1;
		sViewer.style.transform = `translateX(${totalTranslate}px)`;
		width1 = Math.floor(winWidth * moveXcss);
		
	}
	
	
	iconBars.addEventListener("click", toggleMenu);
	window.addEventListener("click", hideMenu);
	window.addEventListener("resize", reAdjust);
	nextS.addEventListener("click", slideImages);
	prevS.addEventListener("click", slideImages);

});
