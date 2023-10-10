// DOM Manipulation Module

/** @module Dom Manipulation Module */
export const Dom = (() => {
	// Import all images in 'img' folder
	const images = importAll(require.context('./img', false, /\.(png|jpg|jpeg|svg)$/i)); // eslint-disable-line

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
	};

	return {setImages};
})();


/**
 * Dynamically import files in a directory
 * @param {*} r - `require.context(directory, (useSubDirectory), (RegEx))`
 *
 * @return {object} Object containing imports
 */
export function importAll(r) {
	const imports = {};
	r.keys().forEach((key) => (imports[key.replace('./', '')] = r(key)));

	return imports;
}
