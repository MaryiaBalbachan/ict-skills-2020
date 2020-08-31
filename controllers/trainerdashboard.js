"use strict";

const logger = require("../utils/logger");
const memberStore=require("../models/member-store.js");
const uuid=require('uuid');
const accounts=require('./accounts.js');


const trainerdashboard = {
  
  index(request, response) {
    logger.info("trainer dashboard rendering");
    const viewData = {
      title: "Trainer Dashboard",
      member:memberStore.getAllMembers(),
    };
    logger.info("about to render",memberStore.getAllMembers());
    response.render("trainerdashboard", viewData);
  },
  
  addComment(request,response){
    const comment=request.body.comment;
    const memberId=request.params.memberid;
    const member=memberStore.getMember(memberId);
    memberStore.addComment(comment,member,request.params.assessmentId);
    response.redirect('./listassessments/'+request.params.memberId)
  },
  
  deleteMember(request,response){
    const memberId=request.params.id;
    memberStore.removeMember(memberId);
    response.redirect('/trainerdashboard');
  },
};

module.exports = trainerdashboard;
