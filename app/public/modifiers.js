/** 
 *  @fileOverview File containing all the DOM modification functionalities
 *  @author       Ozren Dabić <dabico@usi.ch>
 */

/**
 * Removes the element with corresponding id from the DOM
 * 
 * @param {string} id - ID string of the element we want to remove
 */
function removeElementById(id){
	var elem = document.getElementById(id);
	elem.parentNode.removeChild(elem);
}

/**
 * Removes the feedback buttons once the feedback has been
 * submitted, displaying a message
 * 
 * @param {string} id - Unique ID string of the feedback button
 */
function removeFeedbackButtons(id){
	var div = document.getElementById(id);
	div.innerHTML = "Feedback<br />Submitted!";
}

/**
 * Function that sets the scroll back to the top of the
 * document, triggered by pressing the "Back To Top" button
 */
function backToTop(){
	document.documentElement.scrollTop = 0;
}

/**
 * Creates the button for viewing the next 10 documents in the
 * search
 * 
 * @param {number} start - Search start index, usually a multiple of 10
 * @param {number} limit - Total number of documents retrieved for a specific query 
 */
function createViewMore(start,limit){
	if (start < limit){
		let button = document.createElement('button');
		button.setAttribute("id","search-"+start);
		button.setAttribute("onclick","nextFetch("+start+");");
		button.innerHTML = "View More!";

		let table_div = document.getElementById('table-container');
		table_div.appendChild(button);
	}
}

/**
 * Creates a new anchor element with specific displaytext and URL
 * 
 * @param  {string} text - The text for the hyperlink
 * @param  {string}  url - URL of the page we wish to link to
 * @return {string} Anchor element in string form
 */
function createHyperlink(text,url){
	return '<a href="'+url+'" target="_blank">'+text+'</a>';
}

/**
 * Creates a new ordered/unordered list element from an array of strings
 * 
 * @param    {Array}            array - Array of strings that will make up each list entry
 * @param  {boolean} [ordered = true] - Boolean flag that indicates if list will be ordered
 * @return  {string} Ordered/Unordered list element in string form
 */
function createList(array,ordered = true){
	array = array.filter(str => str !== "")
	let return_value = ordered ? "<ol>" : "<ul>";
	array.forEach(ans => return_value += "<li>"+ans+"</li>");
	return_value += ordered ? "</ol>" : "</ul>";
	return return_value;
}

/**
 * Creates a new table for the search results, directly appending it to the DOM
 * 
 * @param {number} num - Number of results that the search yielded, rows will not be created if num == 0
 */
function createTable(num){
	let table = document.getElementById('results');
	let caption = document.createElement('caption');
	caption.innerHTML = "Results: " + num;
	table.appendChild(caption);

	if (num > 0){
		let column1 = document.createElement('th');
		column1.innerHTML = "Question:";
		let column2 = document.createElement('th');
		column2.innerHTML = "Content:";
		let column3 = document.createElement('th');
		column3.innerHTML = "Relevant?";
		let row = document.createElement('tr');
		row.appendChild(column1);
		row.appendChild(column2);
		row.appendChild(column3);
		table.appendChild(row);
	}
}

/**
 * Appends a retrieved question and appends it to the table with its answers
 * 
 * @param {string}   title - The question title (which is an anchor element in string form)
 * @param {string} answers - The question description and list of all the answers (which is a list element in string form)
 * @param {string}      id - The question ID (used for the relevance feedback)
 * @param {string}   query - The user-submitted query (also used for the relevance feedback)
 */
function appendToTable(title, answers, id, query){
	let table = document.getElementById('results');
	
	let column1 = document.createElement('td');
	column1.innerHTML = title;
	
	let column2 = document.createElement('td');
	column2.innerHTML = answers;
	
	let column3 = document.createElement('td');
	let container = document.createElement('div');
	container.setAttribute("id",id);

	if (query !== ''){
		let button1 = document.createElement('button');
		button1.innerHTML = "&#10004;";
		let button2 = document.createElement('button');
		button2.innerHTML = "&#10008;";
		button1.setAttribute("onclick","increaseRelevance('"+query.join(' ')+"','"+id+"');");
		button2.setAttribute("onclick","decreaseRelevance('"+query.join(' ')+"','"+id+"');");	
		container.appendChild(button1);
		container.appendChild(button2);
	}

	column3.appendChild(container);
	
	let row = document.createElement('tr');
	row.appendChild(column1);
	row.appendChild(column2);
	row.appendChild(column3);
	table.appendChild(row);
}