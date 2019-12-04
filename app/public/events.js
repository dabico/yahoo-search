/** 
 *  @fileOverview File containing event functions
 *  @author       Ozren Dabić <dabico@usi.ch>
 */

/**
 * Function that displays the "Back To Top" button, once the user
 * scrolls more than 100px from the top of the page
 */
window.onscroll = function() {
	let toTopButton = document.getElementById("to-top");
	if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
		toTopButton.style.display = "block";
	} else {
		toTopButton.style.display = "none";
	}
};