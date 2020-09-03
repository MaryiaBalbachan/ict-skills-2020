'use strict';

const logger=require('./logger');
const assessmentStore=require('../models/assessment-store.js');
const memberStore=require('../models/member-store.js');
                             
                             

const analytics={
  
  bmi(id) {
    const member = memberStore.getMember(id);
    const assessments = assessmentStore.getMemberAssessments(id);
    if (assessments.length === 0) {
      const bmi = member.startingweight/((member.height)*(member.height));
      return Math.round(bmi * 100) / 100;
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
  
  isIdealBodyWeight(id){
    const member=memberStore.getMember(id);
    const assessments=assessmentStore.getMemberAssessments(id);
    const heightInInches = member.height * 39.37;
    let weight=member.weight;
    let idealWeightM = 50 + ((heightInInches - 60) * 2.3);
    let idealWeightF = 45.5 + ((heightInInches - 60) * 2.3);
    if ((heightInInches <= 60) && (member.gender.toUpperCase()==="M)" && (weight >= 49) && (weight <=51))) {
            return true;
        } else if ((heightInInches <= 60) && (member.gender.toUpperCase()==="F") && (weight > 44) && (weight < 46)) {
            return true;
        } else if ((member.gender.toUpperCase()==="M") && (weight > idealWeightM - 1.0) && (weight < idealWeightM + 1.0)) {
            return true;
        } else if ((member.gender.toUpperCase()==="F") && (weight > idealWeightF - 1.0) && (weight < idealWeightF + 1.0)) {
            return true;       
        } else {
            return false;
        }
    }

    
  }



module.exports=analytics;