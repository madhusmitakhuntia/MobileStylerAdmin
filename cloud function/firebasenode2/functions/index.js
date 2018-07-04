const functions = require('firebase-functions');
//const cors = require('cors')({ origin: true });
// var moment = require('moment');
// moment().format();



// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// Create and Deploy Your First Cloud Functions
// https://firebase.google.com/docs/functions/write-firebase-functions


exports.getCustomer = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    //respond to CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }

    // Get a database reference to our posts
    var db = admin.database();
    var ref = db.ref("customer");

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function (snapshot) {
        console.log(snapshot.val());
        res.status(200).json({ customer: snapshot.val() });
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

});


// exports.getOneProducts = functions.https.onRequest((req, res) => {
//     res.header('Content-Type', 'application/json');
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//respond to CORS preflight requests
// if (req.method === 'OPTIONS') {
//     res.status(204).send('');
// }

// // Get a database reference to our posts
// var db = admin.database();
// var ref = db.ref("/messages/-L82AfhFTr4odsh1GMId");

// db.ref("-Users/-KUanJA9egwmPsJCxXpv/displayName").set("New trainer");

// Attach an asynchronous callback to read the data at our posts reference
// ref.on("value", function (snapshot) {
//     console.log(snapshot.val());
//     res.status(200).json({ messages: snapshot.val() });
// }, function (errorObject) {
//     console.log("The read failed: " + errorObject.code);
// });
//     ref.update({ original: "New trainer" });

// });

//earlier code 
// exports.getMessage = functions.https.onRequest((req, res) => {
//     // Grab the text parameter.
//     // const original = req.query.text;
//     // Push the new message into the Realtime Database using the Firebase Admin SDK.
//     return admin.database().ref('/messages').once('value').then(snapshot => {
//         // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
//         const values = snapshot.val();
//         console.log(snapshot.val());
//         //return res.redirect(2, snapshot.val());
//         return res.status(200).send(snapshot.val());
//     });
// });

// exports.getBooking = functions.https.onRequest((req, res) => {
//     res.header('Content-Type', 'application/json');
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');

//     //respond to CORS preflight requests
//     if (req.method === 'OPTIONS') {
//         res.status(204).send('');
//     }

//     // Get a database reference to our posts
//     // var db = admin.database();
//     // var ref = db.ref("customer");
//     var booking=admin.database().ref().child("booking");
//     var customer=admin.database().ref().child("customer");

//     // Attach an asynchronous callback to read the data at our posts reference
//     booking.on('child_added',snap=>{
//         console.log(snap.val());
//         customer.child(snap.val().customerId).once('value',user=>{
//             console.log(user.val());
//         })
//     });

// });
exports.getBookings = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    //respond to CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }

    // Get a database reference to our posts
    var db = admin.database();
    var ref = db.ref("booking");

    // Attach an asynchronous callback to read the data at our posts reference
    ref.on("value", function (snapshot) {
        console.log(snapshot.val());
        res.status(200).json({ bookings: snapshot.val() });
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });

});

exports.getCustomerbydate = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    //respond to CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }

    // Get a database reference to our posts

    // Grab the text parameter.
    //const from = new Date("2018-03-20") ;
    //const to = new Date("2018-03-30");
    const from = req.query.from;
    const to = req.query.to;
    //var custarr=[];
    var db = admin.database();
    var ref = db.ref().child("customer");
    //console.log("from"+from);

    // ref.on("child_added", function (snapshot) {
    //     var test=new Date(snapshot.val().createdAt);
    //     //console.log(test);
    //     //console.log(moment(test).isSameOrAfter(moment(from)) && moment(test).isSameOrBefore(to));
    //     // if(moment(test).isSameOrAfter(new Date(from))==true && moment(test).isSameOrBefore(new Date(to)) )
    //     //   {
    //     //       console.log("true");
    //     //   }
    //     //   else{
    //     //       console.log("false");
    //     //   }
    //     // res.status(200).json({ bookings: snapshot.val() });
    //     // this.custarr=[];
    //     // if(moment(test).isSameOrAfter(moment(from)) && moment(test).isSameOrBefore(to))
    //     // {

    //     //      custarr.push(snapshot.val());

    //     //       //console.log(snapshot.val());

    //     // }



    //    // res.status(200).json({ customers: custarr }); 


    //     // else{
    //     //           console.log("false");
    //     //       }
    // }, function (errorObject) {
    //     console.log("The read failed: " + errorObject.code);
    // });
    //console.log(custarr);
    //console.log(custarr.length);
    // res.status(200).json({ customer: custarr });
    // Push the new message into the Realtime Database using the Firebase Admin SDK.
    // return admin.database().ref('/customer').push({ original: original }).then((snapshot) => {
    //     // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    //     return res.redirect(303, snapshot.ref);
    // });
    ref.orderByChild("createdAt").startAt(from).endAt(to).once('value', function (snapshot) {
        //console.log(snapshot.val());
        res.status(200).json({ customer: snapshot.val() });
    });

});
// exports.getCustomerbyname = functions.https.onRequest((req, res) => {
//     res.header('Content-Type', 'application/json');
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Content-Type');


