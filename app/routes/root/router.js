/** 
 *  @fileOverview File used to expose the server routes
 *  @module       root/router 
 *
 *  @author       Ozren Dabić <dabico@usi.ch>
 */
/** @module root/router */
'use strict';

const express = require('express');
const router = express.Router();

/** router for /root */
module.exports = router;

router.get('/', function(req, res){ 
	res.render('index', []); 
});
router.get('/*', function(req, res){ 
	res.redirect('/');
});