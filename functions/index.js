const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello e-acc!");
});

exports.projectCreated = functions.firestore
    .document('invoices/{invoiceId}')
    .onCreate(doc => {

})