//     if (req.method === 'OPTIONS') {
//         res.status(204).send('');
//     }


//      const fname =req.query.fname;
//      const lname =req.query.lname;

//     var db = admin.database();
//     var ref = db.ref().child("customer");



//     ref.orderByChild("partnerFirstName").equalTo(fname).once('value',function(snapshot)
//     {
//      //console.log(snapshot.val());
//       //res.status(200).json({ customer: snapshot.val() });

//       var snap=snapshot.val();
//       var key = Object.keys(snap);
//        //var custdata = snap[key];
//        var fn = snap[key].partnerFirstName;
//        var ln=snap[key].partnerLastName;

//        if (ln === lname) {
//          //console.log(snapshot.val());
//          return res.status(200).json({ customer: snapshot.val() });
//         }



//     });

// });

exports.getCustomerbyname = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');


    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    const fname = req.query.fname;
    const lname = req.query.lname;

    var customer = admin.database().ref().child('customer');

    customer.on('child_added', function (snapshot) {
        var fname1 = snapshot.val().partnerFirstName;
        var lname1 = snapshot.val().partnerLastName;


        customer.orderByChild('partnerFirstName').equalTo(fname).once('value', function (snapshot) {
            //console.log(uid +"-------------------------------------->" );
            // customer.child(uid).once('value', function(snapshot) {
            // console.log(snapshot.key, snapshot.val());
            //console.log("partnerLastName--->"+snapshot.val().partnerLastName);
            //var snap= snapshot.val();
            // var key = Object.keys(snap);
            //console.log(key);
            //  var ln = snap[key].partnerLastName;
            // console.log(ln);
            var arr = [];
            if (fname1 === fname && lname1 === lname) {
                arr.push(snapshot.val());
                //console.log(snapshot.val());
                res.status(200).json({ customer: snapshot.val() });

            }
            else {
                res.status(200).send('ERROR : ' + errorObject);

            }


        });



    });


});
exports.getCustomerbyemail = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');


    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    const email = req.query.email;

    var ref = admin.database().ref().child('customer');
    ref.orderByChild("partnerEmail").equalTo(email).once('value', function (snapshot) {
        res.status(200).json({ customer: snapshot.val() });

    });

});
//getpartner by name
exports.getPartnerbyname = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');


    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    const fname = req.query.fname;
    const lname = req.query.lname;

    var partner = admin.database().ref().child('partner');
    partner.on('child_added', function (snapshot) {
        var fname1 = snapshot.val().partnerFirstName;
        var lname1 = snapshot.val().partnerLastName;
        console.log(fname1);
        partner.orderByChild('partnerFirstName').equalTo(fname).once('value', function (snapshot) {

            // var errorObject= 'not found';
            var arr = [];
            if (fname1 === fname && lname1 === lname) {
                arr.push(snapshot.val());
                console.log(snapshot.val());
                res.status(200).json({ partner: snapshot.val() });


            } else {
                res.status(200).send('ERROR : ' + errorObject);

            }

        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
            // res.status(200).send('ERROR : ' + errorObject);
        });

    });

});
//get partner by email
exports.getPartnerMail = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');


    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    const email = req.query.email;

    var partner = admin.database().ref().child('partner');
    partner.on('child_added', function (snapshot) {
        var mail = snapshot.val().partnerEmail;
        console.log(mail);

        partner.orderByChild('partnerEmail').equalTo(email).once('value', function (snapshot) {

            res.status(200).json({ partner: snapshot.val() });


        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    });

});

