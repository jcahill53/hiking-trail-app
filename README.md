# hiking-trail-api and app

PROJECT PROPOSAL
#D-Team:  Arthur Rodrigues, Yuhong Wang, Himanshi Gupta, Joann Cahill, Miguel Marin
---------------------------------------------------------------------------------
1. Github Repository
---------------------------------------------------------------------------------
A public github repository has been established for this project at:  https://github.com/jcahill53/hiking-trail-app. 

---------------------------------------------------------------------------------
2. Database
---------------------------------------------------------------------------------
A mongo database was created with three collections:

    1.  hiking-trails: information on Oregon trails
        indexes: _id; name

         {
            "_id": "63002e1b9ed6cb63e3344749",
            "guideId": "442c890d-7b66-44e6-b646-2c8ff3b207e1",
            "name": "Rock Creek Greenway Hike",
            "urls": {
                "absoluteSource": "http://www.oregonhikers.org/field_guide/Rock_Creek_Greenway_Hike",
                "trailStart": "http://www.oregonhikers.org/field_guide/Bethany_Lake_Trailhead",
                "trailEnd": "http://www.oregonhikers.org/field_guide/Kaiser_Woods_Natural_Area"
        },
            "measures": {
                "difficulty": "Moderate",
                "distance": {
                    "value": 8.1,
                    "measure": "miles"
                },
                "elevationGain": {
                    "value": 560,
                    "measure": "feet"
                }
        },
            "updatedAt": "2016-11-27T00:45:39.485Z",
            "locations": {
                "trailStart": {
                    "latitude": 45.5564,
                    "longitude": -122.86792
                }
            }
        }

    2. commments:  comments made by users about the trail
        indexes: _id; trailId
        {
        "_id": "6301c3a4a21505ac4795e2f4",
        "messageBody": "I enjoyed this trail.  Parking was almost full.",
        "createDayTime": "07/12/2022",
        "updatedDayTime": "07/12/2022",
        "trailId": "63002e1b9ed6cb63e334474a",
        "date": "2022-08-21T05:33:24.848Z"
        "rateTrail": "5"
        }

    3. parking:  information about parking faciities for the trail
        indexes: _id; trailId
        {
        "_id": "630032a40719308563783d50",
        "name": "parking lot East",
        "trailId": [
            "050efaf8-fa87-4592-a52d-018a1c8d824d"
        ],
        "emptiestDayTime": "Tuesday 8:00pm",
        "fullest_day_time": "Sunday 12:00pm",
        "parkingLotStatus": "half"
        }
    4.  users:  users who have registered to use the app
        {
        "_id": "630a84145da4e4915826480e",
        "name": "Sylvia Smith",
        "email": "ssmith52@gmail.com",
        "password": "$2a$10$mqLctB.Sjx5U/Nei29owwOb1BbQzKJPBymgwpFMSnDFr3NQu7NYUa"
        }


---------------------------------------------------------------------------------
3. Aggregation
---------------------------------------------------------------------------------
A component AvgRating incorporates an aggregation that provides an average, grouped by trailId, of the rateTrail value in the comments collection. 

a.  Code for inside the mongoDB aggregation ui:

        [{
            $match: {
                rateTrail: {
                    $exists: 1,
                    $ne: ''
                }
            }
        }, {
            $group: {
                _id: '$trailId',
                avgTrailRating: {
                    $avg: '$rateTrail'
                }
            }
        }]

b. Exported Code for React:

        [
        {
            '$match': {
            'rateTrail': {
                '$exists': 1, 
                '$ne': ''
            }
            }
        }, {
            '$group': {
            '_id': '$trailId', 
            'avgTrailRating': {
                '$avg': '$rateTrail'
            }
            }
        }
        ]

 

---------------------------------------------------------------------------------
4. Instructions on use of the API
---------------------------------------------------------------------------------
 
An API has been created using Express to access data in the mongodb hiking-trails database.  The API is free and does not require the use of a private or public API Key

