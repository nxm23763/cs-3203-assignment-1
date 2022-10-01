var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 3000;
//var currentID = 1;

app.use(express.static(__dirname));
app.use(bodyParser.json());

var fs = require('fs');


//global variable for tweet data
var tweetinfo = []

//global variable for searched tweet data
var searchedtweets = []

//global variable for searched tweet data array size
var searchedsize = 0;

//load the input file
fs.readFile('favs.json', 'utf8', function readFileCallback(err,data ){
  if(err){
    req.log.info('cannot load a file:' + fileFolder + '/' + _file_name)
    throw err;
  }
  else {
    //DONE: store loaded data into a global variable for tweet data
    tweetinfo = JSON.parse(data);
  }
});
 


//Get functions
//Shows user info ("Get Users")
app.get('/tweets', function(req, res) {
  //send all users' IDs
  res.send({tweetinfo:tweetinfo}); // read data from favs.json file
});

//Shows tweet info ("Get Tweets")
app.get('/tweetinfo', function(req, res) {
  //send tweet info
  res.send({tweetinfo:tweetinfo}); // read data from favs.json file
});

//Shows searched tweets ("Recently Searched")
app.get('/searchinfo', function(req, res){
  //send searched tweets
  res.send({searchedtweets:searchedtweets}); // read data from original searchedtweets array
});

//Post functions
//Posts created tweets ("Create Tweet")
app.post('/tweetinfo', function(req, res) {
  //create a tweet.
  var tweetname = req.body.name;
  const parsedTweetName = tweetname.split(';'); // split tweet name by ; into ID and text
  var createdTweetID = parsedTweetName[0]; // ID part of user input
  var createdTweetText = parsedTweetName[1]; // text part of user input
  let currentDate = new Date().toString(); // generates the current date and time for "Created At" category

  tweetinfo.push({ //push both ends of user input and current date and time to new td categories in tr
    id_str: createdTweetID,
    text: createdTweetText,
    created_at: currentDate
  });
  res.send('Successfully created tweet!');

});

//Posts searched tweets ("Search")
app.post('/searchinfo/:tweetID', function(req, res) {
  //search a tweet
  // for loop same as delete except instead of deleting tweet, save into new global variable
  var id = req.params.tweetID;

  tweetinfo.forEach(function(tweet) {
    if (tweet.id_str === id) { // see if this matches user input for ID in box
      searchedtweets[searchedsize] = tweet; // add tweet to next available slot in searchedtweets and increment counter
      searchedsize++;
    }
  });

  res.send('Successfully searched tweet!');
});

//Update ("Update User")
app.put('/tweets/:nm', function(req, res) {
  var oldName = req.params.nm; // old name
  var newName = req.body.newName; // new name

  var found = false; // this checks to ensure screen name is updated only one time

  tweetinfo.forEach(function(tweet) {
    if (!found && tweet.user.name == oldName) { // if tweet isn't found and target is located in list of user names...
      tweet.user.screen_name = newName; // ...assign newName to become new screen name of that user and mark found as true
      found == true;
    }
  });

  res.send('Successfully updated tweet!');
});

//Delete ("Delete Tweet")
app.delete('/tweetinfo/:tweetid', function(req, res) {
  //delete a tweet
  var id = req.params.tweetid; // ID to delete

  var found = false; // this checks to ensure given ID is deleted only one time

  tweetinfo.forEach(function(tweet, index) {
    if (tweet.id_str === id) { // see if this matches user input for ID in box
      tweetinfo.splice(index, 1); // splice to remove tweet from database
    }
  });

  res.send('Successfully deleted tweet!');

});


app.listen(PORT, function() {
  console.log('Server listening on ' + PORT);
});