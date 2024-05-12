const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

// aaise hi authentication banate hai
passport.use(new LocalStrategy(async (USERNAME,password,done) => { // isme 3 parameter leta hai username,passward,done function
    try {

      let user = await Person.findOne({username:USERNAME}); //find user from database
      if(!user) //if user not found
          return  done(null,false,{ message: 'Incorrect username or password.' }); // if username not match in database
  
      const isPasswardMatch = await user.comparePassword(password); // check passward of req body to db passward
  
      if(isPasswardMatch) 
          return done(null,user)
      else 
          return  done(null,false,{message:"Incorrect pasward"}) //if passward not match
    } 
    catch (err) {
      return done(err); // any error in try block
    }
}));
  
module.exports = passport;