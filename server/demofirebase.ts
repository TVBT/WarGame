/**
 * Created by vutp on 3/3/2017.
 */

export class DemoFireBase {
    public database:any;
    private _users:any;
    private _eventTypes:any;

    public initDemoFireBase() {
        this.startFireBase();
        this.loadListUser();
        this.loadEventType();
    }

    public startFireBase() {
        var admin = require("firebase-admin");
        var serviceAccount = require("./serviceAccountKey.json");

        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: "https://wargame-ae676.firebaseio.com"
        });

        this.database = admin.database();

        // this.initStorage();

        /*admin.auth().createUser({
         email: "user@example.com",
         emailVerified: false,
         password: "secretPassword",
         displayName: "John Doe",
         photoURL: "http://www.example.com/12345678/photo.png",
         disabled: false
         }).then(function(userRecord) {
         // See the UserRecord reference doc for the contents of userRecord.
         console.log("Successfully created new user:", userRecord.uid);
         }).catch(function(error) {
         console.log("Error creating new user:", error);
         });*/

    }

    public login(userName:String, passWord:String) {
        if (this.checkUserExist(userName)) {
            console.log("User login successful");
        } else {
            this.createUser(userName, passWord);
        }
    }

    public loadListUser() {
        this._users = {};
        var userRef = this.database.ref("users");

        userRef.on("child_added", function (data) {
            this._users[data.key] = data.val();
        }.bind(this));
    }

    public checkUserExist(userName) {
        for (var key in this._users) {
            var data = this._users[key];
            if (userName == data["userName"]) {
                return true;
            }
        }

        return false;
    }

    public createUser(userName:String, passWord:String) {
        var userRef = this.database.ref("users");
        userRef.push({
            userName: userName,
            password: passWord,
            fullName: "",
            email: "",
            avatar: "/avatar_default.jpg",
            birthday: "",
            phoneNumber: ""
        }).then(function(snap) {
            // Test inser event for user
            for (var i = 0; i < 5; i++) {
                this.createUserEvent(snap.key, "", 1, "USA", Date());
            }
        }.bind(this));
    }

    public loadEventType() {
        this._eventTypes = {};
        var eventTypeRef = this.database.ref("event_type");

        eventTypeRef.on("child_added", function (data) {
            this._eventTypes[data.key] = data.val();
        }.bind(this));
    }

    public initEventType() {
        var eventTypeRef = this.database.ref("event_type");
        eventTypeRef.push({
            type: 1,
            name: "Outsource",
            description: "",
        });

        eventTypeRef.push({
            type: 2,
            name: "Freelance",
            description: "",
        });
    }

    public createUserEvent(keyUser:String, description:String, eventType:number, location:String, createDate:String) {
        var eventRef = this.database.ref("events");
        eventRef.push({
            keyUser: keyUser,
            description: description,
            eventType: eventType,
            location: location,
            createDate: createDate
        });
    }



    // createUser1(user:User) {
        /*var userRef = this.database.ref("users");
         userRef.push({
         [user.userName]: {
         user_id: user.client.id,
         user_name: user.userName
         }
         }).then(function() {
         console.log("Insert user successful");
         }.bind(this)).catch(function(error) {
         console.error('Error writing new message to Firebase Database', error);
         });*/

        /*var dinosaursRef = this.database.ref("dinosaurs");
         dinosaursRef.set({
         lambeosaurus: {
         appeared: -76000000,
         height: 2.1,
         length: 12.5,
         order: "ornithischia",
         vanished: -75000000,
         weight: 5000
         },

         bruhathkayosaurus: {
         appeared: -70000000,
         height: 25,
         length: 44,
         order: "saurischia",
         vanished: -70000000,
         weight: 135000
         },

         linhenykus: {
         appeared: -85000000,
         height: 0.6,
         length: 1,
         order: "theropoda",
         vanished: -75000000,
         weight: 3
         },

         triceratops: {
         appeared: -68000000,
         height: 3,
         length: 8,
         order: "ornithischia",
         vanished: -66000000,
         weight: 11000
         },

         pterodactyl: {
         appeared: -150000000,
         height: 0.6,
         length: 0.8,
         order: "pterosauria",
         vanished: -148500000,
         weight: 2
         },

         stegosaurus: {
         appeared: -155000000,
         height: 4,
         length: 9,
         order: "ornithischia",
         vanished: -150000000,
         weight: 2500,
         }
         });

         var scoresRef = this.database.ref("scores");
         scoresRef.set({
         bruhathkayosaurus: 55,
         lambeosaurus: 21,
         linhenykus: 80,
         pterodactyl: 93,
         stegosaurus: 5,
         triceratops: 22
         });*/

        /*var userRef = this.database.ref("users");
         userRef.set({
         1: {
         email: "thtvd@mecorp.vn",
         password: "123456",
         fullName: "Trương Võ Duy Thức",
         avatar: "/avatar_default.jpg",
         yearOfBirth: "1987",
         phoneNumber: "1234567890"
         },

         2: {
         email: "binhlt@mecorp.vn",
         password: "123456",
         fullName: "Lê Thanh Bình",
         avatar: "/avatar_default.jpg",
         yearOfBirth: "1989",
         phoneNumber: "1234567890"
         },

         3: {
         email: "vutp@mecorp.vn",
         password: "123456",
         fullName: "Trần Phi Vũ",
         avatar: "/avatar_default.jpg",
         yearOfBirth: "1989",
         phoneNumber: "1234567890"
         },

         4: {
         email: "thinhth@mecorp.vn",
         password: "123456",
         fullName: "Trần Hoàng Thịnh",
         avatar: "/avatar_default.jpg",
         yearOfBirth: "1991",
         phoneNumber: "1234567890"
         }
         });*/





        /*// Query Data
         // Ordering by a specified child key
         console.log("\n***** Ordering by a specified child key *****");
         dinosaursRef = this.database.ref("dinosaurs");
         dinosaursRef.orderByChild("height").on("child_added", function(snapshot) {
         console.log(snapshot.key + " was " + snapshot.val().height + " meters tall");
         });

         // Ordering by key
         console.log("\n***** Ordering by key *****");
         dinosaursRef.orderByKey().on("child_added", function(snapshot) {
         console.log(snapshot.key);
         });

         // Ordering by value
         console.log("\n***** Ordering by value *****");
         scoresRef.orderByValue().on("value", function(snapshot) {
         snapshot.forEach(function(data) {
         console.log("The " + data.key + " dinosaur's score is " + data.val());
         });
         });

         // Limit Queries
         console.log("\n***** Limit Queries *****");
         dinosaursRef.orderByChild("height").limitToFirst(4).on("child_added", function(snapshot) {
         console.log(snapshot.key);
         });

         // Range Queries
         console.log("\n***** Range Queries *****");
         console.log("***** startAt *****");
         dinosaursRef.orderByChild("height").startAt(3).on("child_added", function(snapshot) {
         console.log(snapshot.key);
         });

         console.log("\n***** endAt *****");
         dinosaursRef.orderByKey().endAt("pterodactyl").on("child_added", function(snapshot) {
         console.log(snapshot.key);
         });

         console.log("\n***** startAt -- endAt *****");
         dinosaursRef.orderByKey().startAt("b").endAt("b\uf8ff").on("child_added", function(snapshot) {
         console.log(snapshot.key);
         });

         console.log("\n***** equalTo *****");
         dinosaursRef.orderByChild("height").equalTo(25).on("child_added", function(snapshot) {
         console.log(snapshot.key);
         });

         dinosaursRef.child("stegosaurus").child("height").on("value", function(stegosaurusHeightSnapshot) {
         var favoriteDinoHeight = stegosaurusHeightSnapshot.val();

         var queryRef = dinosaursRef.orderByChild("height").endAt(favoriteDinoHeight).limitToLast(2)
         queryRef.on("value", function(querySnapshot) {
         if (querySnapshot.numChildren() === 2) {
         // Data is ordered by increasing height, so we want the first entry
         querySnapshot.forEach(function(dinoSnapshot) {
         console.log("The dinosaur just shorter than the stegasaurus is " + dinoSnapshot.key);

         // Returning true means that we will only loop through the forEach() one time
         return true;
         });
         } else {
         console.log("The stegosaurus is the shortest dino");
         }
         });
         });*/
    // }

    initStorage() {
        var gcloud = require("gcloud");
        var storage = gcloud.storage({
            projectId: "wargame-ae676",
            keyFilename: "./server/serviceAccountKey.json"
        });


        var bucket = storage.bucket("wargame-ae676.appspot.com");
        var localFilename = 'C:/Killer/13621394_1392810094068401_1534173771_o.jpg';
        bucket.upload(localFilename, function(err, file) {
            if (!err) {
                console.log('Upload successful.');
            } else {
                console.log('Error uploading file: ' + err);
            }
        });
    }
}