The following endpoints are available when using the API:

    1.  trail collection
        a. Dataset Returned

            The API returns the following dataset:

                [{"_id":"630e32a920214d9fcc411d74",
                "guideId":"442c890d-7b66-44e6-b646-2c8ff3b207e1",
                "name":"Rock Creek Greenway Hike",
            "   urls":{
                    "absoluteSource":"",
                    "trailStart":"",
                    "trailEnd":""},
                "measures":{
                    "difficulty":"Moderate",
                    "distance":{
                        "value":"8.1",
                        "measure":"miles"},
                    "elevationGain":{
                        "value":"560",
                        "measure":"feet"}},
                    "updatedAt":"2016-11-27T00:45:39.485Z",
                    "locations":{
                        "latitude":"45.55",
                        "longitude":"-122.86792"},
                    "descr":"Lorem ipsum dolor sit amet, consectetur adipiscing elit,"
                    }
                ]
        b. Available endpoints:

            -  Get all trails http://localhost:8000/hikingtrails 
                - returns all trails in the collection
                - no variables are needed
                - returns an array of all trails in the collection
            -  Get a trail by ID: http://localhost:8000/hikingtrails/{trailId} 
                - returns a specific trail based on the _id for the trail provided
                - the _id for the trail must be provided
                - returns a trail object
            -  Get trails by trail name http://localhost:8000/hikingtrails/name/{trailName} 
                - returns all trails that have a name including the characters specified. 
                - name of the trail must be included in the path
                - Trail name must be provided
                - returns an array of trails
            -  Create a trail http://localhost:8000/hikingtrails
                - creates a new trail object based on the key:values provided in the submit statement
                - at least the name must be submitted as part of the request
                - returns the ObjectId value created for the new trail object (e.g. "newObjectId":"631a3277fd2a43ad17018786","message":"Item created! ID: 631a3277fd2a43ad17018786")
            -Update a trail http://localhost:8000/hikingtrails/{trailId} 
                -  updates the name and/or description of the trail 
                -  the _id of the trail must be included in the path
                -  either the name and/or the description must be submitted as part of the request
                -  returns an object with the updated data
            -Delete a trail http://localhost:8000/hikingtrails/{trailId}
                - deletes the specified trail object from the collection
                -  the _id of the trail must be included in the path
                -  returns confirmation of the deletion (e.g."message":"Deleted 1 trail." )

     2.  comments collection 
        a. Dataset Returned
                [
                    {
                        "_id": "630e38064123aad9416bd843",
                        "userId": "630e726e76fee74a15fbb802",
                        "messageBody": "I enjoyed this trail2.  Parking was almost full.",
                        "createDayTime": "07/12/2022",
                        "updatedDayTime": "07/12/2022",
                        "trailId": "630e32a920214d9fcc411d74",
                        "date": "2022-08-30T16:17:10.482Z",
                        "rateTrail": "5"
                    }
                ]

        b. Available endpoints:
        -  Get all comments http://localhost:8000/comments
            - returns all comments in the collection
            - no variable are required
            - returns an array of comments 
        -  Get all comments for a trail http://localhost:8000/hikingtrails/{trailId}/comments
            - returns all comments for the trail specified
            - trail _id must be provided in the path
            - returns an array of comments 
        -  Get a specific comment for a trail http://localhost:8000/hikingtrails/{trailId}/comments/{commentId}
            - returns a single comment for the comment _id specified
            - the trail _id and comment _id must be provided in the path
            - returns an object for the trail and comment specified
        -  Create a new comment for a trail  http://localhost:8000/hikingtrails/{trailId}/comments
            - creates a new comment object for the trail id specified
            - trail _id must be provided in the path
            - _id for the user submitting the comment and messageBody should be provided at a minimum
            - returns the objectId for the object created in the comments collection (e.g.{"newObjectId":"631a391faf9bf95b66a434e5","message":"Comment created! ID: 631a391faf9bf95b66a434e5"})
        -  Update comment for a trail http://localhost:8000/hikingtrails/{trailId}/comments/{commentId}
            - updates values in the comment _id specified
            - the trail _id and comment _id must be provided in the path
            - returns an object for the trail and comment specified that shows the changes
        -  Delete a comment for a trail http://localhost:8000/hikingtrails/{trailId}/comments/{commentId}
            - deletes the specified comment _id object from the comments collection
            - the trail _id and comment _id must be provided in the path
            - returns confirmation of the deletion (e.g {"message":"Deleted 1 comment."})
  

    3.  parking
        a. Dataset Returned
            [
                {
                    "name": "parking lot 2",
                    "trailId": "630e32a920214d9fcc411d74",
                    "emptiestDayTime": "Monday 12:00pm",
                    "fullest_day_time": "Saturday 2:00pm",
                    "parkingLotStatus": "Full",
                    "date": "2022-08-30T16:19:47.176Z",
                    "type": "Free",
                    "usersThere": "10"
                }
            ]

        b. Available endpoints
            -  Get all parking http://localhost:8000/parking
                - returns all parking objects in the collection
                - no variable are required
                - returns an array of parking objects 
            -  Get all parking for a trail http://localhost:8000/hikingtrails/{trailId}/parking
                - returns all parking objects in the collection for the trail specified
                - the trail _id must be included in the path
                - returns an array of parking objects 
            -  Create parking for a trail  http://localhost:8000/hikingtrails{trailId}/parking
                - creates a new parking object for the trail id specified
                - trail _id must be provided in the path
                - should include at least the parking name as a parameter
                - returns the objectId for the object created in the comments collection (e.g. {"newObjectId":"631a5ae3676adae575ecf765","message":"Parking created! ID: 631a5ae3676adae575ecf765"}
            -  Update parking for a trail  http://localhost:8000/hikingtrails/630e32a920214d9fcc411d74/parking/63144e31a56fc298c0841af6
                - updates the parking status for the trail specified
                - the trail _id and parking _id must be included in the path
                - the ParkingStatus should be included as a parameter
                - returns an object which includes the updated values
            -  Delete parking for a trail http://localhost:8000/hikingtrails/{trailId}/parking/{parkingId}
                - deletes the parking object for the specified trail and parking id
                - the trail _id and parking _id must be provided in the path
                - returns confirmation of the deletion (e.g {"message":"Deleted 1 parking object."})

    4.  users
        a. Dataset Returned
        b. Available endpoints
        -  Get all users http://localhost:8000/users/
            - returns all users in the users collection
            - no variable are required
            - returns an array of users
        -  Get user by credentials (login) http://localhost:8000/users/login
            - confirms that the user email and password is valid in the users collection and passes back a token for authentication
            - User email and password must be submitted as parameters
            - returns confirmation of a successful login, the token, user name and user _id (e.g.{"message":"User logged in","username":"Sylvia Smith","userId":"630e6f5376fee74a15fbb7fe","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoic3NtaXRoNDFAZ21haWwuY29tIiwiaWF0IjoxNjYyNjYwNTI2fQ.eUsCWJA_Y8bnAF7vxo2Lz_OEoxOKmLFscO2Gq-YmISE"} )
        -  Create a user (register) http://localhost:8000/users/register 
            - registers an individual as a user by creating a user object in the users collection
            - User Name, User Email and User Password must be submitted as parameters
            - returns confirmation of the registration ({"newObjectId":"631a2f36fd2a43ad17018785","message":"User created! ID: 631a2f36fd2a43ad17018785"})


---------------------------------------------------------------------------------
5. Front End
---------------------------------------------------------------------------------
The site was written using using React.  Dependencies include:
    - bcrypt
    - cors
    - dotenv
    - jsonwebtoken
    - popups

The following pages are available in the application:

Note:  While under development, a nav bar has been added to the site so developers can access any page directly.  When the following flow is completed the nav bar will be removed.

    a.  Home Page - Welcomes the user to the site and provides access to a Register page for new users and a login page for returning users
    b.  Register Page - allows a user to set up a new user account by submitting their name, email and password (connection to database in process)
    c.  Login Page -  allows a user to login to the site by entering their email and password (connection to database in process)
    d.  Trails Search - if login is successful, the user will be brought to the Trails Search page. (If login is not successful they are redirected to the login page) They may enter any part of a  trail name.  When submit is clicked a list of trails with names containing the search parameter is displayed.  A user can then click on the Details for a trail to learn more info about the trail.
    e.  Trail Details -  When the details for a trail are selected on the Trails Search page, a page displays that contains the trail name, information about parking for the trail and comments submitted by users.  Users can select to add a new comment or update the parking lot status (e.g. overflowing, full, partially full, empty) 
    f.  Add a comment = provides a page for users to add a comment for the trail  

---------------------------------------------------------------------------------
6. Deployment
---------------------------------------------------------------------------------
THe application has been deployed using Heroku for the backend and Netlify for the front end:

Huroku:  https://hiking-trail-app.herokuapp.com/

        add hikingtrails, users, comments or parkin to the path to view data in each collection

Netlify: https://splendorous-salamander-3740b4.netlify.app/ 

        testuser:  slee@gmail.com

        password:  PW123

        suggested searches:  Loop, Hike or Sister


---------------------------------------------------------------------------------
7. Instructions for running the app and testing
---------------------------------------------------------------------------------
To run the backend:

a.  from the root directory (hiking-trail-app)

b.  run:  npm install  

c.  run: npm start to serve the backend at https://localhost:8000

To run the app:

a.  change to the following directory from the root:  /hiking-trail=app/src/resource/hiking-trail

b.  run:  npm install 

c.  run: npm start to serve the frontend at https://localhost:3000

To test the app:

a.  from the root directory (hiking-trail-app)

b.  run npm test