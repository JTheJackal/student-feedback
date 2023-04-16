// Init
window.initBadges = () => {

    let badgeElements   = document.getElementsByClassName("badge-image");

    // Store reference of all badges for future use
    for(let i = 0; i < badgeElements.length; i++){

        badges.push(new Badge(badgeElements[i]));
    }
}

// Add or remove a selected class to a badge
window.toggleBadge = (element) => {

    // Loop through badges to find which one to handle
    for(let i = 0; i < badges.length; i++){

        if(badges[i].getName() === element.dataset.badge){

            // Toggle selected
            badges[i].toggleSelected();
        }
    }
}

// Select or Deselect all, depending on current state
window.chooseAll = () => {

    let unselectedFound = false;

    // Loop through badges to find any which are not selected
    for(let i = 0; i < badges.length; i++){

        if(!badges[i].getSelected()){

            unselectedFound = true;
        }
    }

    if(unselectedFound){

        // An unselected badge was found, so loop through badges and set them as selected
        for(let i = 0; i < badges.length; i++){

            badges[i].setSelected(true);
        }
    }else{

        // All badges were already selected, so set them all to unselected
        for(let i = 0; i < badges.length; i++){

            badges[i].setSelected(false);
        }
    }
}