//getpartner By date
exports.getPartnerbydate = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    //respond to CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    // 2018-03-20 ,2018-03-30
    // Grab the text parameter.
    const from = req.query.from;
    const to = req.query.to;

    var partner = admin.database().ref().child('partner');

    partner.orderByChild("createdAt").startAt(from).endAt(to).once('value', function (snapshot) {
        console.log(snapshot.val());
        res.status(200).json({ partner: snapshot.val() });
    });

});

exports.getPartner = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    //respond to CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }


    var partner = admin.database().ref().child('partner');

    // Attach an asynchronous callback to read the data at our posts reference
    partner.on("value", function (snapshot) {
        //console.log(snapshot.val());
        res.status(200).json({ partner: snapshot.val() });
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });


});
exports.getPartnerService = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    //respond to CORS preflight requests
    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }


    var service = admin.database().ref().child('service');

    // Attach an asynchronous callback to read the data at our posts reference
    service.on("value", function (snapshot) {
        console.log(snapshot.val());
        res.status(200).json({ service: snapshot.val() });
    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
    });


});

//get patner by fname

exports.getPartnerbyfname = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    const fname = req.query.fname;

    var partner = admin.database().ref().child('partner');

    partner.orderByChild('partnerFirstName').equalTo(fname).once('value', function (snapshot) {

        res.status(200).json({ partner: snapshot.val() });

    }, function (errorObject) {
        console.log("The read failed: " + errorObject.code);
        // res.status(200).send('ERROR : ' + errorObject);
    });



});

//get customer by fname
exports.getCustomerbyfname = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');


    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    const fname = req.query.fname;


    var customer = admin.database().ref().child('customer');




    customer.orderByChild('partnerFirstName').equalTo(fname).once('value', function (snapshot) {


        res.status(200).json({ customer: snapshot.val() });




    });

});


//get partner by phone
exports.getPartnerPhone = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');


    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    const pat_phone = req.query.phone;

    var partner = admin.database().ref().child('partner');
    partner.on('child_added', function (snapshot) {
        

        partner.orderByChild('partnerPhone').equalTo(pat_phone).once('value', function (snapshot) {

            res.status(200).json({ partner: snapshot.val() });


        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    });

});

exports.getClientPhone = functions.https.onRequest((req, res) => {
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');


    if (req.method === 'OPTIONS') {
        res.status(204).send('');
    }
    const client_phone = req.query.phone;

    var partner = admin.database().ref().child('customer');
    partner.on('child_added', function (snapshot) {
        

        partner.orderByChild('partnerPhone').equalTo(client_phone).once('value', function (snapshot) {

            res.status(200).json({ customer: snapshot.val() });


        }, function (errorObject) {
            console.log("The read failed: " + errorObject.code);
        });

    });

});
exports.httpEmail = functions.https.onRequest((req, res) => {

   
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

//respond to CORS preflight requests
if (req.method === 'OPTIONS') {
    res.status(204).send('');
}
   
        const toName  = req.body.toName;
        const toEmail = req.body.toEmail;
   
        console.log('Function Called');
        console.log(toName);
        console.log(toEmail);
        // const msg = {
        //     to: toEmail,
        //     from: 'hello@angularfirebase.com',
        //     subject:  'New Follower',
        //     // text: `Hey ${toName}. You have a new follower!!!` ,
        //     // html: `<strong>Hey ${toName}. You have a new follower!!!</strong>`,
   
        //     // custom templates
        //     templateId: '300e1045-5b30-4f15-8c43-41754b73fe4f',
        //     substitutionWrappers: ['{{', '}}'],
        //     substitutions: {
        //       name: toName
        //       // and other custom properties here
        //     }
        // };
   
        // sendEmail(snapshotData.emailId, partnerNotificationObj.title, partnerNotificationObj.description);
        // return sgMail.send(msg)
                
        //     .then(() => res.status(200).send('email sent!') )
        //     .catch(err => res.status(400).send(err) )
   
    
   
   });
   // function sendEmail(to, subject, body) {
   //   const mailOptions = {
   //       from: '"MobileStyler" <mobilestyler.tx@gmail.com>',
   //       to: to,
   //       subject: subject,
   //       text: body
   //   };
   
   //   return mailTransport.sendMail(mailOptions).then(() => {
   //       //console.log('Successfully sent email to : ' + to)
   //   }).catch(err => {
   //       console.log('Failed to send email : ' + err)
   //   });
   // }