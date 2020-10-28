/** 
 *  @fileOverview Main script file
 *  @author       Ozren Dabić <dabico@usi.ch>
 */

const base_url = "http://localhost:8983/solr/nutch/select"
const base_fl = "fl=id%2Ctitle%2Ccontent"
const base_q = "&q=%2Bcontent%3A*samsung*%20AND%20%2Bhost%3Aanswers.yahoo.com%20AND%20%2Dcontent%3A%22There%20are%20no%20answers%20yet.%20Be%20the%20first%20to%20answer%20this%20question.%20Answer%20this%20question%22%20AND%20%2Bcontent%3A(%22asked%20in%20Consumer%20Electronics%22%20OR%20%22asked%20in%20Computers%20%5C%26%20Internet%22)";
const base_start = "&start="

/**
 * Generates the URL for accessing the documents from SOLR
 * 
 * @param   {Array} query - Array of string keywords submitted by user for search
 * @param  {number} start - Start index for the search
 * @return {string} Fully formatted URL for the GET request that will be submitted to SOLR
 */
function buildURL(query,start){
	let searchContent = document.getElementById("content").checked;
	if (query.length > 0){
		let query_str = query.join(' ');
		initKey(query_str);

		let query_str_url = query.join('%20');
		let search_q = "%20AND%20%2Bcontent%3A%22";

		if (searchContent){
			//search in content
			search_q += "ago%20"+query_str_url+"%22~1000";
		} else {
			//search in title
			search_q += query_str_url+"%20Yahoo%20Answers%22~15";
		}

		let boost = relevant[query_str];
		let discount = irrelevant[query_str];
		let boost_q = "";
		let discount_q = "";
		boost.forEach(id => boost_q += "%20id%3A%2A"+id+"^10");
		discount.forEach(id => discount_q += "%20-id%3A%2A"+id);

		return base_url + "?" + base_fl + base_q + search_q + boost_q + discount_q + base_start + start;
	} else {
		return base_url + "?" + base_fl + base_q + base_start + start;
	}
}

/**
 * Resets previous search results and performs initial search
 */
async function main(){
	reset();
	await initialFetch();
}

/**
 * Resets the result table back to an empty table
 */
function reset(){
	let table_container = document.getElementById('table-container');
	table_container.innerHTML = '<table id="results"></table>';
}

/**
 * Fetch first 10 documents that match query, 
 * format them and prepare to search the next 10
 */
async function initialFetch(){
	let query = document.getElementById('query');
	let tokens = query.value.replace(/[.&%#(),/!"*?~\[\]+\-^=|:{}$]+/g," ").split(" ").filter(str => str != "");

	let result = await fetch(buildURL(tokens,0)).then(res => res.json());
	let docs = result.response.docs;
	let limit = result.response.numFound;

	createTable(limit);
	
	docs.forEach(doc => {appendToTable(createHyperlink(parseTitle(doc.title),doc.id),
			          				   parseDoc(doc.title,doc.content),
			          				   doc.id.split("?qid=")[1],
			          				   tokens);});

	createViewMore(10,limit);
}

/**
 * Fetch 10 documents that match query from specified starting index, 
 * format them and prepare to search the next 10
 * 
 * @param {number} start - Start index for the fetch
 */
async function nextFetch(start){
	removeElementById("search-"+start);

	let query = document.getElementById('query');
	let tokens = query.value.replace(/[.&%#(),/!"*?~\[\]+\-^=|:{}$]+/g," ").split(" ").filter(str => str != "");

	let result = await fetch(buildURL(tokens,start)).then(res => res.json());
	let docs = result.response.docs;
	let limit = result.response.numFound;
	
	docs.forEach(doc => {appendToTable(createHyperlink(parseTitle(doc.title),doc.id),
			          				   parseDoc(doc.title,doc.content),
			          				   doc.id.split("?qid=")[1],
			          				   tokens);});

	createViewMore(start + 10,limit);
}