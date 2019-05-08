const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.cspReport = functions.https.onRequest((request, response) => {

    const report = JSON.parse(request.body.toString('utf8'));
    const url = new URL(report.document-uri);

    report.created_at = Date.now();

    const writeResult = admin.firestore().collection(url.hostname).add(report);
    writeResult.then((ref) => {
        return response.json({result: `Message with ID: ${ref.id} added.`});
    }).catch((err) => {
        return response.json({result: `Failed. ` + err });
    });
    
});
