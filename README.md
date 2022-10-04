# Capstone2
Project Proposal
I will be using React and Node.js for this project
My weak point has been in the front end so I hope to focus a little bit more on the front-end UI aspect, so it will become an evenly focused full-stack application
This will be a website
My project will be designed to provide accessibility and a service to users to help animals in need. Adopting a pet provides a new home for them, however people usually cannot be too picky when selecting pets from adoptions, which is why a lot of people choose not to. I hope this website will help people find what they are looking for so that they look at adoption as a great option when it comes to finding a pet. 
The demographic of my users will be anyone of any age. Most likely from 16+.
I will be using the petfinder API which allows me to access the database of hundreds of thousands of pets that are ready for adoption from animal welfare organizations. Users should be able to filter out their search through type, species, breeds, gender, age, etc.
https://www.petfinder.com/developers/v2/docs/#request-structure 
a. A general look at he database schema looks likes User->Favorites->Pets->Organization
b. The request structure for this API seems fairly straightforward and I think the only problem I will face is hitting the request limit, which seems to be 1,000/day. So it should still not pose a problem.
c. No. There will be no sensitive information that needs to be secured. The only personal information we request from the user will be a name and email.
D. Search box, favorites/saved, navbar, recently searched pets(?), shows recommended based on locations?
E. user flow will be to log in/create account, then they will be brought to a homepage where you can choose to explore pets or type into a search box to filter out the specific pets you would like to see. Once the list is pulled up, users will see different pet cards to scroll through which has the basic information like photos and breed and age. Once they click on it, more information about the pet will come up and possible videos, organization, and attributes. From there they can choose to go back or save the pet to their saved data for later. There will be links to the organization the pet belongs to and contact information so if they are interested they can contact the organization to set something up.
F. Having a search operation, user authentication. My stretch goals are for the web app to know what the user is interested in based on past search, or showing pets based on the user current location.
