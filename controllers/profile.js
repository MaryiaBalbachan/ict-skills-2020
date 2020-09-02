"use strict";

const logger = require("../utils/logger");
const accounts=require("./accounts");

const profile = {
  index(request, response) {
    logger.info("profile rendering");
    const viewData = {
      title: "Member Profile",
    };
    response.render("profile", viewData);
  },
  
  updateProfile(request,response){
    const loggedInMember=accounts.getCurrentMember(request);
  },
  
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
};

module.exports = profile;
