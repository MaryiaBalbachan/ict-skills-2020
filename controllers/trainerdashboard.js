//Controller to manage trainerdashboard. Displays trainer Dashboard listing all the members, 
//allows to delete a member from the view and the Member Store,add a comment to an assessment and 
// save it in the Assessment Store
"use strict";

const logger = require("../utils/logger");
const memberStore=require("../models/member-store.js");
const assessmentStore=require("../models/assessment-store.js");
const uuid=require('uuid');
const accounts=require('./accounts.js');


const trainerdashboard = {
  
  index(request, response) {
    logger.info("trainer dashboard rendering");
    const memberId=request.params.id;
    const viewData = {
      title: "Trainer Dashboard",
      member:memberStore.getAllMembers(),       
    };
    //logger.info("about to render",memberStore.getAllMembers()+viewData);
    response.render("trainerdashboard", viewData);
  },  
 
  
  deleteMember(request,response){
    const memberId=request.params.id;
    memberStore.removeMember(memberId);
    response.redirect('/trainerdashboard');
  },
  
  addComment(request,response){
    const memberId=request.params.memberid;
    const assessmentId=request.params.id;
    const assessment=assessmentStore.getAssessment(assessmentId);
    logger.info("comments being added");
    const comment=request.body.comment;
    assessmentStore.addComment(comment, assessmentId)
    logger.info("saving to assessmentStore");
    response.redirect('/memberlist/'+memberId);    
  },  
};

module.exports = trainerdashboard;
