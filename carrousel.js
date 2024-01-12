const projectCaroussel = document.getElementsByClassName("carrousel")[0]
let allImages = null

const images = projectCaroussel.getElementsByClassName("images")[0]
const buttonsControls = projectCaroussel.getElementsByClassName("controls")[0]
const description = projectCaroussel.getElementsByClassName("description")[0]
const languageIcons = projectCaroussel.getElementsByClassName("languageIcons")[0]
const languageForProject = []

function initCarrousel(data) {
	for (obj of data) {
		description.insertAdjacentHTML('beforeend', `
            <span>
                <span lang="fr">${obj.frSubTitle}</span>
                <span lang="en">${obj.enSubTitle}</span>
            </span>`)

		images.insertAdjacentHTML('beforeend', `
            <a id="${obj.projectId}" href="#${obj.projectId}" style="--svgImage: url(img/projects/${obj.projectId}.svg)"><img src="img/projects/${obj.projectId}.svg" alt="${obj.projectId}"></a>
        `)

		languageForProject.push(obj.listPrograms)

	}
	images.firstElementChild.classList.add("on")
	allImages = images.children

	for (let i in Array.from(allImages)) {
		allImages[i].onmouseenter = () => {
			clearInterval(intervalCarrousel)
		}
		allImages[i].onmouseleave = () => {
			lunchCarrousel()
		}

		buttonsControls.insertAdjacentHTML("beforeend", "<button></button>")
		buttonsControls.children[i].onclick = () => {
			clearInterval(intervalCarrousel)
			goTo(Number(i))
			lunchCarrousel()
		}
	}

	addCounter(0)
	lunchCarrousel()
}

let counterCarrousel = 0;
let intervalCarrousel = null

function lunchCarrousel() {
	intervalCarrousel = setInterval(() => {
		addCounter(1)
	}, 5000);
}

function goTo(index) {
	allImages[counterCarrousel].classList.remove("on")
	buttonsControls.children[counterCarrousel].classList.remove("on")
	description.children[counterCarrousel].classList.remove("on")
	Array.from(languageIcons.children).filter(el => !languageForProject[index].includes(el.id)).forEach(el => el.classList.remove("on"))
	counterCarrousel = index
	allImages[counterCarrousel].classList.add("on")
	buttonsControls.children[counterCarrousel].classList.add("on")
	description.children[counterCarrousel].classList.add("on")
	languageForProject[counterCarrousel].forEach(el => Array.from(languageIcons.children).find(e => e.id == el).classList.add("on"))
	if (index == allImages.length - 1) {
		allImages[0].classList.add("firstToLast")
	} else {
		allImages[0].classList.remove("firstToLast")
	}
}

function addCounter(toAdd) {
	goTo((counterCarrousel + toAdd + allImages.length) % allImages.length)
}

function manualMove(toAdd) {
	clearInterval(intervalCarrousel)
	addCounter(toAdd)
	lunchCarrousel()
}



/* slide on mobile */

projectCaroussel.addEventListener('touchstart', startPos);

projectCaroussel.addEventListener('touchend', endPos);

function unify(e) { return e.changedTouches ? e.changedTouches[0] : e };

let x0 = null;
let y0 = null;

function startPos(e) {
	x0 = e.changedTouches[0].clientX, y0 = e.changedTouches[0].clientY;
	clearInterval(intervalCarrousel)
};

function endPos(e) {
	if ((x0 || x0 === 0) && Math.abs(x0 - e.changedTouches[0].clientX) > Math.abs(y0 - e.changedTouches[0].clientY)) {
		if (x0 > e.changedTouches[0].clientX) {
			addCounter(-1)
		} else {
			addCounter(1)
		}

		x0 = null
		lunchCarrousel()
	}
};