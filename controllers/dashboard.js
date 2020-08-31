"use strict";

const logger = require("../utils/logger");
const memberStore=require("../models/member-store.js");
const uuid=require('uuid');
const accounts=require('./accounts.js');


const dashboard = {
  index(request, response) {
    const loggedInUser=accounts.getCurrentMember(request);
    logger.info("dashboard rendering");
    const viewData = {
      title: "Dashboard",
      member:memberStore.getMember(loggedInUser.id),
    };
    logger.info("about to render",memberStore);
    response.render("dashboard", viewData);
  },
  
//   addAssessment(request,response){
//     const memberId=request.params.id;
//     const member=memberStore.getMember(memberId);
//     const newAssessment={
//       id:uuid.v1(),
//       weight: request.body.weight,
//       chest: request.body.chest,
//       thigh: request.body.thigh,
//       upperarm: request.body.upperarm,
//       waist: request.body.waist,
//       hips: request.body.hips,      
//     };
//     memberStore.addAssessment(memberId,newAssessment);
//     response.redirect('/dashboard'+memberId);
//   }
// };
    addAssessment(request,response){
    
    const loggedInMember=accounts.getCurrentMember(request);
    const newAssessment={
      //userid: loggedInMember.id,
      id:uuid.v1(),
      weight: request.body.weight,
      chest: request.body.chest,
      thigh: request.body.thigh,
      upperarm: request.body.upperarm,
      waist: request.body.waist,
      hips: request.body.hips,      
    };
    memberStore.addAssessment(loggedInMember,newAssessment);
    response.redirect('/dashboard');
  },
  
//   deleteAssessment(request,response){
//     const loggedInMember=accounts.getCurrentMember(request);
//     const assessId=request.params.id;
//     memberStore.removeAssessment(loggedInMember, assessId);
//     response.redirect('/dashboard');
    
//   }
  
  deleteAssessment(request,response){
    const memberId=request.params.id;
    const assessmentId=request.params.assessmentid;
    logger.debug("deleting assessment");
    memberStore.removeAssessment(memberId,assessmentId);
    response.redirect('/dashboard');
  },
  
  // deleteAssessment(request,response){
  //   const memberId=accounts.getCurrentMember(request);
  //   const assessmentId=request.params.assessmentid;
  //   logger.debug("deleting assessment");
  //   memberStore.removeAssessment(memberId,assessmentId);
  //   response.redirect('/dashboard');
  // }
  
//   deleteAssessment(request,response){
//     const assessmentId=request.params.id;
//     assessmentStore.removeAssessment(assessmentId);
//     response.redirect('/dashboard');
//   }
  
//   AssessmentStore
//   removeAssessment(id){
//     const assessment=this.getAssessment(id);
//     this.store.remove(this.collection, assessment);
//     this.store.save();
//   }
  
};
  
  
  

module.exports = dashboard;
