"use strict";

const logger = require("../utils/logger");
const memberStore=require("../models/member-store.js");
const assessmentStore=require("../models/assessment-store.js");
const uuid=require('uuid');
const accounts=require('./accounts.js');
const analytics=require("../utils/analytics");




const dashboard = {
  index(request, response) {
    const loggedInMember=accounts.getCurrentMember(request);
    // const bmi=analytics.bmi(loggedInUser);
    logger.info("dashboard rendering");
    const viewData = {
      title: "Dashboard",
      assessment:assessmentStore.getMemberAssessments(loggedInMember.id),
      member:memberStore.getMember(loggedInMember.id),
      // bmi:bmi,      
      
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
      };
      assessmentStore.addAssessment(newAssessment);
      response.redirect('/dashboard');
  },
  
  
  // deleteAssessment(request,response){
  //   const memberId=request.params.userid;
  //   const assessmentId=request.params.assessmentid;
  //   logger.debug(`deleting assessment ${assessmentId} from Memberlist ${memberId}`);
  //   memberStore.removeAssessment(memberId, assessmentId);
  //   response.redirect('/dashboard/'+memberId);
  // },
  
  deleteAssessment(request,response){
    const loggedInMember=accounts.getCurrentMember(request);
    //logger.debug("Dashboard: loggedin member is "+loggedInMember);
    const assessmentId=request.params.id;
    logger.debug("dashboard: assessment id is "+assessmentId);
    assessmentStore.removeAssessment(assessmentId);
    response.redirect('/dashboard');
    
  },
  
  // deleteAssessment(request, response) {
  //   const assessmentId = request.params.id;
  //   logger.debug(`Deleting Assessment ${assessmentId}`);
  //   memberStore.removeAssessment(assessmentId);
  //   response.redirect("/dashboard");
  // },
  
  // deleteAssessment(request,response){
  //   const memberId=request.params.id;
  //   const assessmentId=request.params.assessmentid;
  //   logger.debug("deleting assessment");
  //   memberStore.removeAssessment(memberId,assessmentId);
  //   response.redirect('/dashboard');
  // },
  
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
  
  updateProfile(request,response){
}
  
};
  
  
  

module.exports = dashboard;
