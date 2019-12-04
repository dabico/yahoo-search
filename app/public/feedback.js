/** 
 *  @fileOverview File containing all the relevance feedback storage functionalities
 *  @author       Ozren Dabić <dabico@usi.ch>
 */

let relevant = {}
let irrelevant = {};

/**
 * Initializes the relevance feedback maps for a key
 * 
 * @param {string} query - Query string of space separated keywords
 */
function initKey(query){
	if (relevant[query] === undefined && irrelevant[query] === undefined){
		relevant[query] = [];
		irrelevant[query] = [];
	}
}

/**
 * Assigns a mapping from a query string to a question ID,
 * stating that the corresponding doc is more relevant to
 * the query
 * 
 * @param {string} query  - Query string of space separated keywords
 * @param {string} doc_id - The unique ID of the question 
 */
function increaseRelevance(query,doc_id){
	if (!relevant[query].includes(doc_id)){
		if (irrelevant[query].includes(doc_id)){
			irrelevant[query].splice(irrelevant[query].indexOf(doc_id),1);
		}
		relevant[query].push(doc_id);
	}
	removeFeedbackButtons(doc_id);
}

/**
 * Assigns a mapping from a query string to a question ID,
 * stating that the corresponding doc is less relevant to
 * the query
 * 
 * @param {string} query  - Query string of space separated keywords
 * @param {string} doc_id - The unique ID of the question 
 */
function decreaseRelevance(query,doc_id){
	if (!irrelevant[query].includes(doc_id)){
		if (relevant[query].includes(doc_id)){
			relevant[query].splice(relevant[query].indexOf(doc_id),1);
		}
		irrelevant[query].push(doc_id);
	}
	removeFeedbackButtons(doc_id);
}