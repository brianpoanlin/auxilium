function getEventInfo(eventID) {
    var eventRef = firebase.database().ref("master-events").child(eventID);

    var eventName;
    var eventCategory;
    var eventTime = {};

	eventArr[eventID] = {};
	
    console.log("getting event info...")

    eventRef.once("value").then(function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var key = childSnapshot.key;
            var childData = childSnapshot.val();

            if (key == "event_time") {

                var eventDate, eventHour, eventMinute;

                childSnapshot.forEach(function (timeSnapshot) {
                    var key = timeSnapshot.key;
                    var timeData = timeSnapshot.val();

                    if (key == "event_date") {
                        eventTime["date"] = timeData;
                    } else if (key == "event_hour") {
                        eventTime["hour"] = parseInt(timeData);
                    } else if (key == "event_minute") {
                        eventTime["minute"] = parseInt(timeData);
                    }
                })
            }else if(key == "event_location"){
                eventArr[eventID][key] = {};

                childSnapshot.forEach(function (locationSnapshot) {
                    var locKey = locationSnapshot.key;
                    var locationData = locationSnapshot.val();

                    console.log("the key: " + locKey);

                    if(locKey == "Address"){
                        eventArr[eventID][key][locKey] = {};
                        locationSnapshot.forEach(function (addressSnapshot) {
                            var addKey = addressSnapshot.key;
                            var addData = addressSnapshot.val();

                            eventArr[eventID][key][locKey][addKey] = addData;
                        })
                    }else{
                        eventArr[eventID][key][locKey] = locationData;
                    }

                })
            }else{
                eventArr[eventID][key] = childData;
            }

        })
    }).then(function () {
        console.log("Event Information Successfully Retrieved!");

        var timeStr = eventTime["date"] + " @ " + formatTime(eventTime["hour"], eventTime["minute"]);

        console.log("timestr: " + timeStr);

        eventArr[eventID]["event_time"] = timeStr;

        console.log("event arr : " + JSON.stringify(eventArr));
		
		var imgSrc = "img/logo.png";
		
		switch(eventArr[eventID]["event_category"]){
			case "Food":
				imgSrc = "img/Food.png";
				break;
			case "Clean":
				imgSrc = "img/Clean.png";
				break;
			default:
				imgSrc = "img/logo.png";
		}
			
		$("#title-wrap p").text(eventArr[eventID]["event_name"]);
		$("#description-wrap p").text(eventArr[eventID]["event_description"]);
		$("#location-wrap p").text(eventArr[eventID]["event_location"]["Address"]["street_name"] + ", " + eventArr[eventID]["event_location"]["Address"]["street_city"] + ", " + eventArr[eventID]["event_location"]["Address"]["street_state"] + ", " + eventArr[eventID]["event_location"]["Address"]["street_zipcode"]);
		$("#time-wrap p").text(timeStr);
		
    })
}

function formatTime(hour, minute){
    var text = "";
    var amPM = "AM"
    if(hour >= 12){
        amPM = "PM";
        hour = hour - 12;
    }

    if(hour == 0){
        hour = 12;
    }

    var newMinute = minute.toString();

    if(newMinute.length <= 1){
        newMinute = "0" + newMinute;
    }

    return hour + ":" + newMinute + " " + amPM;

}

findEvents();

var eventArr = {};

function findEvents(){
    var ref = firebase.database().ref("master-events");
    ref.once("value").then(function (snapshot) {
		var key = window.location.href.substr(window.location.href.indexOf("key=")+4);
		getEventInfo(key);
	});
}

//getEventInfo("-KcBrVinxXeMi8IKCyGQ");
