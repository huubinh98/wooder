const btnBar = document.querySelector(".btnbar");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");

function setNavHeader() {
	btnBar.addEventListener("click", function () {
		this.classList.toggle("clicked");
		nav.classList.toggle("active");
		header.classList.toggle("activebg");
		// if()
	});

	window.addEventListener("resize", function () {
		let clienWidth = nav.clientWidth;
		// let winSize = window.innerWidth;
		if (clienWidth >= 975) {
			nav.classList.remove("active");
			btnBar.classList.remove("clicked");
			header.classList.remove("activebg");
		}
	});
}

// scroll slider -> header
function setSliderActive() {
	let slider = document.querySelector(".slider");
	let heightHeader = header.clientHeight;
	let heightSlider = slider.clientHeight;

	window.addEventListener("scroll", function () {
		let scrollY = window.pageYOffset;
		if (scrollY > heightSlider - heightHeader) {
			header.classList.add("activebg");
		} else {
			header.classList.remove("activebg");
		}
	});
}

// function changeScroll() {
//     let scrollY = window.pageYOffset;
//     if(scrollY > heightSlider - heightHeader) {
//         header.classList.add("activebg");
//     }else {
//         header.classList.remove("activebg");
//     }
// }

// window.addEventListener('scroll', changeScroll);

// let btnSlider = document.querySelector("#btn");
// //  heightBtn = btnSlider.offsetHeight;
//     console.log({btnSlider})

//    let heightTop = btnSlider.offsetTop;

// console.log(heightTop)
// function eScroll() {

//     console.log("heightTop",heightTop);
//     let scrollY = window.pageYOffset;
//     if (scrollY > heightTop - heightBtn) {
//         header.classList.add("activebg");
//     } else {
//         header.classList.remove("activebg");
//     }
// }
// window.addEventListener('scroll', eScroll);

// const btnSlider = document.querySelector('#btn')

// window.addEventListener('scroll', function() {
//     const btnOffsetTop = btnSlider.getBoundingClientRect().top
//     console.log({btnOffsetTop})
// })

// back to top
function handleBackToTop() {
	let backToTop = document.querySelector(".toback #backtotop");
	backToTop.addEventListener("click", function () {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	});
}

// lang
function langEvent() {
	let lang = document.querySelector(".lang");
	let langCurrent = document.querySelector(".lang_current");
	let langItems = document.querySelectorAll(".lang_options a");

	langCurrent.addEventListener("click", function (e) {
		e.stopPropagation();
		lang.classList.toggle("active");
	});
	langItems.forEach(function (item) {
		item.onclick = function (e) {
			e.preventDefault();
			let current = langCurrent.innerText;
			let langItem = item.innerText;
			item.innerHTML = current;
			langCurrent.innerHTML = langItem;
		};
	});

	window.addEventListener("click", function () {
		lang.classList.remove("active");
	});
}

// Quantity
function handleVideo() {
	let qttimg = document.querySelectorAll(".quantity_img");
	let playBtn = document.querySelectorAll(".btn-play");
	let videoModal = document.querySelector(".videomodal");
	let iframe = document.querySelector(".videomodal iframe");
	let close = document.querySelector(".close");

	let attIds = [];

	function handlePlay(dataId) {
		videoModal.style.display = "flex";
		iframe.setAttribute(
			"src",
			"https://www.youtube.com/embed/" + dataId + "?autoplay=1"
		); // + '?autoplay=1'
	}

	function removeVd() {
		videoModal.style.display = "none";
		iframe.setAttribute("src", "");
	}

	qttimg.forEach((qttItem) => {
		attIds.push(qttItem.getAttribute("data-id"));
		qttItem.addEventListener("click", (e) => {
			e.stopPropagation();
			handlePlay(qttItem.getAttribute("data-id"));
		});
	});

	playBtn.forEach(function (playitem, indexbtn) {
		playitem.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation();
			handlePlay(attIds[indexbtn]);
		});
	});

	close.addEventListener("click", function () {
		removeVd();
	});

	window.addEventListener("click", function () {
		removeVd();
	});
}

