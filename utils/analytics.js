const analytics={
  
//   bmi(member){
    
    
//   },
  
  
  
  determineBMICategory(bmiValue) {
    
        if (bmiValue < 16) {
            return "SEVERELY UNDERWEIGHT";
        } else if (bmiValue >= 16 && bmiValue < 18.5) {
            return "UNDERWEIGHT";
        } else if (bmiValue >= 18.5 && bmiValue < 25) {
            return "NORMAL";
        } else if (bmiValue >= 25 && bmiValue < 30) {
            return "OVERWEIGHT";
        } else if (bmiValue >= 30 && bmiValue < 35) {
            return "MODERATELY OBESE";
        } else if (bmiValue >= 35) {
            return "SEVERELY OBESE";
        } else {
            return "INVALID BMI VALUE";
        }
    }

}

module.exports.analytics;