// Controller to render member profile page and allow to make changes to member information and save these
// changes to the Member Store.
"use strict";

const logger = require("../utils/logger");
const accounts=require("./accounts");
const memberStore=require("../models/member-store.js");

const profile = {
  
  index(request, response) {
    logger.info("profile rendering");
    const loggedInMember=accounts.getCurrentMember(request);
    const viewData = {
      title: "Member Profile",
      member:memberStore.getMember(loggedInMember.id),      
    };
    response.render("profile", viewData);
  },
  
  updateMember(request,response){
    const member=accounts.getCurrentMember(request);
    const memberId=request.params.id;
    const updateProfile={      
      name:request.body.name,
      gender:request.body.gender,
      email: request.body.email,
      password:request.body.password,
      address:request.body.address,
      height:request.body.height,
      startingweight:request.body.startingweight      
    }
    memberStore.updateMember(member, updateProfile);
    logger.info(updateProfile);
    response.redirect('/profile');      
  },  
};

module.exports = profile;
