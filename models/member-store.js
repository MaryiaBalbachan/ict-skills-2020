'use strict';

const _=require('lodash');
const JsonStore=require('./json-store');
const logger=require('../utils/logger');

const memberStore={
  
  store: new JsonStore('./models/member-store.json', {memberCollection:[]}),
  collection:'memberCollection',
  
  
  getAllMembers(){
    return this.store.findAll(this.collection);
  },
  
  getMember(id){
    return this.store.findOneBy(this.collection, {id:id});
  }, 
  
  addMember(member){
    this.store.add(this.collection, member);
    this.store.save();
  },
  
  getMemberByEmail(email){
    return this.store.findOneBy(this.collection, {email:email});
  },
  
  getMemberPassword(password){
    return this.store.findOneBy(this.collection, {password:password});
  },
  
  // getUser(userid){
  //   return this.store.findBy(this.collection, {userid: userid});
  // },
  
  
  getAssessment(member, assessmentId){
    const assessments=member.assessments;
    return _.find(assessments,{id:assessmentId})
  },
  
  addComment(comment,member,assessmentId){
    const assessment=this.getAssessment(member, assessmentId);
    assessment.comment=comment;
    this.store.save();
    
  },

  removeMember(id) {
    const member = this.getMember(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },


  addAssessment(id, assessment) {
    const member= this.getMember(id.id);
    member.assessments.push(assessment);
    this.store.save();
  },

  removeAssessment(id, assessmentId) {
    const member = this.getMember(id);    
    _.remove(member.assessments, { id: assessmentId});
    this.store.save();
  },
  
//   removeAssessment(id, assessmentId) {
//     //const member = this.getMember(id);
//     const assessments = loggedInMember.assessment;
//     logger.debug('deleting assessment')
//     _.remove(assessments, { id: assessmentId});
//     this.store.save();
//   },
  
  // removeAssessment(loggedInMember, assessmentId){
  //   const member=this.getMember(loggedInMember);
  //   _.remove(member.assessments, {assessmentId:assessmentId});
  //   this.store.save();
  // }
};



module.exports=memberStore;