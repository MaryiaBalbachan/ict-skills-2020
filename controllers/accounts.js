'use strict';

const memberStore = require('../models/member-store.js');
const trainerStore=require('../models/trainer-store.js');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {

  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },
  

  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },
  

  logout(request, response) {
    response.cookie('member', '');
    response.redirect('/');
  },

  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  register(request, response) {
    const member = request.body;
    member.id = uuid.v1();
    member.assessments=[];
    memberStore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect('/');
  },

  authenticate(request, response) {
    const member = memberStore.getMemberByEmail(request.body.email);
    const password=memberStore.getMemberPassword(request.body.password);
    const trainer=trainerStore.getTrainerPassword(request.body.password);
    if (member&&password) {
      response.cookie('member', member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect('/dashboard');
    } 
    else if(trainer&&password){
      response.cookie('trainer', trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect('/trainerdashboard');
    }
    else {
      response.redirect('/login');
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.member;
    return memberStore.getMemberByEmail(memberEmail);
  },
  
  getCurrentTrainer(request){
    const trainerEmail=request.cookies.trainer;
    return trainerStore.getTrainerByEmail(trainerEmail);
  }
};

module.exports = accounts;