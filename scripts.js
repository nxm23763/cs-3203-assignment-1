
$(function() {
   //Get 
   $('#get-button').on('click', function() { // this links to the "Get Users" button
        //get all users' IDs & display it
        $.ajax({
          url: '/tweets',
          method: 'GET',
          contentType: 'application/json',
          success: function(response) {
            console.log(response);
            var namebody = $('#namebody'); // namebody references "Users" section in website

            namebody.html(''); // empty section before appending HTML

            // append namebody with tweet's ID, screen name and user name as depicted below in HTML appending
            response.tweetinfo.forEach(function(tweet) {
              namebody.append('\
                <tr>\
                  <td class="id">' + tweet.user.id_str + '</td>\
                  <td class="id">' + tweet.user.screen_name + '<td> \
                  <td class="user id">' + tweet.user.name + '</td>\
              ');
            });
          }
        });
    });


    //Get tweets
    $('#get-tweets-button').on('click', function() { // this links to the "Get Tweets" button
        //DONE: get tweet info and display it
        $.ajax({
          url: '/tweetinfo',
          contentType: 'application/json',
          success: function(response) {
            var tweetbody = $('#tweetbody'); // tweetbody represents "Tweets" section in website

            tweetbody.html(''); // empty section before appending HTML

            response.tweetinfo.forEach(function(tweet) {
              // append tweetbody with tweet's ID, text and created at time as depicted below in HTML appending
              tweetbody.append('\
                <tr>\
                  <td class="id">' + tweet.id_str + '</td>\
                  <td class="id">' + tweet.text + '</td>\
                  <td class="user id">' + tweet.created_at + '</td>\
              ');
            });
          }
        });
    });

    //Get searched tweets
    $('#get-searched-tweets').on('click', function() { // this links to the "Recently Searched" button
        //DONE: get a searched tweet(s) & display it
        $.ajax({
          url: '/searchinfo', // links to search section
          method: 'GET',
          contentType: 'application/json',
          success: function(response) {
            var searchbody = $('#searchbody'); // searchbody represents "Search for a Tweet" section in website

            searchbody.html(''); // empty section before appending HTML

            response.searchedtweets.forEach(function(tweet) {
              // append searchbody with tweet's ID, text and created at date and time as shown below
              searchbody.append('\
                <tr>\
                  <td class="id">' + tweet.id_str + '</td>\
                  <td class="id">' + tweet.text + '</td>\
                  <td class="user id">' + tweet.created_at + '</td>\
              ');
            });
          }
        })
    });


  //CREATE
  $('#create-form').on('submit', function(event){ // contains form handling "Create Tweet" button under "Get Tweets" section
    event.preventDefault();                   // input from user ("create-input"): ID;text

    var createInput = $('#create-input'); // turns exact input from text field into a var createInput

    //create a tweet
    $.ajax({
      url: '/tweetinfo', // tweetinfo
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({ name: createInput.val() }), // formats similar to json file
      success: function(response) {
        console.log(response);
        createInput.val(''); // initialize createInput with empty string again to prepare for next input
        $('#get-tweets-button').click(); // this triggers a refresh on tweets shown before ending the operation
      }
    });
  });

    //Create searched tweets
  $('#search-form').on('submit', function(event){ // contains the form handling "Search" button under "Recently Searched" section
    event.preventDefault();
    var tweetID = $('#search-input').val(); // get value of input, which should be a number (the ID)

    $.ajax({
      url: '/searchinfo/' + tweetID,
      method: 'POST',
      contentType: 'application/json',
      success: function(response) {
        console.log(response);
        $('#get-searched-tweets').click(); // this triggers a refresh on searched tweets shown before ending the operation
      }
    })
  });

  //UPDATE/PUT
  $("#update-user").on('submit', function(event){ // this links to the "Update User" button
      event.preventDefault();                     // input from user ("update-input"): Name;NewScreenName
    var updateInput = $('#update-input');
    var inputString = updateInput.val();

    const parsedStrings = inputString.split(';');

    var nm = parsedStrings[0]; // old name
    var newNewName = parsedStrings[1]; // new screen name

    $.ajax({
      url: '/tweets/' + nm, // /tweets links to first section
      method: 'PUT',
      contentType: 'application/json',
      data: JSON.stringify({ newName : newNewName }), // formats similar to json file
      success: function(response) {
        console.log(response);
        updateInput.val(''); // initialize updateInput with empty string again for next updateInput
        $('#get-button').click(); // this triggers a refresh on user names shown before ending the operation
      }
    });
  });


  //DELETE
  $("#delete-form").on('submit', function() { // contains the form handling "Delete Tweet" button under "Get Tweets" section
    var tweetid = $('#delete-input'); // quantify delete input from user text field into a var tweetid
    event.preventDefault();

    $.ajax({
      url: '/tweetinfo/' + tweetid.val(), // tweet name and ID in number format
      method: 'DELETE',
      contentType: 'application/json',
      success: function(response) {
        console.log(response);
        $('#get-tweets-button').click(); // triggers get-tweets button to instantaneously show that value is deleted
      }
    })
  });
});


                    
   