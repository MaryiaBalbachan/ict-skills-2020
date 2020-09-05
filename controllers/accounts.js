// Controller to manage the application accounts

'use strict';

const memberStore = require('../models/member-store.js');
const trainerStore=require('../models/trainer-store.js');
const logger = require('../utils/logger');
const uuid = require('uuid');

const accounts = {
  
//Renders the index page, giving the user an option to Login or Sign up  
  index(request, response) {
    const viewData = {
      title: 'Login or Signup',
    };
    response.render('index', viewData);
  },
  
//Renders Login page, presenting the user with a form to enter email and password
  login(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('login', viewData);
  },
  
//Logout page, redirects the user to the Index page
  logout(request, response) {
    response.cookie('member', '');
    response.redirect('/');
  },

  //Presents the user with a sign up form
  signup(request, response) {
    const viewData = {
      title: 'Login to the Service',
    };
    response.render('signup', viewData);
  },

  //Creates a new member object in the memberStore and assigns a unique ID
  register(request, response) {
    const member = request.body;
    member.id = uuid.v1();
    member.assessments=[];
    memberStore.addMember(member);
    logger.info(`registering ${member.email}`);
    response.redirect('/');
  },

  //Method to determine whether email address and password entered corresponds with a registered member or trainer, renders member or trainer dashbord.
  //Attaches cookies to track the user.
  //If the user is unregistered, redirects back to the Login page.
  authenticate(request, response) {
    const member = memberStore.getMemberByEmail(request.body.email);
    const memberpassword=memberStore.getMemberPassword(request.body.password);
    const trainer = trainerStore.getTrainerByEmail(request.body.email);
    const trainerpassword=trainerStore.getTrainerPassword(request.body.password);
    if (member&&memberpassword) {
      response.cookie('member', member.email);
      logger.info(`logging in ${member.email}`);
      response.redirect('/dashboard');
    } 
    else if(trainer&&trainerpassword){
      response.cookie('trainer', trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect('/trainerdashboard');
    }
    else {
      response.redirect('/login');
    }
  },

  //Retrieves current member by email
  getCurrentMember(request) {
    const memberEmail = request.cookies.member;
    return memberStore.getMemberByEmail(memberEmail);
  },
  
  //Retrieves current trainer by email
  getCurrentTrainer(request){
    const trainerEmail=request.cookies.trainer;
    return trainerStore.getTrainerByEmail(trainerEmail);
  }
};

module.exports = accounts;