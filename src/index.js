// Main

import {Dom} from './dom';

// Setup Page: set image src
Dom.setImages();

// Allow project imgs to be clicked to view fullscreen
const projectImgs = document.querySelectorAll('.screenshot');
projectImgs.forEach((img) => {
	img.addEventListener('click', () => Dom.toggleFullscreenImg(img.src));
});
// Hide fullscreen when its clicked
document.querySelector('.fullscreen-wrapper')
	.addEventListener('click', Dom.toggleFullscreenImg);
