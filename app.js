"use strict"

function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
        searchByTraits(people);    
        break;
    default:
        app(people);
        break;
  }
  
      mainMenu(searchResults, people);
}


function mainMenu(personArray, people){

  if(!personArray){
    console.log("Could not find that individual.");
    return app(people); 
  }

  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  if (displayOption === null) {
    app(people);
    }
    else {
        displayOption = displayOption.toLowerCase(); 
    }
  switch(displayOption){
    case "info":
        displayPerson(personArray[0], people)
        break;
    case "family":
        displayFamily(personArray[0], people);
        break;
    case "descendants":
        displayDescendants(personArray[0], people);
        break;
    case "restart":
        app(people); 
        break;
    case "quit":
        return; 
    default:
        return mainMenu(person, people);
    }     
}

function searchByTraits(people) {

    let listed = "";
    let filteredList;
  
    filteredList = searchByAge(people);
    filteredList = searchByHeight(filteredList);
    filteredList = searchByWeight(filteredList);
    filteredList = searchByOccupation(filteredList);
    filteredList = searchByEyeColor(filteredList);


}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  
  return foundPerson;
}

function displayPeople(people){
  console.log(people.map(function(person){
    return person.firstName + " " + person.lastName;
    }).join("\n"));

    if (filteredList.length === 22) {
        console.log("There is no one to display.");
    }
    else if (filteredList.length === 0) {
        console.log("There is no one that matches that name.");
    }
    else {
        for (let i = 0; i < filteredList.length; i++) {
            listed += filteredList[i].firstName + " " + filteredList[i].lastName + ". ";
        }
        console.log(listed);
    }

    app(people);
    
}

function searchByHeight(people) {
    let heightSearch = promptFor("Do you want to search by height? Enter yes or no.", yesNo).toLowerCase();

    switch (heightSearch) {
        case "yes":
            let findHeight = lookUpHeight(people);
            return findHeight;
        case "no":
            return people;
        default:
            searchByHeight(people);
            break;
    }
}

function searchByWeight(people) {
    let weightSearch = promptFor("Do you want to search by weight? Enter yes or no.", yesNo).toLowerCase();

    switch (weightSearch) {
        case "yes":
            let findWeight = lookUpWeight(people);
            return findWeight;
        case "no":
            return people;
        default:
            searchByWeight(people);
            break;
    }
}

function searchByOccupation(people) {
    let occupationSearch = promptFor("Do you want to search by occupation? Enter yes or no.", yesNo).toLowerCase();

    switch (occupationSearch) {
        case "yes":
            let findOccupation = lookUpOccupation(people);
            return findOccupation;
        case "no":
            return people;
        default:
            searchByOccupation(people);
            break;
    }
}

function searchByEyeColor(people) {
    let eyeColorSearch = promptFor("Do you want to search by eye color? Enter yes or no.", yesNo).toLowerCase();

    switch (eyeColorSearch) {
        case "yes":
            let findEyeColor = lookUpEyeColor(people);
            return findEyeColor;
        case "no":
            return people;
        default:
            searchByEyeColor(people);
            break;
    }
}

function lookUpOccupation(people) {

    let occupation = promptFor("What is the person's occupation?", chars);
    let occupationFilteredArray = people.filter(function (element) {

        if (element.occupation === occupation) {
            return true;
        }
    });

    return occupationFilteredArray;
}

function lookUpEyeColor(people) {

    let eyeColor = promptFor("What is the person's eye color?", chars);
    let eyeColorFilteredArray = people.filter(function (element) {

        if (element.eyeColor === eyeColor) {
            return true;
        }
    });

    return eyeColorFilteredArray;
}

function lookUpHeight(people) {

    let height = parseInt(promptFor("What is the person's height?", chars));
    let heightFilteredArray = people.filter(function (element) {

        if (element.height === height) {
            return true;
        }
    });

    return heightFilteredArray;
}

function lookUpWeight(people) {

    let weight = parseInt(promptFor("What is the person's weight?", chars));
    let weightFilteredArray = people.filter(function (element) {

        if (element.weight === weight) {
            return true;
        }
    });

    return weightFilteredArray;
}

function changeDobToAge(people) {
  
    let peopleAge = people(function (element) {
        let dateOfBirth = new Date(element.dob);
        let currentDate = new Date();
        let result = currentDate - dateOfBirth;
        let age = Math.floor(result);
        return element.age = age;
    });
}

function searchByAge(people) {

    let ageSearch = promptFor("Do you want to search by age? Enter yes or no.", yesNo).toLowerCase();

    switch (ageSearch) {
        case "yes":
            changeDobToAge(people);
            let findAge = lookUpAge(people);
            return findAge;
        case "no":
            return people;
        default:
            searchByAge(people);
            break;
    }
        


}


  
  

function displayPerson(personArray , people){
  let personInfo = "First Name: " + personArray.firstName + "\n";
  personInfo += "Height: " + personArray.height + "\n";
  personInfo += "Weight: " + personArray.weight + "\n";
  personInfo += "Occupation: " + personArray.occupation + "\n";
  personInfo += "Eye Color: " + personArray.eyeColor + "\n";
  personInfo += "Parents: " + personArray.parents + "\n";
  personInfo += "Current Spouse: " + personArray.spouse + "\n";
  personInfo += "Age: " + personArray.age + "\n";   
}

function promptFor(question, valid){
  do{
    let response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}


