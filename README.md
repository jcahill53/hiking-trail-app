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
         {
            "_id": "63002e1b9ed6cb63e3344749",
            "id": "442c890d-7b66-44e6-b646-2c8ff3b207e1",
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

        {
        "_id": "6301c3a4a21505ac4795e2f4",
        "messageBody": "I enjoyed this trail.  Parking was almost full.",
        "createDayTime": "07/12/2022",
        "updatedDayTime": "07/12/2022",
        "trailId": "63002e1b9ed6cb63e334474a",
        "date": "2022-08-21T05:33:24.848Z"
        }

    3. parking:  information about parking faciities for the trail
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
3. API
---------------------------------------------------------------------------------
 
An API has been created using Express to access data in the mongodb hiking-trails database.  The API is free and does not require the use of a private or public API Key

The following endpoints are available when using the API:

    1.  hiking-trails
    -  Get all trails http://localhost:5000/hikingtrails
    -  Get a trail by ID: http://localhost:5000/hikingtrails/:trailId
    -  Get trails by trail name http://localhost:5000/hikingtrails/name/:name


    2.  comments

    -  Get all comments http://localhost:5000/comments
    -  Get all comments for a trail http://localhost:5000/hikingtrails/trailId/comments
    -  Create a new comment for a trail X POST -H "Content-Type: application/json" -d '{"userId": "63002e7ef11bb0d6dee7272d","messageBody": "I enjoyed this trail2.  Parking was almost full.", "createDayTime": "07/12/2022", "updatedDayTime": "07/12/2022"}' http://localhost:5000/hikingtrails/trailId/comments
    -  Delete a comment for a trail -X DELETE http://localhost:5000/hikingtrails/trailId/comments/commentId
    - Update comment for a trail

    3.  parking

    -  Get all parking http://localhost:5000/parking
    -  Get all parking for a trail http://localhost:5000/hikingtrails/trailId/parking
    -  Create parking for a trail X POST -H "Content-Type: application/json" -d '{"name": "parking lot 2", "trailId": ["63002e1b9ed6cb63e334474e","63002e1b9ed6cb63e334474d"],"emptiestDayTime": "Monday 12:00pm","fullest_day_time": "Saturday 2:00pm","parkingLotStatus": "full"}' http://localhost:5000/hikingtrails/trailId/parking
    - Update parking for a trail

    4.  users

    -  Get all users http://localhost:5000/users/
    -  Get user by credentials (login) -X POST -H "Content-Type: application/json" -d '{"name":"Sylvia Smith","email":"ssmith41@gmail.com","password":"Password123!"}' http://localhost:5000/users/login
    -  Create a user (register) -X POST -H "Content-Type: application/json" -d '{"name":"Sylvia Smith","email":"ssmith41@gmail.com","password":"Password123!"}' http://localhost:5000/users/register

---------------------------------------------------------------------------------
4. Front End
---------------------------------------------------------------------------------
The site was written using using React.  Dependencies include:
    - bcrypt
    - cors
    - dotenv
    - jsonwebtoken
    - popups

The following pages are available in the application:

Note:  While under development, a nav bar has been added to the site so developers can access any page directly.  When the following flow is completed the nav bar will be removed.

1.  Home Page - Welcomes the user to the site and provides access to a Register page for new users and a login page for returning users
2.  Register Page - allows a user to set up a new user account by submitting their name, email and password (connection to database in process)
3.  Login Page -  allows a user to login to the site by entering their email and password (connection to database in process)
4.  Trails Search - if login is successful, the user will be brought to the Trails Search page.  They may enter any part of a  trail name.  When submit is clicked a list of trails with names containing the search parameter is displayed.  A user can then click on the Details for a trail to learn more info about the trail.
5.  Trail Details -  When the details for a trail are selected on the Trails Search page, a page displays that contains the trail name, information about parking for the trail and comments submitted by users.  Users can select to add a new comment or update the parking lot status (e.g. overflowing, full, partially full, empty) (in process)
6.  Add a comment = provides a page for users to add a comment for the trail (in process)

---------------------------------------------------------------------------------
5. Deployment
---------------------------------------------------------------------------------
Deployment is pending