'use strict';

const logger=require('../utils/logger');
const memberStore=require('../models/member-store.js');
const assessmentStore=require("../models/assessment-store.js");

const memberlist={
  
  index(request,response){
    const memberId=request.params.id;    
    logger.info('member id ='+memberId);
    const viewData={
      title:'memberList',
      member:memberStore.getMember(memberId),
      assessment:assessmentStore.getMemberAssessments(memberId),
    };
    response.render('memberlist',viewData);
  },
  
//   addComment(request,response){
//     const comment=request.body.comment;
//     const assessmentId=request.params.id;
//     //const member=memberStore.getMember(memberId);
//     assessmentStore.addComment(comment,assessmentId);
//     response.redirect('memberlist');
//   },
  
  
  
};
module.exports=memberlist;