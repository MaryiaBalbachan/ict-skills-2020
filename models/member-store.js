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

  removeMember(id) {
    const member = this.getMember(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },
  
};



module.exports=memberStore;