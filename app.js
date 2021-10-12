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
    alert("Could not find that individual.");
    return app(people); 
  }

  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  if (displayOption === null) {
    app(people);
}
else {
    displayOption = displayOption.toLowerCase(); 

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
  // TODO: find the person using the name they entered
  return foundPerson;
}

function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person , people){
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Occupation: " + person.occupation + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Parents: " + person.parents + "\n";
  personInfo += "Current Spouse: " + person.spouse + "\n";
  personInfo += "Age: " + person.age + "\n";    //We will have to fix this one
  
  alert(personInfo);
}


function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
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
