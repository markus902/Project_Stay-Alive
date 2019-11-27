//Get Authentication Data
//Get User Data

// Check if User exist in Database
  //If User
      //Current date - last login
      //If Greater then 1 day:
        //Check Items
          //If marked as Used
            //Add bonus to User appropriate User Data
        // Check Task
            //if completed add to experience
            //if Daily Remake Task
            //if Weekly
              //Check last created Date compared to today
                //if more then 7
                  //if Uncompleted Minus from Health
                  //recreate
            //if monthly
                //check Last created Date compared to today:
                  //if more then 30:
                    //if Uncompleted Minus from Health
                    //recreate
        //Check Experience
          //get Level based on Experience Number
          //if level is greater then current
            //update character level
            //Add more health
            //give reward Items for level

      //If Less then 1 Day:
        //Do Nothing

  //redirect to character dashboard


  //if no User
    // Check values from User Auth
      // If missing data ask for additional
    //redirect to character creation