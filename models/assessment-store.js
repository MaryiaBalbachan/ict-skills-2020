'use strict';

const _=require('lodash');
const JsonStore=require('./json-store');
const logger=require('../utils/logger');

const assessmentStore={
  store: new JsonStore('./models/assessment-store.json', {assessmentCollection:[]}),
  collection:'assessmentCollection',
  
  getAllAssessments(){
    return this.store.findAll(this.collection);
  },
  
  getAssessment(id){
    return this.store.findOneBy(this.collection, {id:id});
  },  
  
  getMemberAssessments(memberid){
    return this.store.findBy(this.collection, {memberid:memberid})
  },
  
  addAssessment(assessment){
    this.store.add(this.collection, assessment);
    this.store.save();
  },
  
  assessmentCount(memberid){
    return assessmentStore.getMemberAssessments(memberid).length; 
    
  },
  
  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },  
  
  
  addComment(comment,assessmentId){
    const assessment=this.getAssessment(assessmentId);
    assessment.comment=comment;
    this.store.save();
    logger.info("attempting to save to store");
    
  },
};

module.exports=assessmentStore;