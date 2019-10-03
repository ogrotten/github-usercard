///////// Convience Fucntions.

function clg(...x) {
	for (let exes of x) console.log(exes);
}

const DCE = x => document.createElement(x);
// const LI = x => document.createElement("li");

/* Step 1: using axios, send a GET request to the following URL 
		   (replacing the palceholder with your Github name):
		   https://api.github.com/users/<your name>
*/

let data;
let fNames = ["tetondan", "dustinmyers", "justsml", "luishrd", "bigknell"];

axios
	.get("https://api.github.com/users/ogrotten")
	.then(res => {
		// data = res.data;
		// clg(data);

		cardCreate(res.data);
	})
	.catch(res => {
		clg("problem.");
	});

fNames.forEach(e => {
	axios
		.get(`https://api.github.com/users/${e}`)
		.then(res => {
			followersArray.push(res.data);
			// clg(followersArray);
			cardCreate(res.data)
		})
		.catch(res => {
			clg(`problem with ${e}`);
		});
});


/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
		   create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
		  follow this link in your browser https://api.github.com/users/<Your github name>/followers 
		  , manually find some other users' github handles, or use the list found 
		  at the bottom of the page. Get at least 5 different Github usernames and add them as
		  Individual strings to the friendsArray below.
		  
		  Using that array, iterate over it, requesting data for each user, creating a new card for each
		  user, and adding that card to the DOM.
*/

const followersArray = [];

/* Step 3: Create a function that accepts a single object as its only argument,
		  Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
	<h3 class="name">{users name}</h3>
	<p class="username">{users user name}</p>
	<p>Location: {users location}</p>
	<p>Profile:  
	  <a href={address to users github page}>{address to users github page}</a>
	</p>
	<p>Followers: {users followers count}</p>
	<p>Following: {users following count}</p>
	<p>Bio: {users bio}</p>
  </div>
</div>
*/

function cardCreate(incoming) {
	let card = DCE("div");
	card.classList = "card";

	let avatar = DCE("img");
	avatar.src = incoming.avatar_url;

	let info = DCE("div");
	info.classList = "card-info";

	let name = DCE("h3");
	info.classList = "name";
	name.textContent = incoming.name;

	let username = DCE("p"); // ?????
	username.classList = "username";

	let location = DCE("p");
	location.textContent = "Location: ";
	location.textContent += incoming.location ? incoming.location : "Space, the final frontier.";

	let profile = DCE("p");
	profile.textContent = "Profile: ";
	let profileLink = DCE("a");
	profileLink.textContent = incoming.html_url;
	profileLink.href = incoming.html_url;
	profile.append(profileLink);

	let followers = DCE("p");
	followers.textContent = `Followers: ${incoming.followers}`;

	let followING = DCE("p");
	followING.textContent = `Following: ${incoming.following}`;

	let bio = DCE("p");
	bio.textContent = "Bio: ";
	bio.textContent += incoming.bio ? incoming.bio : "Dead.";

	info.append(avatar, name, location, profile, followers, followING, bio);
	card.append(info);
	clg(card);
	document.querySelector("div.cards").appendChild(card);
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
