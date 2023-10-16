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
	document.querySelectorAll('.screenshot, .icon:not(footer .icon), .fullscreen-img'); // eslint-disable-line
tooltipImgs.forEach((img) => {
	// Position tooltips on hover
	img.addEventListener('mouseover', Dom.positionTooltip);
});
