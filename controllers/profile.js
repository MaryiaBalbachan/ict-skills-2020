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
  

  
  
};

module.exports = profile;
