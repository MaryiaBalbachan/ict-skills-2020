//Utility used to create member analytics: bmi, bmi category, trend and determine whether the member 
//is at idela body weight based on the latest assessment or starting weight if no assessments have been added.
'use strict';

const logger=require('./logger');
const assessmentStore=require('../models/assessment-store.js');
const memberStore=require('../models/member-store.js');
                             
                             

const analytics={
  
  bmi(id) {
    const member = memberStore.getMember(id);
    const assessments = assessmentStore.getMemberAssessments(id);
    if (assessments.length <1) {
      const bmi = member.startingweight/((member.height)*(member.height));
      return Math.round(bmi);
    }
    
    else {
      const bmi = assessments[assessments.length-1].weight/((member.height)*(member.height));
      return Math.round(bmi);
    }  
  },  
  
  bmiCategory(id) {
    const member=memberStore.getMember(id);
    const assessments=assessmentStore.getMemberAssessments(id);
    const bmi=this.bmi(id);    
        if (bmi < 16) {
            return "Severely Underweight";
        } else if (bmi >= 16 && bmi < 18.5) {
            return "Underweight";
        } else if (bmi >= 18.5 && bmi < 25) {
            return "Normal";
        } else if (bmi >= 25 && bmi < 30) {
            return "Overweight";
        } else if (bmi >= 30 && bmi < 35) {
            return "Moderately Obese";
        } else if (bmi >= 35) {
            return "Severely Obese";
        } else {
            return "Invalid BMI Value";
        }
    },
  
  trend(id){
    const member=memberStore.getMember(id);
    const assessments=assessmentStore.getMemberAssessments(id);    
    let trend=true;
    if(assessments.length>1){
      let weight1=parseInt(assessments[assessments.length-2].weight)
      logger.info("weight1 "+weight1)          
      let weight0=parseInt(assessments[assessments.length-1].weight)
      logger.info("weight0 "+weight0)
      trend=weight1>weight0      
      //trend=parseInt(assessments[assessments.length-2].weight)>parseInt(assessments[assessments.length-1].weight)
      logger.info("checking trend "+trend);
    }
    return trend;    
  },
  
  isIdealBodyWeight(id){
    const member=memberStore.getMember(id);
    const assessments=assessmentStore.getMemberAssessments(id);
    const heightInInches = member.height * 39.37;
    const idealWeightM = 50 + ((heightInInches - 60) * 2.3);
    logger.info("ideal weight m "+idealWeightM);
    const idealWeightF = 45.5 + ((heightInInches - 60) * 2.3);
    logger.info("ideal weight f "+idealWeightF);
    logger.info("height"+heightInInches);
    if (assessments.length<1){
    const weight=member.startingWeight;
    logger.info("weight "+weight);
    
    if ((heightInInches <= 60) && (member.gender.toUpperCase()==="M)" && (weight >= 49) && (weight <=51))) {
      logger.info("true");
      
            return true;
        } else if ((heightInInches <= 60) && (member.gender.toUpperCase()==="F") && (weight > 44) && (weight < 46)) {
          logger.info("true");           
            return true;
        } else if ((member.gender.toUpperCase()==="M") && (weight > idealWeightM - 1) && (weight < idealWeightM + 1)) {
          logger.info("true");          
            return true;
        } else if ((member.gender.toUpperCase()==="F") && (weight > idealWeightF - 1) && (weight < idealWeightF + 1)) {
          logger.info("true");           
            return true;       
        } else {
          logger.info("false");
            return false;
        }
    }
    else{
      const weight=assessments[assessments.length-1].weight;
      logger.info("barts weight"+weight);
       if ((heightInInches <= 60) && (member.gender.toUpperCase()==="M)" && (weight >= 49) && (weight <=51))) {
      logger.info("true");         
            return true;
        } else if ((heightInInches <= 60) && (member.gender.toUpperCase()==="F") && (weight > 44) && (weight < 46)) {
          logger.info("true");
            return true;
        } else if ((member.gender.toUpperCase()==="M") && (weight > idealWeightM - 1) && (weight < idealWeightM + 1)) {
          logger.info("true");
            return true;
        } else if ((member.gender.toUpperCase()==="F") && (weight > idealWeightF - 1) && (weight < idealWeightF + 1)) {
          logger.info("true");  
            return true;       
        } else {
          logger.info("false");
            return false;
        }      
    }
  }
  }

module.exports=analytics;