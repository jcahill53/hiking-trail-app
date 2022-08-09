# hiking-trail-api

PROJECT PROPOSAL
D Team:  Arthur Rodrigues, Yuhong Wang, Himanshi Gupta, Joann Cahill, Miguel Marin
---------------------------------------------------------------------------------

1.  GITHUB REPOSITORY
A public github repository has been established for this project at:  https://github.com/jcahill53/hiking-trail-app. 

---------------------------------------------------------------------------------

2.  PROBLEM STATEMENT
Hiking is a popular activity in many communities.  According to a 2020 article in Trails and Summit (https://trailandsummit.com/is-hiking-becoming-more-popular/,) this activity has seen a significant increase in popularity over time.  In the United States, hiking increased 34%, between 2015 and 2020 when 57.1 million people participated in hiking activities.  With the pandemic, hiking became even more popular as people sought safe activities that they could enjoy while under COVID restrictions. 
The result of this ever-increasing popularity is the unpredictability of how popular a trailhead is on a given day.  Want-to-be hikers find themselves in the dilemma of arriving at a hiking trail to find parking lots full or overflowing.  The team identified several requirements that a hiker might have:

Users need to know if parking is available at a hiking trail including:

    a.  if the Parking lot is empty, full, or overflowing
    b.  what times of the day parking lots are more full
    c.  Users need to know if any fees are associated with the hiking trail
    d.  Users need to arrange shared transportation to a hiking trail that has little parking availability

The goal of our project is to provide users a method to report on and find information about parking availability at hiking trailheads.  This information can be useful not only to hikers but other individuals interested in trends in hiking activities and developing solutions for enhancing hikers’ access to the outdoors. 

---------------------------------------------------------------------------------

3.  SOLUTION DESIGN
    a.  Overview
    The team plans to develop a hiking app that will track the popularity of a given trailhead through the status of parking for the trailhead.  The app will allow users to look up information about a trailhead, whether any parking fees apply  and determine whether parking is available, full or overflowing.  Users will also be able to send updates to the site if they find that the parking availability has changed.  This will provide hikers a tool to better plan their day and encourage the use of car-pooling to trails that have a high level of activity and little parking. 

    b.  Databases to be built (Lead: Yuhong)
        i.  Collections: We have only two MongoDB collections - 
            (1)  OR Hiking Trail
            (2)  Users
            (3)  Messages

    c.  Planned Schema 
        i.  OR Hiking Trails Collection
            Id: letters/number charactor/special character like %, #
            Trail Name: string
            Parking Type: Free/Paid
            Parking Lot Status:Empty/Half/Full
            Total # of parking spots(either empty or occupied)
            number of parking spots available/occupied(this can be +/- each time a user checks out/in for parking in the parking lot, which may impact the parking lot status above from empty=>full) 
            Emptiest Day and Time: DateTime
            Fullest Day and Time: DateTime
            Distance: e.g. 15.8 miles round trip: decimal
            Elevation gain: e.g. 2500 feet: number
            Difficulty: Easy/Moderate/Difficult,
            Location: latitude/longitude
            URL:
            absoluteSource: URI
            trailStart: URI
            trailEnd: URI

        ii. Users collection
            Id: letters/number charactor/special character like %, #
            Password: string
            Email: string
            Message: Array type
                Trail Id
                Message body
                Message Creation DateTIme
                Message Update DateTime

        iii. Messages collection
            Id: letters/number charactor/special character like %, #
            Trail Id: Foreign key
            User Id: Foreign key
            Message body
            Message Creation DateTIme
            Message Update DateTime

    d.  Source of data：From a Github project https://github.com/VerteDinde/hikers-field-guide-map
    Source data for this project was scraped from the Oregon Hiker's Field Guide.

---------------------------------------------------------------------------------

4.  API ENDPOINTS -  Three API end points are planned:
    a.  GET endpoint - users will be able to get information about a hiking trail and available parking for that trail
    b.  POST endpoint  - users will be able to post a message about the parking status of a site
    c.  PUSH endpoint - users will be able to update the parking availability that will show the status and time of day

---------------------------------------------------------------------------------

5.  EXTERNAL TOOLS TO BE USED
    a.  Server-side tools
        Mongodb
        Postman
    b.  Front End
        Font awesome
        Google fonts
        IBM Carbon Design System
        Front End Functionality

---------------------------------------------------------------------------------
6.  FRONT END FUNCTIONALITY - Proposed UX/UI   
 
    a.  On load The user is taken to the home page where they will be greeted as to what the app is. Then they can go on and search the database for trails as a guest or they can login to their own account or register for an account. If they chose to log in, the homepage will simply be updated to say “Welcome, <user>. The search functionality will remain as-is and the login/register commands are replaced with a “my profile” and a log out commands. 

    b.  A successful search query will return a list of trails that matches what the user searched. That list will contain some basic details about the trail at-a-glance. The user can then select which trail they want to view. An unsuccessful query will return an error message and the user will be instructed to try the search again. 

    c.  Once the user has selected a trail, it will take them to the individual trail page. This page will be the core reason why users will use this app. The individual trails page has all the information about the trail users are looking for. This page will display the distance, rating and location of a trail along with a small blurb about it and an image of the trail in the background as the page’s header. The next section of this page will contain all the real-time data the app has about this specific trail, including if parking lots are available, full or overflowing, any parking fees, best time of day to visit, worst time of day to visit. The next section down will allow users to check in and check out of a trail in real time and will help increment or decrement the total number of users at the trail right now. The last section is a message forum feature/functionality. This section will allow users to post short messages about any status about the trail and is all updated in real-time to serve as a sort of “timeline” to let other users know information about the trail. 

    d.  The “my profile” is the page where users can see stats of their past usage on the site. As of now they will have 3 options to choose from 1) the trails that they have checked in and out from 2) Trails uses have posted messages on and 3) a log out 

        i. The trails that they have checked in and out from page will just be a list of all the trails the specific user has checked in and out from 

        ii. Trails users have posted messages on page  will be a list of all the trails that the specific user  has posted comments to. The View will show what trail they posted on, on what date and what the message was with an option to delete that message 

    Mockups of planned pages can be found in the folder zDesign (Team D Mockups of FrontEnd WebPages.pdf).

---------------------------------------------------------------------------------
7.  WORK TIMELINE

The following is an overview of the timeline for the project:

-  Finalize Design          8/12/22
-  Create Mongo DB          8/15/22
-  Populate Sample Data	    8/15/22
-  Create React App		    8/15/22
-  Populate Final Data      8/22/22
-  Create Endpoints         8/22/22
-  Develop Components       8/26/22
-  Integration Testing      8/29/22
-  Bug Fixes and Retest     9/03/22
-  Finalize Presentation    9/04/22
-  Presentation Rehearsal   9/04/22
-  Final Presentation       9/06/22

---------------------------------------------------------------------------------

 Resource:
https://www.statista.com/statistics/191240/participants-in-hiking-in-the-us-since-2006/
https://trailandsummit.com/is-hiking-becoming-more-popular/,

