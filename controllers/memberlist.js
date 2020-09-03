'use strict';

const logger=require('../utils/logger');
const memberStore=require('../models/member-store.js');
const assessmentStore=require("../models/assessment-store.js");
const analytics=require("../utils/analytics.js")

const memberlist={
  
  index(request,response){
    const memberId=request.params.id;    
    logger.info('member id ='+memberId);
    const viewData={
      title:'memberList',
      member:memberStore.getMember(memberId),
      assessment:assessmentStore.getMemberAssessments(memberId),
      bmi:analytics.bmi(memberId),  
      bmiCategory:analytics.bmiCategory(memberId),
    };
    response.render('memberlist',viewData);
  },
  

  
  
  
};
module.exports=memberlist;