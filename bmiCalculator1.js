
/*we need to take input from customer (height,weight and age) to calculate BMR

BMR=10*weight(kg)+6.25*height(cm)-5*age.

Burn calories in a day= BMR * 1.4

If we eat 500 less than burn calories a day then we can reduce 0.5kg weight in a week.

Ideal weight=22.5*height(m)*height(m)

Logic defiend how much weight we need to loose( extra weight=actual weight-ideal weight) 
and calculate (extra weight/0.5)

BMI(basal metabolic rate)=weightInKg/(heightInM*heightInM) */


//customer input data :-

if(process.argv.length !==7){

    console.log(`you entered ${process.argv.length-2} arguments to the program

    please provide 5 arguments for 
    
    weight (kg), 
    height (m), 
    age, 
    wether you exercise daily (yes or no)
    and your gender (M or F)

    example:
    $ node index.js 82 1.79 32 yes M
    `);
    process.exit();
}

const weightInKg = parseInt(process.argv[2])
const heightInM = parseFloat(process.argv[3])
const age = parseFloat(process.argv[4])
const dailyExercise = process.argv[5]
const gender = process.argv[6]

//weight,height and age validation:

if(isNaN(weightInKg) || isNaN(heightInM) || isNaN(age)){
    console.log(`Please make sure weight, height and age are numbers:

    weight (kg) example: 82 | your input: ${process.argv[2]}
    height (m) example 1.79 | your input: ${process.argv[3]}
    age (years) example 32  | your input: ${process.argv[4]} 

    example:

    $ node index.js 82 1.79 32 yes m

    `);

    process.exit()
}

//age should not be less than 20:

if (age < 20) {

    console.log(`

      This BMI calculator was designed to be used by people older than 20
  
      BMI is calculated differently for young people.
  
      Please visit: https://en.wikipedia.org/wiki/Body_mass_index#Children_(aged_2_to_20)
  
      For more information

    `);
  
    process.exit();

  }

// weight range (30<weightInKg<300)

  if(weightInKg <30 || weightInKg > 300)

  { console.log(`
  
  Please enter a weight in kgs
    
  Your weight of ${weightInKg} kgs does not fall in the range between 30 kg and 300 kg

  If you weight is below 30 kg or over 300 kg seek professional medical help`);

  process.exit()
   
  }

//Daily exercise validation:

if(dailyExercise !== "yes" &&  dailyExercise !== "no"){
    console.log(` 

    Please specify wether you exercise daily with yes or no

    you entered: ${dailyExercise}

    `);

    process.exit();
}

//Gender validation:

if(gender !== "m" && gender !=="f"){
    console.log(`
    Please specify wether you are a male "m" or female "f"`);
    process.exit()
}


//calculating BMI

const BMI = weightInKg / (heightInM*heightInM);


//calculating weight rang

const maxWeight = 25* heightInM* heightInM   //maximum weight limit

const minWeight = 18.5 * heightInM * heightInM  //minimum weight limit

const idealWeight = 22.5 * heightInM * heightInM  //ideal weight


if(weightInKg > maxWeight)
 {

    weightLimit = ("You are " + Math.round(weightInKg-maxWeight) + "kg" + " " + "overweight")
 }

if(weightInKg > minWeight && weightInKg < maxWeight)

{

    weightLimit = ("You are fit") 
}
 
if(weightInKg < minWeight)

{

     weightLimit = ("You are " + Math.round(weightInKg-minWeight) + "kg" + " " + "underweight")

 }


//calculating per day calories burn =(BMR *1.4 or BMR*1.6)

const heightInCm = heightInM * 100

const BMR1 = 10 * weightInKg + 6.25 * heightInCm - 5 * age

const BMR = gender === "M" ? BMR1 + 50 : BMR1 - 150 ;

const dailyCalories = dailyExercise === "yes" ? BMR * 1.6 : BMR * 1.4;


if(weightInKg > idealWeight)
{
    suggestedCalories=dailyCalories-500 
}
else{

    suggestedCalories = dailyCalories + 500 
}



// calculating how many weeks have to eat suggested calories.

const extraWeight=weightInKg-idealWeight

const NumberOfWeeks=extraWeight/0.5



 //output display

console.log(`
************************************
BMI CALCULATOR
*************************************

weight:${weightInKg}kg

Height:${heightInM}m

Age:${age}years

Daily Excercise:${dailyExercise}

Gender:${gender}

**************************************
 FACING THE FACTS
***************************************

 Your BMI is ${Math.round(BMI)}

 A BMI under 18.5 is considered underweight
 A BMI above 25 is considered overweight


^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
 IDEAL WEIGHT CALCULATOR
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
Your ideal weight shoud be:${Math.round(idealWeight)}kg

Your weight should not be more than :${Math.round(maxWeight)}kg

Your weight shoud not be less than:${Math.round(minWeight)}kg

Status: ${weightLimit}.


@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

BMR & Daily calories calculator

@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

with a normal lifestyle you burn :${Math.round(dailyCalories)} calories a day

DIET PLAN:

 If you want reach your ideal weight of :${Math.round(idealWeight)}kg:

 Eat:${Math.round(suggestedCalories)} in a day

 For:${Math.abs(Math.round(NumberOfWeeks))} weeks

`)
