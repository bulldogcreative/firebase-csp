const functions = require('firebase-functions');
const admin = require('firebase-admin');
const url = require('url-parse');

admin.initializeApp(functions.config().firebase);
const settings = {/* your settings... */ timestampsInSnapshots: true };
admin.firestore().settings(settings);

exports.cspReport = functions.https.onRequest((request, response) => {
    let report;

    try {
        report = JSON.parse(request.body.toString('utf8'));
    } catch(e) {
        return console.error(e);
    }

    const myurl = new url(report['csp-report']['document-uri']);

    report.created_at = Date.now();

    const writeResult = admin.firestore().collection(myurl.hostname).add(report);
    writeResult.then((ref) => {
        return response.json({result: `Message with ID: ${ref.id} added.`});
    }).catch((err) => {
        return response.json({result: `Failed. ` + err });
    });

});
