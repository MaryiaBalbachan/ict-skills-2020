'use strict';

const logger=require('../utils/logger');
const memberStore=require('../models/member-store.js');

const memberlist={
  
  index(request,response){
    const memberId=request.params.id;    
    logger.info('member id ='+memberId);
    const viewData={
      title:'memberList',
      member:memberStore.getMember(memberId),
    };
    response.render('memberlist',viewData);
  },
  
  // deleteAssessment(request,response){
  //   const memberId=request.params.id;
  //   const assessmentId=request.params.assessmentid;
  //   logger.debug(`deleting assessment ${assessmentId} from Memberlist ${memberId}`);
  //   memberStore.removeAssessment(memberId, assessmentId);
  //   response.redirect('/memberlist/'+memberId);
  // },
  
  
};
module.exports=memberlist;