

const functions = require('firebase-functions');
const google= require('googleapis');
const key=require("../src/pages/service-account");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addMessage = functions.https.onRequest(async (req, res) => {
    // Grab the text parameter.
    const SCOPES = 'https://www.googleapis.com/auth/calendar';

    var auth = new google.auth.JWT(
        key.client_email,
        null,
        key.private_key,
        SCOPES,
        'alueducation.com_7h87scetn2g12tef8p6oit4ljo@group.calendar.google.com'
    );

    const api = google.calendar({version : "v3", auth : auth});
    const calendarId = 'alueducation.com_7h87scetn2g12tef8p6oit4ljo@group.calendar.google.com';

//Returns metadata for a calendar.
    api.calendars.get({calendarId : calendarId}
        , function (err, resp) {
            if (err) {
                console.log(err);
            } else {
                console.log(resp);
            }
        })

    //Creates a secondary calendar
    api.calendars.insert({requestBody : { summary : "test2"}},
        function (err, res) {
            if(err) {
                console.log(err);
            } else {
                console.log(res);
            }
        })

// Make an authorized request to list Calendar events.
    api.events.list({
        calendarId: calendarId
    }, function (err, resp) {
        if (err) {
            console.log(err)
        } else {
            console.log(resp.data.items);
        }
    });

});