// event scroll menu
function scrollMenuEvent() {
	let menuItems = document.querySelectorAll(".menu_item a");
	let heightHeader = header.offsetHeight;
	let sections = [];

	function remove() {
		menuItems.forEach((item) => item.classList.remove("active"));
	}
	menuItems.forEach(function (menuItem) {
		let atrMenuItem = menuItem.getAttribute("href");
		let classSection = atrMenuItem.replace("#", "");
		let section = document.querySelector("." + classSection);
		sections.push(section);
		menuItem.addEventListener("click", function (e) {
			e.preventDefault();
			remove();
			// document.querySelector(".active").classList.remove("active");
			this.classList.add("active");
			document.documentElement.scrollTop = section.offsetTop - heightHeader + 1;

			// window.scrollTo({
			//     top: section.offsetTop - heightHeader
			// })

			// if (index == 0) {
			//     document.querySelector(".active").classList.remove("active");
			//     this.classList.add("active");
			//     document.documentElement.scrollTop = 0;
			// } else {
			//     // menuItems.forEach(function(item) {
			//     //     item.classList.remove("active");
			//     // })
			//     document.querySelector(".active").classList.remove("active");
			//     this.classList.add("active");
			//     document.documentElement.scrollTop = section - heightHeader;
			// }
		});
	});

	//Event scroll
	window.addEventListener("scroll", function () {
		let scrollY = window.pageYOffset;
		sections.forEach(function (section, index) {
			let sTop = section.offsetTop;
			let sHeight = section.offsetHeight;
			if (scrollY > sTop - heightHeader && scrollY < sTop + sHeight) {
				// document.querySelector(".active").classList.remove("active");
				remove();
				menuItems[index].classList.add("active");
			} else {
				menuItems[index].classList.remove("active");
			}
		});
	});
}

window.addEventListener("load", function () {
	let sliderList = document.querySelector(".slider_list");
	let sliderItems = document.querySelectorAll(".slider_item");

	// button
	let nextBtn = document.querySelector(".--next");
	let prewBtn = document.querySelector(".--prew");

	// number
	let number = document.querySelector(".paging .paging_num");
	let dotted = document.querySelectorAll(".dotted li");

	let sliderWidth = sliderItems[0].offsetWidth;
	let postionX = 0;
	let currentIndex = 0;
	dotted[currentIndex].classList.add("active");

	nextBtn.addEventListener("click", function () {
		handleChangeSlide(1);
	});

	prewBtn.addEventListener("click", function () {
		handleChangeSlide(-1);
	});

	function handleChangeSlide(direction) {
		if (direction == 1) {
			if (currentIndex >= sliderItems.length - 1) {
				currentIndex = -1;
				postionX = 0;
				sliderList.style = `transform: translateX(${postionX}px)`;
			} else {
				postionX = postionX - sliderWidth;
				sliderList.style = `transform: translateX(${postionX}px)`;
			}
			currentIndex++;
			showNumber(currentIndex + 1);
			dotActive();
		} else if (direction == -1) {
			currentIndex--;
			console.log(currentIndex);
			if (currentIndex < 0) {
				currentIndex = sliderItems.length - 1;
				postionX = -currentIndex * sliderWidth;
				sliderList.style = `transform: translateX(${postionX}px)`;
			} else {
				postionX = postionX + sliderWidth;
				sliderList.style = `transform: translateX(${postionX}px)`;
			}
			showNumber(currentIndex + 1);
			dotActive();
		}
	}

	function showNumber(indexNum) {
		number.innerHTML = indexNum.toString().padStart(2, "0");
	}
	showNumber(currentIndex + 1);

	function dotActive() {
		dotted.forEach((liItem) => {
			liItem.classList.remove("active");
		});
		dotted[currentIndex].classList.add("active");
	}

	dotted.forEach((itemDot) => {
		itemDot.addEventListener("click", (e) => {
			console.log(e);
			dotted.forEach((liItem) => {
				liItem.classList.remove("active");
			});
			e.target.classList.add("active");
			const sliderIndex = parseInt(e.target.dataset.index);
			currentIndex = sliderIndex;
			showNumber(currentIndex + 1);
			postionX = -currentIndex * sliderWidth;
			sliderList.style = `transform: translateX(${postionX}px)`;
		});
	});
});

