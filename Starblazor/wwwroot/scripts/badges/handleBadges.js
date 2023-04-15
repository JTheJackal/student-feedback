window.handleBadge = (element) => {

    let badgeName   = element.dataset.badge;
    let index       = null;
    let found       = false;


    for(let i = 0; i < selectedBadges.length; i++){ 
                                   
        if (selectedBadges[i] === badgeName) { 
             
            index = i;
            found = true;
        }
    }

    // Check selected badges to see if it already exists
    if(found){

        // Remove it
        selectedBadges.splice(index, 1);
    }else{

        // Add it
        selectedBadges.push(badgeName);
    }
}