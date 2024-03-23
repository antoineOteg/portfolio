const main = document.getElementsByTagName("main")[0]


/* language */
document.getElementById("languageButton").onclick = () => {
	document.body.lang = ((document.body.lang == 'fr') ? 'en' : 'fr')

}

/* escape */

document.addEventListener("keydown", (e) => {
	if (e.key == "Escape") {
		document.activeElement.blur()
	}
})


/* codeTxt */

let codeWriting = false

function lunchCode(id) {
	if (!codeWriting) {
		codeWriting = true
		const codeSection = document.getElementById(id)
		const allTextChild = Array.from(document.querySelectorAll("#" + id + ">li>span>*")).filter(node => node.offsetParent !== null)
		saveString = allTextChild.map(node => Array.from(node.innerText))

		allTextChild.forEach(node => node.innerText = "");
		(function write(i, j) {
			setTimeout(() => {
				allTextChild[i].textContent += saveString[i][j]
				j++
				if (j == saveString[i].length) {
					i++
					if (i != saveString.length) {
						write(i, 0)
					} else {
						codeWriting = false
					}
				} else {
					write(i, j)
				}
			}, 30)
		})(0, 0)
	}
}

/* jauge */

function loadJauge() {
	Array.from(document.querySelectorAll(".programsIcons .jauge")).forEach(node => {
		node.style.animation = 'none'
		node.style.animation = null
	})
}

/* fill with project */

; (function fillWithData() {
	fetch("project.json", { cache: "no-store" })
		.then(response => response.json())
		.then(data => {
			initCarrousel(data)

			for (obj of data) {
				main.insertAdjacentHTML('afterbegin', `
                    <section id="${obj.projectId}" class="projectPage" style="--svgImage: url(img/projects/${obj.projectId}.svg)">
                        <div>
                            <button class="backButton" onclick="window.history.back()"><i class="svgIcon" style="--svgImage: url(img/icon/arrow.svg)"></i></button>
                            <h1 class="mainTitle">
                                <span lang="fr">${obj.frTitle}</span>
                                <span lang="en">${obj.enTitle}</span>
                            </h1>
                            ${obj.srcIllustration ? `<img src="img/projects/illustrations/${obj.srcIllustration}" loading="lazy">` : ""}
                            <h2>
                                <span lang="fr">${obj.frSubTitle}</span>
                                <span lang="en">${obj.enSubTitle}</span>
                            </h2>
                            <p>
                                <span lang="fr">${obj.frDescription}</span>
                                <span lang="en">${obj.enDescription}</span>
                            </p>
                            ${obj.projectVideo ? `
                                <h2>
                                    <span lang="fr">Video du projet</span>
                                    <span lang="en">Project video</span>
                                </h2>
                                <iframe class="illustration" src="${obj.projectVideo}"
								    title="${obj.enTitle}" frameborder="0"
								    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								    allowfullscreen loading="lazy"></iframe>
                            ` : ""}
														${obj.projectSrc ? `
                                <h2>
                                    <span lang="fr">Visiter le projet</span>
                                    <span lang="en">Visit the project</span>
                                </h2>
																<a class="projectSrc" href="${obj.projectSrc}" target="_blank">
																		<i class="svgIcon" style="--svgImage:url(img/icon/loop.svg)"></i>
																		<span>${obj.projectSrc}</span>
																</a>
                            ` : ""}
                        </div>
                    </section>
                `)
			}
			window.history.pushState({}, "")
			window.history.back()
		})
})()