
const {google} = require('googleapis');
const {OAuth2} = google.auth;
const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname,'../.data');

const oauth2Client = new OAuth2(
    "93467824609-nhn3ar82nuss68dlcr2nsioc3nvatjtv.apps.googleusercontent.com",
    "xKs4ZlEH3mtT2YFIzNa3JK1Z",
);




module.exports.calenderPage = function(req,res){


      token = fs.readFileSync(baseDir+'/'+'token.json','utf-8');
  
      creds = JSON.parse(token);
        oauth2Client.setCredentials({
          refresh_token : creds.token
      
      });

    

  const calendar = google.calendar({version: 'v3', auth:oauth2Client});
  calendar.events.list({
    calendarId: 'primary',
    timeMin: (new Date()).toISOString(),
    singleEvents: true,
    orderBy: 'startTime',
  }, function(err, res) {
    var myEvents = [];
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      
      
      events.map(function(event, i){
        b={
            start : event.start.dateTime || event.start.date,
            summary : event.summary
        }
        myEvents.push(b);
      
      }
      
      );
    } else {
      b = {
        events: "There are no upcoming Events"
      }
      myEvents.push(b);
    }

    fs.open(baseDir + '/' + 'events.json','w',function (err,events){
      if(!err)
      {
          
              data = JSON.stringify(myEvents);


          fs.writeFile(events,data,function(err){

              if(!err){
                  fs.close(events,function(err){
                      if(err){
                          console.log('Error closing new file');
                      }
                  });
              }else{
                  console.log('Error in writing to new file');

              }

          });

      }else{
          console.log('Error in opening File :' + err);
      }

  });

  });



    res.render ('calender',{
        user : req.user.displayName,
        title : "Calender",
    });

}

module.exports.createEvent = function(req,res){
    const calendar = google.calendar({version: 'v3', auth:oauth2Client});
    const startTime = new Date();
    startTime.setDate(startTime.getDay()+40);

    const endTime = new Date();
    endTime.setDate(endTime.getDay()+40);
    endTime.setMinutes(endTime.getMinutes()+30);

    var event = {
        'summary': req.body.title,
        'description':req.body.body,
        'start': {
            'dateTime': startTime,
            'timeZone': 'Asia/Kolkata',
          },
        'end': {
            'dateTime': endTime,
            'timeZone': 'Asia/Kolkata',
          },
        'attendees': [
          {'email': req.body.email}
        ],
      };
    
      calendar.events.insert({
        auth: oauth2Client,
        calendarId: 'primary',
        resource: event,
      }, function(err, event) {
        if (err) {
          console.log('There was an error contacting the Calendar service: ' + err);
          return;
        }
        else{
          console.log(event);

        }
       });
    res.send('<h1>Events Created</h1><a href= "/calender"><h1>Back</h1></a>');
        
}


module.exports.showEvent = function(req,res){

  events = fs.readFileSync(baseDir+'/'+'events.json','utf-8');
    res.send(JSON.parse(events));

 
}