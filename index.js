const localStorageKey = "contacts";
let contacts = [];
let searchWord = "";
const termsConditions = document.getElementById("gridCheck");

const update = () =>{
    window.localStorage.setItem(localStorageKey, JSON.stringify(contacts));
    render(); 
}

//Create cards with input details
const render = () =>{

    const contactsDiv = document.querySelector("#input_container #output_container");
    contactsDiv.innerHTML = null;

    contacts.filter(contact => {
        return (
        contact.name.includes(searchWord) || 
        contact.email.includes(searchWord) ||
        contact.phone.includes(searchWord) ||
        contact.skills.includes(searchWord) ||
        contact.city.includes(searchWord)
        );
        
    }).forEach((contact, index) => {

       const fieldContainer = contact.isEditing ? "input" : "div";
        
        //Main information card
        const informationCard = document.createElement("div");
        informationCard.className = "card";
        informationCard.style = "width: 18rem;";
        informationCard.setAttribute = ("data-id",index);

        //Main text area
        const textArea = document.createElement("div");
        textArea.className = contact.isFavorite ? "card-body bg-primary" : "card-body";
        informationCard.appendChild(textArea);

        //Header with skills
        const headerSkills = document.createElement("h5");
        headerSkills.className = "card-title";
        textArea.appendChild(headerSkills);

        //Subtitle with city
        const subtitleCity = document.createElement("h6");
        subtitleCity.className = "card-subtitle mb-2 text-muted";
        textArea.appendChild(subtitleCity);

        //Main text area with all contact details
        const cardText = document.createElement("p");
        cardText.className = "card-text";
        textArea.appendChild(cardText);
        const name = document.createElement(fieldContainer);
	    const phone = document.createElement(fieldContainer);	
        const email = document.createElement(fieldContainer);
        
        cardText.appendChild(name);
	    cardText.appendChild(phone);
        cardText.appendChild(email);
        
        //Create favorite button
        const favoriteButton = document.createElement("button");
        favoriteButton.type = "button";
        favoriteButton.className = "btn btn-success btn-sm";
        favoriteButton.id = "favoriteButton"
        favoriteButton.textContent = contact.isFavorite ? "FAVORITE ❤️" : "ADD FAVORITE";
        informationCard.appendChild(favoriteButton);
        //Create edit button
        const editButton = document.createElement("button");
        editButton.type = "button";
        editButton.className = "btn btn-warning btn-sm";
        editButton.id = "editButton"
        editButton.textContent = contact.isEditing ? "SAVE" : "EDIT";
        informationCard.appendChild(editButton);
        //Create delete button
        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "btn btn-danger btn-sm";
        deleteButton.id = "deleteButton"
        deleteButton.textContent = "DELETE";
        informationCard.appendChild(deleteButton);

        //Enter all details to card
        headerSkills.textContent = contact.skills;
        subtitleCity.textContent = contact.city;

        if(contact.isEditing){
            name.value = contact.name;
            phone.value = contact.phone;
            email.value = contact.email;
        }
        else{
            name.textContent = `${contact.name} ${contact.surname}`;
	        phone.textContent = `📞: ${contact.phone}`;
	        email.textContent = `📧: ${contact.email}`;
        }

        contactsDiv.appendChild(informationCard);
        //Delete button function
        deleteButton.addEventListener("click", () =>{
            contacts.splice(index, 1);
            update();
        })
        //Favorite button function
        favoriteButton.addEventListener("click", () => {
            contacts[index].isFavorite = !contact.isFavorite;
            update();
        })
        //Edit button function
        editButton.addEventListener("click", () =>{
            if(contact.isEditing){
                contacts[index].name = name.value;
                contacts[index].email = email.value;
                contacts[index].phone = phone.value;
            }
            contacts[index].isEditing = !contact.isEditing;

            update();
        });

    });

}

//Load from local storage
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("input_form").reset(); 
    contacts = JSON.parse(window.localStorage.getItem(localStorageKey)) || [];
    render();
});

 //Read input data
document.querySelector(`#input_container #new_contact`).addEventListener("submit", event =>{
    event.preventDefault();
        
        const newContact = {
            name: document.getElementById("name").value,
            surname: document.getElementById("surname").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            skills: document.getElementById("skills").value,
            city: document.getElementById("city").value
       }
    if(termsConditions.checked == true){
       contacts.push(newContact);
       update();
    }
    else{
        alert("Please fill all required fields")
    }
});

//Search field and button
navigation.addEventListener("click", event =>{
    if (event.target.tagName === "BUTTON"){
        searchWord = document.getElementById("searchField").value;
        render();
    }
});
function aboutFunction() {
    document.getElementById("about-Link").click(alert('Created by: Evaldas Danilevicius'));
}