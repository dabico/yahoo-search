/** 
 *  @fileOverview File containing all the text cleanup functionalities
 *  @author       Ozren Dabić <dabico@usi.ch>
 */

/**
 * Parses the retrieved question, removing unnecessary text content
 * 
 * @param  {string} title - Question title
 * @param  {string}   doc - Document content string
 * @return {string} The cleaned up question description and answers list
 */
function parseDoc(title,doc){
	let removed_title = doc.replace(title,'');
	let removed_topics = removed_title.replace('\nHome\nMail\nNews\nSports\nFinance\nEntertainment\nLifestyle\nGroups\nMobile\nMore\nAsk\nSign in\nMail\nAll Categories\nArts & Humanities\nBeauty & Style\nBusiness & Finance\nCars & Transportation\nComputers & Internet\nConsumer Electronics\nDining Out\nEducation & Reference\nEntertainment & Music\nEnvironment\nFamily & Relationships\nFood & Drink\nGames & Recreation\nHealth\nHome & Garden\nLocal Businesses\nNews & Events\nPets\nPolitics & Government\nPregnancy & Parenting\nScience & Mathematics\nSocial Science\nSociety & Culture\nSports\nTravel\nYahoo Products','');
	let removed_ads = removed_topics.replace('\nBlack Friday is almost here!\n30 Days of Savings\nKickstart your Holiday shopping\n','');
	let removed_footer = removed_ads.replace('\nTerms ・ Privacy ・ AdChoices ・ RSS ・ Help About Answers ・ Community Guidelines ・ Leaderboard ・ Knowledge Partners ・ Points & Levels Send Feedback ・ International Sites\n','');
	let removed_feedback = removed_footer.replace("\nHow do you think about the answers? You can sign in to vote the answer.\nSign in",'')
	let removed_best = removed_feedback.replace("\nBest Answer","");
	let removed_updated = removed_best.replace("Update :\n",'');
	let removed_dates = removed_updated.replace(/\d+\s(decade|year|years|month|months|day|days|hour|hours|week|weeks)\s(ago)\n/g,'');
	let removed_recommended = removed_dates.split("Still have questions? Get your answers by asking now.\nAsk Question\nTrending Questions\nTrending Questions")[0];

	let separated = removed_recommended.split("Answer Save");

	let question = separated[0];
	let filtered_question = question.split('\n').splice(9,question.length).join('<br />').replace('· ','');

	let answers = separated[1];
	let removed_count = answers.split('\n').splice(3,answers.length).join('\n');
	let removed_levels = removed_count.replace(/Lv\s\d+\n/g,'');
	let ans_arr = removed_levels.split(/\d+\s\d+\s\d+\n/).filter(str => str != "");
	let ans_no_usr = [];
	ans_arr.forEach(ans => {
		let removed_answerer = ans.replace(/.*\n/,'');
		ans_no_usr.push(removed_answerer.replace('\n','<br />'));
	});
	let filtered_answers = createList(ans_no_usr);

	return filtered_question + "<br />Answers:<br />" + filtered_answers;
}

/**
 * Parses the retrieved question title, removing unnecessary text content
 * 
 * @param  {string} title - Question title
 * @return {string} The cleaned up question title
 */
function parseTitle(title){
	return title.replace('| Yahoo Answers','');
}