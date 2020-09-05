//Controller to manage member dashboard

"use strict";

const logger = require("../utils/logger");
const memberStore=require("../models/member-store.js");
const assessmentStore=require("../models/assessment-store.js");
const uuid=require('uuid');
const accounts=require('./accounts.js');
const analytics=require("../utils/analytics.js");


const dashboard = {
  
  //Renders loggedIn member's dashboard, pulls together member information, list of assessments, trends, analytics and a form to add new assessments.
  index(request, response) {
    const loggedInMember=accounts.getCurrentMember(request);    
    logger.info("dashboard rendering");
    const viewData = {
      title: "Dashboard",
      assessment:assessmentStore.getMemberAssessments(loggedInMember.id).reverse(),
      member:memberStore.getMember(loggedInMember.id),
      bmi:analytics.bmi(loggedInMember.id),  
      bmiCategory:analytics.bmiCategory(loggedInMember.id),
      isIdealBodyWeight:analytics.isIdealBodyWeight(loggedInMember.id),
      trend:analytics.trend(loggedInMember.id),
    };
    logger.info("about to render",memberStore);
    response.render("dashboard", viewData);
  },
  
 //Method to add new assessment to the logged in member and store it in the Assessment Store.
    addAssessment(request,response){      
      const date=new Date();
      const loggedInMember=accounts.getCurrentMember(request);
      const newAssessment={
        memberid: loggedInMember.id,
        id:uuid.v1(),
        date:new Date().toISOString().replace(/T/, ' ').replace(/\..+/, ''),
        weight: request.body.weight,
        chest: request.body.chest,
        thigh: request.body.thigh,
        upperarm: request.body.upperarm,
        waist: request.body.waist,
        hips: request.body.hips,
        trend:analytics.trend(loggedInMember.id),
        comment:"",
      };
      assessmentStore.addAssessment(newAssessment);
      response.redirect('/dashboard');
  }, 
  
 //Remove assessment for the Logged in member from the dasgboard view and the Assessment Store. 
  deleteAssessment(request,response){
    const loggedInMember=accounts.getCurrentMember(request);
    //logger.debug("Dashboard: loggedin member is "+loggedInMember);
    const assessmentId=request.params.id;
    logger.debug("dashboard: assessment id is "+assessmentId);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect('/dashboard');    
  },  
}; 
  

module.exports = dashboard;
