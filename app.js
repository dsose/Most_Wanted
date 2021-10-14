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

function searchTraitsGender(people, searchType, control){
    let gender = promptFor("Enter the person's ${searchType} ?", genderCallBack);
    let foundPerson = people.filter(function(person){
      if(person.gender === gender){ 
        return true
      }
      else{
        return false
      }
    });
    return recTraits(foundPerson, control);
  }
  
  
  function searchTraitsDob(people, searchType, control){
    let dob = prompt("Enter the person's ${searchType} ? Please use month/day/year");
    let foundPerson = people.filter(function(person){
      if(person.dob === dob){ 
        return true
      }
      else{
        return false
      }
    });
    return recTraits(foundPerson, control);
  }
  

  function searchTraitsEye(people, searchType, control){
    let eye = promptFor("Enter the person's ${searchType} ?", eyeColorCallBack);
    let foundPerson = people.filter(function(person){
      if(person.eyeColor === eye){ 
        return true
      }
      else{
        return false
      }
    });
    return recTraits(foundPerson, control);
  }
  
  
  function searchTraitsHeight(people, searchType, control){
    let height = prompt("Enter the person's ${searchType} ?");
    notANumber(height, searchType);
    let foundPerson = people.filter(function(person){
      if(person.height == height){ 
        return true
      }
      else{
        return false
      }
    });
    return recTraits(foundPerson, control);
  }
  
  
  function searchTraitsWeight(people, searchType, control){
    let weight = prompt("Enter the person's ${searchType} ?");
    notANumber(weight, searchType);
    let foundPerson = people.filter(function(person){
      if(person.weight == weight){ 
        return true
      }
      else{
        return false
      }
    });
    return recTraits(foundPerson, control);
  }
  

  function searchTraitsParents(people, searchType, control){
    let parents = prompt("Enter the person's ${searchType} ?");
    notANumber(parents, searchType);
    let foundPerson = people.filter(function(person){
      if(person.parents[0] == parents ||person.parents[1] == parents ){ 
        return true
      }
      else{
        return false
      }
    });
    return recTraits(foundPerson, control);
  }
  

  function searchTraitsSpouse(people, searchType, control){
    let spouse = prompt("Enter the person's ${searchType} ?");
    notANumber(spouse, searchType);
    let foundPerson = people.filter(function(person){
      if(person.currentSpouse == spouse){ 
        return true
      }
      else{
        return false
      }
    });
    return recTraits(foundPerson, control);
  }

  
  function searchTraitsOccupation(people, searchType, control){
    let occupation = prompt("Enter the person's ${searchType} ?");
    let foundPerson = people.filter(function(person){
      if(person.occupation == occupation){ 
        return true
      }
      else{
        return false
      }
    });
    return recTraits(foundPerson, control);
  }
  
 
  function promptFor(question, valid){
    do{
      var response = prompt(question).trim();
    } while(!response || !valid(response));
    return response;
  }
  
  function yesNo(input){
    if(input.toLowerCase() != "yes" && input.toLowerCase() != "no"){
      alert("Invalid input. Please try again.");
    }
    return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
  }
  function genderCallBack(input){
    if(input.toLowerCase() != "male" && input.toLowerCase() != "female"){
      alert("Invalid input. Please try again.");
    }
    return input.toLowerCase() == "male" || input.toLowerCase() == "female";
  }
  function mainMenuCallBack(input){
    if(input.toLowerCase() != "info" && input.toLowerCase() != "family" && input.toLowerCase() != "descendants" && input.toLowerCase() != "restart" && input.toLowerCase() != "quit"){
      alert("Invalid input. Please try again.");
    }
    return input.toLowerCase() == "info" || input.toLowerCase() == "family" || input.toLowerCase() == "descendants" || input.toLowerCase() == "restart" || input.toLowerCase() == "quit";
  }
  function eyeColorCallBack(input){
    if(input.toLowerCase() != "black" && input.toLowerCase() != "brown" && input.toLowerCase() != "green" && input.toLowerCase() != "hazel" && input.toLowerCase() != "blue"){
      alert("Invalid input. Please try again.");
    }
    return input.toLowerCase() == "black" || input.toLowerCase() == "brown" || input.toLowerCase() == "green" || input.toLowerCase() == "hazel" || input.toLowerCase() == "blue";
  }
  function searchTypeCallBack(input){
    if(input.toLowerCase() != "gender" && input.toLowerCase() != "dob" && input.toLowerCase() != "eye color" && input.toLowerCase() != "parents" && input.toLowerCase() != "occupation" && input.toLowerCase() != "height" && input.toLowerCase() != "weight" && input.toLowerCase() != "spouse" && input.toLowerCase() != "quit"){
      alert("Invalid input. Please try again.");
    }
    return input.toLowerCase() == "gender" || input.toLowerCase() == "dob" || input.toLowerCase() == "eye color" || input.toLowerCase() == "parents" || input.toLowerCase() == "occupation" || input.toLowerCase() == "height" || input.toLowerCase() == "weight" || input.toLowerCase() == "spouse" || input.toLowerCase() == "quit";
  }
  
 
  function chars(input){
    return true; 
  }
  
 