// window.addEventListener("load", () => {
//     const carouselSlider = document.querySelector(".slider_list");
//     const carouselItem = document.querySelectorAll(".slider_item");

//     // button
//     const prewBtn = document.querySelector(".--prew");
//     const nextBtn = document.querySelector(".--next");

//     let currentIndex = 1;
//     const size = carouselItem[0].offsetWidth;

//     let postionX = -size * currentIndex;
//     carouselSlider.style.transform = `translateX(${postionX}px)`;

//     nextBtn.addEventListener("click", () => {
//         if (currentIndex >= carouselItem.length - 1) return;
//         currentIndex++;
//         carouselSlider.style = `transition: transform 0.5s linear`;
//         postionX = -size * currentIndex;
//         carouselSlider.style.transform = `translateX(${postionX}px)`;
//     })

//     prewBtn.addEventListener("click", () => {
//         if (currentIndex <= 0) return;
//         carouselSlider.style = `transition: transform 0.5s linear`;
//         currentIndex--;
//         console.log(currentIndex);
//         postionX = -size * currentIndex;
//         carouselSlider.style.transform = `translateX(${postionX}px)`;
//     })

//     carouselSlider.addEventListener("transitionend", () => {
//         if (carouselItem[currentIndex].id === 'lastSlider') {
//             carouselSlider.style = `transition: none`;
//             currentIndex = carouselItem.length - 2;
//             postionX = -size * currentIndex;
//             carouselSlider.style.transform = `translateX(${postionX}px)`;
//         }
//         if (carouselItem[currentIndex].id === 'firstSlider') {
//             console.log(carouselItem[currentIndex].id);
//             carouselSlider.style = `transition: none`;
//             currentIndex = carouselItem.length - currentIndex;
//             postionX = -size * currentIndex;
//             carouselSlider.style.transform = `translateX(${postionX}px)`;
//         }
//     })
// })

// event active new
function handleChangeNew() {
	let newBtnItems = document.querySelectorAll(".new_btn-item");
	let newList = document.querySelectorAll(".new_list");

	newList[0].style.display = "grid";
	function removeActive() {
		newBtnItems.forEach((newBtnItem, index) => {
			newBtnItem.classList.remove("active");
			newList[index].style.display = "none";
		});
		// newList.forEach
	}

	newBtnItems.forEach((item, index) => {
		item.addEventListener("click", () => {
			removeActive();
			item.classList.add("active");
			newList[index].style.display = "grid";
		});
	});
}

// EVENT FAQ
function showAccordion() {
	let acc = document.querySelectorAll(".accordion");
	acc.forEach((accItem) => {
		accItem.addEventListener("click", () => {
			accItem.classList.toggle("active");
			let panel = accItem.nextElementSibling;
			if (panel.style.maxHeight) {
				panel.style.maxHeight = null;
			} else {
				panel.style.maxHeight = panel.scrollHeight + "px";
			}
		});
	});
}

// lineHeadtop
function handChangeHeadtop() {
	function setHeadtop() {
		let headTop = document.querySelector(".headtop");
		let hBody = document.querySelector("body").offsetHeight;
		let vh = window.innerHeight;
		let scrollY = window.pageYOffset;
		let ratio = parseInt(scrollY / (hBody - vh) * 100);
		headTop.style.width = `${ratio}%`;
		if (window.innerWidth < 1025) {
			headTop.style.width = `${ratio + 1}%`;
			if (scrollY == 0) {
				headTop.style.width = 0;
			}
		}
	}
	setTimeout(() => {
		setHeadtop();
	}, 500);

	window.addEventListener("scroll", () => {
		setHeadtop();
	})
}


function start() {
	setNavHeader();
	langEvent();
	setSliderActive()
	handleVideo();
	scrollMenuEvent();
	handleBackToTop();
	handleChangeNew();
	showAccordion();
	handChangeHeadtop();
	// handleChangeSlide()
}
start();
