/*we need to take input from customer (height,weight and age) to calculate BMR

BMR=10*weight(kg)+6.25*height(cm)-5*age.

Burn calories in a day= BMR * 1.4

If we eat 500 less than burn calories a day then we can reduce 0.5kg weight in a week.

Ideal weight=22.5*height(m)*height(m)

Logic defiend how much weight we need to loose( extra weight=actual weight-ideal weight) 
and calculate (extra weight/0.5)

BMI(basal metabolic rate)=weightInKg/(heightInM*heightInM) */

//BMI calculation

function calculateBMI(weight , height)
{
    
return weight/(height * height);

}

//BMR calculation

function calculateBMR(weight,height,ageOfUser,genderOfUser)
{
    const heightInCm = height * 100;

    let BMR;

    if (genderOfUser === "m"){

    BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser + 50 ;

    } else{

        BMR = 10 * weight + 6.25 * heightInCm - 5 * ageOfUser - 150 ;
    }
    return BMR;

    }

//Daily calories burn calulation

function calories(exercise,bmr){

return( exercise === "yes" ? bmr *1.6 : bmr * 1.4);
}
 
//Ideal weight calculation:

function idealWeightCalculate(height){

    return(22.5 * height * height);
}

//Weight  range limit

function weightLimit(height,weight)
{
    const maxWeight = 23.5 * height * height;
    const minWeight = 18.5 * height * height;

    if( weight > maxWeight ) {

        weightUpdate =  ("You are " + Math.round(weight-maxWeight) + "kg" + " " + "overweight")
    }
    if(weight > minWeight && weight< maxWeight){

     weightUpdate = ("You are fit")
    }
    if(weight < minWeight){

        weightUpdate = ("You are " + Math.round(minWeight-weight) + "kg" + " " + "underweight")
    }

    return(weightUpdate)
}


//Diet calories calculation

function caloriesEat(extraWeight,dailyCalories){
    return(extraWeight > 0 ? dailyCalories-500 : dailyCalories + 500);
}

//validation

function validateNumberOfInputs(argv)
{
    if(argv.length !== 7){
        console.log(`you gave ${argv.length-2} argument(s) to the program 

        please provide 5 arguments for

weight(kg),

height(m),

age(years),

wether you exercise daily (yes or no)

and your gender (m or f)

example:

$ node bml-cal2.js 82 1.75 32 y m

        `)
        process.exit()
    }

}

//weight height age should be a number.

function weightHeightAgeNumber(weight,height,age)
{

if(isNaN(weight) || isNaN(height) || isNaN(age)){
    console.log(`Please make sure weight, height and age are numbers:

    weight (kg) example: 82 | your input: ${process.argv[2]}
    height (m) example 1.79 | your input: ${process.argv[3]}
    age (years) example 32  | your input: ${process.argv[4]} 

    example:

    $ node index.js 82 1.79 32 yes m

    `);

    process.exit()
}
}

// age should not be less than 20.

function ageLimit(age){

    if(age<20){

        console.log(`This BMI calculator was designed to be used by people older than 20
  
        BMI is calculated differently for young people.
    
        Please visit: https://en.wikipedia.org/wiki/Body_mass_index#Children_(aged_2_to_20)
    
        For more information
  
      `);
    
      process.exit();
    }
}

// weight should not be more than 300kg and not less than 30kg.

function weightRange(weight){

    if(weight>300 || weight<30){

        console.log(`Please enter a weight in kgs
    
        Your weight of ${weightInKg} kgs does not fall in the range between 30 kg and 300 kg
      
        If you weight is below 30 kg or over 300 kg seek professional medical help`);
      process.exit()
    }
}

// Input of daily exercise should be yes or no.

function exercise(yoga){
    if(yoga !== "yes" && yoga !== "no")

    { console.log(`Please specify wether you exercise daily with yes or no
    
    you entered: ${yoga}
    
    `)

    process.exit()
}
}

// Gender should be m or f

function genderDetail(gender){

    if(gender !== "m" && gender !== "f"){

        console.log(`Please specify wether you are a male "m" or female "f" `)

        process.exit()
    }
}

// Height validation

function heightLimit(height){

    if(height<1){

        console.log("please enter valid height");
        process.exit();
    }
}

//output

function formateOutput(userInput)
{ return`
    **************
    BMI CALCULATOR
    **************

    Age: ${userInput.age} years

    Gender: ${userInput.gender}

    Height: ${userInput.heightInM} m

    Weight: ${userInput.weightInKg} kg

    Do you exercise daily?: ${userInput.dailyExercise}

    ****************
    FACING THE FACTS
    ****************

    Your BMI is ${userInput.BMI}

    A BMI under 18.5 is considered underweight
    A BMI above 25 is considered overweight

    Your ideal weight is ${userInput.idealWeightKg} kg

    Weight range according to your height:
    Max:${userInput.maxWeightLimit} kg and Min:${userInput.minWeightLimit} kg

    Status: ${userInput.weightrange}.

    With a normal lifestyle you burn ${userInput.dailyCalories} calories a day

    **********
    DIET PLAN
    **********

    If you want to reach your ideal weight of ${userInput.idealWeightKg} kg:

    Eat ${userInput.dietCalories} calories a day

    For ${userInput.dietWeeks} weeks
    `;
}




function bmiCalculator()
{
    validateNumberOfInputs(process.argv);

    const weightInKg = parseInt(process.argv[2]);

    const heightInM=parseFloat(process.argv[3]);
    
    const age = parseFloat(process.argv[4]);

    const dailyExercise = process.argv[5];

    const gender = process.argv[6];

    weightHeightAgeNumber(weightInKg,heightInM,age);

    ageLimit(age);

    weightRange(weightInKg);

    exercise(dailyExercise);
    
    genderDetail(gender);

     heightLimit(heightInM);



    const BMI = Math.round(calculateBMI ( weightInKg , heightInM ));

    const BMR = calculateBMR ( weightInKg , heightInM , age , gender);

    const burnDailyCalories = calories(dailyExercise,BMR);

    const idealWeight = Math.round(idealWeightCalculate(heightInM));

    const weightToLoseKg = Math.abs (weightInKg-idealWeight);

    const eatDailyCalories= caloriesEat (weightToLoseKg,burnDailyCalories);

    const dietWeek = Math.round (weightToLoseKg/0.5);

    const weightStatus = weightLimit (heightInM,weightInKg)

    const maxWeightLimit = Math.round(23.5 * heightInM * heightInM);

    const minWeightLimit = Math.round(18.5 * heightInM * heightInM);



  
   const user = {

    weightInKg: weightInKg,

    heightInM: heightInM,

    age: age,

    dailyExercise: dailyExercise,

    gender: gender,

    BMI: BMI,

    idealWeightKg: idealWeight,

    dailyCalories: burnDailyCalories,

    weightToLoseKg: weightToLoseKg,

    dietWeeks: dietWeek,

    dietCalories: eatDailyCalories,

    weightrange: weightStatus,

    maxWeightLimit: maxWeightLimit,

    minWeightLimit: minWeightLimit

    };

   const output= formateOutput(user)
   console.log(output)
   

}

   bmiCalculator();
   
   