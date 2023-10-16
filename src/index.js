// Main

import {Dom} from './dom';

// Setup Page: set image src
Dom.setImages();

// Get project images
const projectImgs = document.querySelectorAll('.screenshot');
projectImgs.forEach((img) => {
	// Allow project imgs to be clicked to view fullscreen
	img.addEventListener('click', () => Dom.toggleFullscreenImg(img.src));
});
// Hide fullscreen when its clicked
document.querySelector('.fullscreen-wrapper')
	.addEventListener('click', Dom.toggleFullscreenImg);

// Get every element that has a tooltip with it
const tooltipImgs =
	document.querySelectorAll('.screenshot, .icon:not(footer .icon[alt="Phone"]), .fullscreen-img'); // eslint-disable-line
tooltipImgs.forEach((img) => {
	// Position tooltips on hover
	img.addEventListener('mouseover', Dom.positionTooltip);
});

// Copy E-Mail when icon is clicked
const mailIcon = document.querySelector('.icon[alt="E-Mail"]');
mailIcon.addEventListener('click', () => {
	// Get E-Mail
	const email =
		document.querySelector('.icon[alt="E-Mail"]').parentElement;

	const text = email.innerText.split('E-Mail');
	Dom.copyText(text[text.length-1])
		.then(() => {
			const tooltip = email.firstElementChild.nextElementSibling;
			tooltip.textContent = 'Copied!'; // Notify that Email is copied

			// Get the copied text
			const clipboard = navigator.clipboard.readText();
			clipboard.then((str) => {
				// If copied txt is incorrect
				if (str.includes('Copied!')) {
					// Fix it
					navigator.clipboard.writeText(str.replace('Copied!', ''));
				}
			});

			setTimeout(() => {
				// Reset tooltip txt after 3 seconds
				tooltip.textContent = 'Copy E-Mail';
			}, 3000);
		}).catch(() => {
			// Error check
			const tooltip = email.firstElementChild.nextElementSibling;
			tooltip.textContent = 'Failed to copy!';
			setTimeout(() => {
				tooltip.textContent = 'Copy E-Mail';
			}, 3000);
		});
});
