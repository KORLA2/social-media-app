
Social Network is a fully responsive containerized social media app. Users can create profiles and can send Friend requests to other users and chat with them if they accept this is real time, users can create posts ,share a post through whatsapp, like and comment to a specific post . User can navigate to other users profile and can search other users . Users receive notifications when they get friend request from other users . Users profile views will be increased if some one view their profile.


Project Description:
1. This app allows users to register, with necessary particulars log in with email and password . They can enter to home page only when email is verified s          successfully.They need to create a profile with an image, name, Email, occupation, Password,City, and LinkedIn ,Twitter Links.

2. Users can view other users through search bar. Profiles can be searched by name no need to be exact . They can view other users profile, posts and send Freind requests to others .
3.  Users can view all the friend requests received in notification page. Receivers get Mail that they recieve friend request from other user.Senders also get Mail when others accept their request .They can accept or reject the request .
4.  User can only post Images and with some description. They can share post through whats app and their profile count will be increased when some others view their profile .
5.   Users can message only their friends with only text this is real time . Users can switch between dark mode to light mode.Only messages are real time so for any remaining updates they have to refresh the page .I have included loading circle so that they know some thing is happening mean while updates from appwrite are updated to the app.

When ever I make changes and push to github github actions triggger , build the docker image and push to docker hub and netlify.

All routes all private without authentication no one would be able to use social network.

**Tech Stack**
Appwrite cloud is used for authentication, database, storage, realtime, queries.

React.js , Material UI, light & dark Modes , Redux Toolkit for state management , Email.js for sending Mails.

Docker ,Github Actions.
