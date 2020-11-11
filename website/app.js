/* Global Variables */
let d = new Date();
let tempr ;
let feeling ;
const APIkey ='11fe401f5f4e0b891764e50292f315f7';
const button = document.getElementById('generate');
const dp= document.getElementById('date');
const tm= document.getElementById('temp');
const fl= document.getElementById('content');

// Create a new date instance dynamically with JS
let newDate = (d.getMonth()+1)+'.'+ d.getDate()+'.'+ d.getFullYear();

//function gets felling and zip from user and tempreture data from API
const getdata = async function (url=''){
	let zipCode = document.getElementById("zip").value;
	let apiLink = 'https://api.openweathermap.org/data/2.5/weather?zip='+zipCode+'&appid='+APIkey+'&units=metric';
	feeling = document.getElementById("feelings").value;	
	const request = await fetch(apiLink)
		try {
			// Transform into JSON
			const req = await request.json();
			tempr = req.main.temp;
			console.log(tempr);
			console.log(feeling);
		}
		catch(error) {
			// appropriately handle the error
			console.log("error", error);
		}
};

	
// Async POST to send collected data to the server
const postData = async ( url = '/post', data = {temp:tempr, date:newDate, feelings:feeling})=>{

    const response = await fetch(url, {
			method: 'POST', 
			credentials: 'same-origin', 
			headers: {
			'Content-Type': 'application/json',
			},
		body: JSON.stringify(data), // body data type must match "Content-Type" header        
	});

    try {
		const newData = await response.json();
		console.log(newData);
		return newData;
		
    }catch(error) {
		console.log("error", error);
    }
};

//get data from server to update user interface
const updateUI = async (url='') =>{ 
	const request = await fetch('/get');
	try {
	 // Transform into JSON
		const allData = await request.json();
		// Update UI
		dp.innerHTML="📅 "+allData.date;
		tm.innerHTML="🌦 "+allData.temp;
		fl.innerHTML="😊 "+allData.feelings;
	}
	catch(error) {
		// appropriately handle the error
		console.log("error", error);
	}
};

button.addEventListener('click', async function (){ 

getdata().then(postData).then(updateUI)	

});



