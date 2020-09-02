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
  
  removeAssessment(id) {
    const assessment = this.getAssessment(id);
    this.store.remove(this.collection, assessment);
    this.store.save();
  },
  
  // addComment(id){
  //   this.store.add(this.collection, id);
  //   this.store.save();
  // }
  
  addComment(comment,assessmentId){
    const assessment=this.getAssessment(assessmentId);
    assessment.comment=comment;
    this.store.save();
    
  },
    
//   },
//   // addAssessment(id,) {
  //   const member= this.getMember(id.id);
  //   member.assessments.unshift(assessment);
  //   this.store.save();
  // },


};

module.exports=assessmentStore;