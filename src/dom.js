// DOM Manipulation Module

/** @module Dom Manipulation Module */
export const Dom = (() => {
	// Import all images in 'img' folder
	const images = importAll(require.context('./img', false, /\.(png|jpg|jpeg|svg)$/i)); // eslint-disable-line

	/**
	 * Toggle showing the clicked image in fullscreen
	 *
	 * @param {string} src Image `src` attr
	 */
	const toggleFullscreenImg = (src) => {
		const fsContainer = document.querySelector('.fullscreen-wrapper');
		// If container is hidden, reset src
		if (fsContainer.classList.toggle('hide')) {
			fsContainer.firstElementChild.src = '';
			// Show scrollbar
			document.querySelector('body').style.overflow = '';
		} else {
			// Else set src
			fsContainer.firstElementChild.src = src;
			// Hide scroll bar
			document.querySelector('body').style.overflow = 'hidden';
		}
	};

	/**
	 * Set all image `src` on the page
	 * - Dynamically add images to page
	 */
	const setImages = () => {
		addImgsToCards();
		addIconsToPage();
	};

	/**
	 * Add imported images to cards
	 */
	const addImgsToCards = () => {
		const cards = document.querySelectorAll('.card');
		cards.forEach((card) => {
			const name = card.id; // Get name
			const imgData = images[name + '.png'].default; // Get img
			card.querySelector('.screenshot').src = imgData; // Set img src
		});
	};

	/**
	 * Add icons to page
	 * - Set `src` attr for icons on page
	 */
	const addIconsToPage = () => {
		// Set GH icons
		const githubIcons = document.querySelectorAll('.gh-icon');
		githubIcons.forEach((icon) => {
			icon.src = images['github-mark.svg'].default;

			// Set Open-in-New-Window Icon
			if (icon.parentElement.nextElementSibling) {
				// Get the icon
				icon.parentElement.nextElementSibling.firstElementChild.src =
					images['open-new-window.svg'].default;
			}
		});

		// Set Phone & E-Mail icons
		const contactIcons = document.querySelectorAll('footer .icon');
		contactIcons.forEach((icon) => {
			if (icon.alt == 'Phone') icon.src = images['phone-icon.svg'].default;
			else if (icon.alt == 'E-Mail') icon.src = images['mail-icon.svg'].default;
		});
	};

	/**
	 * Position the tooltip relative to mouse position
	 *
	 * @param {MouseEvent} e
	 */
	const positionTooltip = (e) => {
		const x = e.offsetX;
		const y = e.offsetY;
		const tooltip = e.target.nextElementSibling;

		let offsetX;
		let offsetY;
		// If target is an icon
		if (e.target.classList.contains('icon')) {
			offsetX = x - tooltip.offsetWidth - 15;
		// If mouseX is on the right half of img
		} else if (x >= e.target.clientWidth / 2) {
			// Place on left of cursor
			offsetX = x - tooltip.offsetWidth - 5;
		} else {
			// Else place on right of cursor
			offsetX = x + 5;
		}

		// If target is an icon
		if (e.target.classList.contains('icon')) {
			offsetY = y - tooltip.offsetHeight - 15;
		// If mouseY is on top half
		} else if (y < e.target.clientHeight / 2) {
			// Place below cursor
			offsetY = y + tooltip.offsetHeight + 5;
		} else {
			// Else place above
			offsetY = y - tooltip.offsetHeight - 5;
		}

		// Position tooltip relative to cursor
		tooltip.style.top = `${offsetY}px`;
		tooltip.style.left = `${offsetX}px`;
	};

	return {setImages, toggleFullscreenImg, positionTooltip};
})();


/**
 * Dynamically import files in a directory
 * @param {*} r - `require.context(directory, (useSubDirectory), (RegEx))`
 *
 * @return {object} Object containing imports
 */
function importAll(r) {
	const imports = {};
	r.keys().forEach((key) => (imports[key.replace('./', '')] = r(key)));

	return imports;
}
