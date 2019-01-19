const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);



exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello e-acc!");
});

const createNotification = (notification => {
    return admin.firestore().collection('notifications')
        .add(notification)
        .then(doc => console.log('notification added', doc));
})

exports.projectCreated = functions.firestore
    .document('invoices/{invoiceId}')
    .onCreate(doc => {

        const invoice = doc.data();
        const notification = {
            content: 'New invoice has been created!',
            user: `${invoice.firstName} ${invoice.lastName}`,
            time: admin.firestore.FieldValue.serverTimestamp()
        }

    return createNotification(notification);

});

exports.userJoined = functions.auth.user()
    .onCreate(user => {
        return admin.firestore().collection('users')
            .doc(user.uid).get().then(doc => {
                const newUser = doc.data();
                const notification = {
                    content: "New user joined!",
                    user: `${newUser.firstName} ${newUser.lastName}`,
                    time: admin.firestore.FieldValue.serverTimestamp()
                }
                return createNotification(notification);
            })
});

