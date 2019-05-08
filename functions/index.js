const functions = require('firebase-functions');
const admin = require('firebase-admin');
const url = require('url');
admin.initializeApp(functions.config().firebase);

exports.cspReport = functions.https.onRequest((request, response) => {

    const report = JSON.parse(request.body.toString('utf8'));
    const myurl = new URL(report.document-uri);

    report.created_at = Date.now();

    const writeResult = admin.firestore().collection(myurl.hostname).add(report);
    writeResult.then((ref) => {
        console.log(`Message with ID: ${ref.id} added.`);
        // We get a CORBS Error when returning a response.
        //return response.json({result: `Message with ID: ${ref.id} added.`});
        return;
    }).catch((err) => {
        return response.json({result: `Failed. ` + err });
    });
    
});
