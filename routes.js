"use strict";

const express = require("express");
const router = express.Router();

const dashboard = require("./controllers/dashboard.js");
const about = require("./controllers/about.js");
const accounts=require('./controllers/accounts.js');
const trainerdashboard=require("./controllers/trainerdashboard.js");
const memberlist=require('./controllers/memberlist.js');
const profile=require('./controllers/profile.js');

router.get("/about", about.index);

//router.get("/",dashboard.index);

router.get("/profile", profile.index);
router.post("/profile/updateprofile", profile.updateMember);

router.get("/dashboard", dashboard.index);
router.get("/trainerdashboard", trainerdashboard.index);
router.get('/memberlist/:id', memberlist.index);

//router.post('/memberlist/addcomment/:id', memberlist.addComment);
router.post('/trainerdashboard/:memberid/addcomment/:id', trainerdashboard.addComment);

router.get('/dashboard/deleteassessment/:id', dashboard.deleteAssessment);
router.get('/trainerdashboard/deletemember/:id',trainerdashboard.deleteMember);

router.post('/dashboard/addassessment', dashboard.addAssessment);
//router.post('/trainerdashboard/addcomment/:memberId/:assessmentId', trainerdashboard.addComment);


router.get('/', accounts.index);
router.get('/login', accounts.login);
router.get('/signup', accounts.signup);
router.get('/logout', accounts.logout);
router.post('/register', accounts.register);
router.post('/authenticate', accounts.authenticate);



module.exports = router;
