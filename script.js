
let API_KEY = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjU0MDkyMzM0NzE1MzcxNTIiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoicFB4YXA5blNOR2gyd25sanlQdGwxSktEQmZSU1RKc1RAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjkzMTQzNzc4LCJleHAiOjE2OTMyMzAxNzgsImF6cCI6InBQeGFwOW5TTkdoMndubGp5UHRsMUpLREJmUlNUSnNUIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.U6T5lKTKEmoTCu_ow2utP9JpgnYli3hotAOqXxfEU2r-Zuo3TPh17ds55S7qqlwPLUNC-DM_G7fZuYcoTJ_U-IQMqRgRSpep4zG87ucJigtp1mU7Ie50BxW-93Jy-MXVPg9XjVRhiEcqzI-baRxk68xIFfwJ1Wl8dPVdWGZJ9G-YXAAuNFvywsjK6XIGeuyOCL6G3UqH1zU8H_CY7cEF21rV9pSsHowQIRmFlpsHcm0GRmInNss3y7kANx5KOUCRg25XG_QZm0GIn86UBfV4imjRRTffbElmNgoUwkCSm4TPoQm4gDf0nSik0hUH6eTRFyWJ-FqBgs0LU7tQQU0-yw";

/***************************Selection Tabs***************************/
function changeTabs(evt, cityName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("output_tab");

    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tablinks = document.getElementsByClassName("tablinks");

    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

/***************************Fetching API***************************/

// get the html elements
let keyPoints = document.getElementById("key_points_output");
let summaryHtml = document.getElementById("summarize_output");
let conversationId;
let jobId;


//Set header
const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        authorization: `Bearer ${API_KEY}`
    }
};


//Get AUDIO URL From Webpage
document.addEventListener("DOMContentLoaded",
    function () {
        const audioForm = document.getElementById("audioURLForm");
        const audioInput = document.getElementById("audioURLInput");
        audioForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the form from submitting
            const selectedFile = audioInput.value;
            if (selectedFile) {
                getAudioURLConverID(selectedFile);
                // You can perform further actions with the selected file here
            } else {
            }
        });
    }
);

//Get VIDEO URL from webpage
document.addEventListener("DOMContentLoaded",
    function () {
        const videoForm = document.getElementById("videoURLForm");
        const videoInput = document.getElementById("videoURLInput");

        videoForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the form from submitting
            const selectedFile = videoInput.value;
            if (selectedFile) {
                getVideoURLConverID(selectedFile)
                // You can perform further actions with the selected file here
            } else {
            }
        });
    }
);

//Get conversationId if it exists
async function getConversation(){
      
      await fetch('https://api.symbl.ai/v1/conversations/'+conversationId, options)
        .then(response => response.json())
        .catch(err => console.error(err));
}


//Getting conversationId of audio URL
async function getAudioURLConverID(url_link) {
    const optionsPost = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            url: url_link
        })
    };


    response = await fetch('https://api.symbl.ai/v1/process/audio/url', optionsPost);
    response = await response.json();
    conversationId = await response["conversationId"];
    jobId = await response["jobId"];
    if (conversationId){
        document.getElementById("converID").innerHTML = "ID found. Proceed to the next step.";
    } else {
        document.getElementById("converID").innerHTML = "ID not found. Please submit file in the correct format.";
    }
    await getConversation()
}

//Getting if the job is complete
async function getJobStatus(){
    response = await fetch('https://api.symbl.ai/v1/job/'+jobId, options)
    response = await response.json()
    return response["status"]
}

//Getting conversationId of video URL
async function getVideoURLConverID(url_link) {
    // DONT TOUCH THIS
    const optionsPost = {
        method: 'POST',
        headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            url: url_link
        })
    };

    response = await fetch('https://api.symbl.ai/v1/process/video/url', optionsPost);
    response = await response.json();
    conversationId = await response["conversationId"];
    jobId = await response["jobId"];
    if (conversationId){
        document.getElementById("converID").innerHTML = "ID found. Proceed to the next step.";
    } else {
        document.getElementById("converID").innerHTML = "ID not found. Please submit file in the correct format.";
    }
}

/******Fetching API for Summary******/

let summaryInfo
async function getSummary(url_link) {
    async function fetchJSON(url, options) {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
    }
    summaryInfo = await fetchJSON(url_link, options)
}

let summaryInterval
function setsummaryInterval(){
        let URLInput
        let selectedFile
        try {
            URLInput = document.getElementById("videoURLInput");
            selectedFile = URLInput.value;
        } catch(err) {
            URLInput = document.getElementById("audioURLInput");
            selectedFile = URLInput.value;
        }
        
        if (selectedFile && conversationId) {
            document.getElementById("loadersummerize").style.display = "block";
            getURLSummary()
            summaryInterval = setInterval(getURLSummary, 5000);
        } else {
        }
    }

async function getURLSummary() {
    let audioSummaryURL = `https://api.symbl.ai/v1/conversations/${conversationId}/summary`;

    information = await getSummary(audioSummaryURL);
    let workingstatus = await getJobStatus();
    // Show loader while fetching summary
    document.getElementById("loadersummerize").style.display = "block";
    summaryHtml.innerHTML = "";

    if (workingstatus === "in_progress") {
        // Keep the loader visible while the job is in progress
    } else {
        clearInterval(summaryInterval)
        // Hide the loader once the job is complete
        document.getElementById("loadersummerize").style.display = "none";
        for (let i = 0; i < summaryInfo.summary.length; i++) {
            summaryHtml.innerHTML += `<p>${JSON.stringify(summaryInfo.summary[i].text)}</p>`;
        }
        if (summaryInfo.summary.length == 0){
            summaryHtml.innerHTML = "Sorry, there is no detected summary for this file."
        } 
        
    }
}

/******Fetching API for Key Points******/

let messageInfo
async function getMessage(url_link) {

    async function fetchJSON(url, options) {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
    }
    messageInfo = await fetchJSON(url_link, options)
}

let messageInterval
function setmessageInterval(){
        let URLInput
        let selectedFile
        try {
            URLInput = document.getElementById("videoURLInput");
            selectedFile = URLInput.value;
        } catch(err) {
            URLInput = document.getElementById("audioURLInput");
            selectedFile = URLInput.value;
        }
        if (selectedFile && conversationId) {
            document.getElementById("loaderkeypoint").style.display = "block";
            getURLMessage()
            messageInterval = setInterval(getURLMessage, 5000);
        } else {
        }
}

async function getURLMessage() {

    let audioMessageURL = "https://api.symbl.ai/v1/conversations/" + conversationId + "/messages"
    keyPoints.innerHTML = "";
    information = await getMessage(audioMessageURL)
    document.getElementById("loaderkeypoint").style.display = "block";
    let workingstatus = await getJobStatus();
    if (workingstatus === "in_progress") {
        // Keep the loader visible while the job is in progress
    } else {
        clearInterval(messageInterval)
        document.getElementById("loaderkeypoint").style.display = "none";
        let messages = []
        for (let i = 0; i < messageInfo.messages.length; i++) {
            messages.push(messageInfo.messages[i].text)
            keyPoints.innerHTML += `<li>${JSON.stringify(messages[i])}</li>`;
        }
        if (messages.length == 0){
            keyPoints.innerHTML = "Sorry, there is no detected messages for this file."
        } 
    }
}

/******Fetching API for Topics w/ Sentiment******/

let topicInfo
async function getTopic(url_link) {

    async function fetchJSON(url, options) {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
    }
    topicInfo = await fetchJSON(url_link, options)
}

let topicInterval
function settopicInterval(){
        let URLInput
        let selectedFile
        try {
            URLInput = document.getElementById("videoURLInput");
            selectedFile = URLInput.value;
        } catch(err) {
            URLInput = document.getElementById("audioURLInput");
            selectedFile = URLInput.value;
        }
        if (selectedFile && conversationId) {
            document.getElementById("loaderkeytopic").style.display = "block";
            getURLTopic()
            topicInterval = setInterval(getURLTopic, 5000);
        } else {
            
        }
}

async function getURLTopic() {

    let audioTopicURL = "https://api.symbl.ai/v1/conversations/" + conversationId + "/topics?sentiment=true&parentRefs=true";
    
    let topic = document.getElementById("topic")
    topic.innerHTML = "";
    
    information = await getTopic(audioTopicURL)

    
    document.getElementById("loaderkeytopic").style.display = "block";
    let workingstatus = await getJobStatus();
    if (workingstatus === "in_progress") {
        // Keep the loader visible while the job is in progress
    } else {
        clearInterval(topicInterval)
        document.getElementById("loaderkeytopic").style.display = "none";
        
        for (let i = 0; i < topicInfo.topics.length; i++) {
            let score = `score: ${JSON.stringify(topicInfo.topics[i].sentiment.polarity.score)}`;
            let sentiment = `--> ${JSON.stringify(topicInfo.topics[i].sentiment.suggested)}`;
            topic.innerHTML += `<p>Topic: ${JSON.stringify(topicInfo.topics[i].text)}<br /><span class="sentiment">${score} ${sentiment}</span></p>`;
            }
        if (topicInfo.topics.length == 0){
            topic.innerHTML = "Sorry, there is no detected topic for this file."
        } 

    }
}

/******Fetching API for Questions******/

let questionInfo
async function getQuestion(url_link) {
    async function fetchJSON(url, options) {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
    }
    questionInfo = await fetchJSON(url_link, options)
}

let questionInterval
function setquestionInterval(){
        let URLInput
        let selectedFile
        try {
            URLInput = document.getElementById("videoURLInput");
            selectedFile = URLInput.value;
        } catch(err) {
            URLInput = document.getElementById("audioURLInput");
            selectedFile = URLInput.value;
        }
        if (selectedFile && conversationId) {
            document.getElementById("loaderquestion").style.display = "block";
            getURLQuestion()
            questionInterval = setInterval(getURLQuestion, 5000);
        } else {

        }
}

async function getURLQuestion() {
    
    let audioQuestionURL = "https://api.symbl.ai/v1/conversations/" + conversationId + "/questions"

    information = await getQuestion(audioQuestionURL)
    document.getElementById("loaderquestion").style.display = "block";
    let workingstatus = await getJobStatus();
    document.getElementById("question").innerHTML = "";
    if (workingstatus === "in_progress") {
        // Keep the loader visible while the job is in progress
    } else {
        clearInterval(questionInterval)
        document.getElementById("loaderquestion").style.display = "none";
        let questions = []
        for (let i = 0; i < questionInfo.questions.length; i++) {
            questions.push(questionInfo.questions[i].text)
            document.getElementById("question").innerHTML += `<ul> ${JSON.stringify(questionInfo.questions[i].text)}<ul>`;
        }

        if (questionInfo.questions.length == 0){
            document.getElementById("question").innerHTML = "Sorry, there is no detected question for this file."
        } 
    }
}

//A way to get the summary to show up when we click on the button so that it runs the function directly

function htmlDecode(input) {
    var doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

function linkCopy() {
    // Get the text field
    var copyText = document.getElementById("linkcopy");
  
    // // Select the text field
  
    // Copy the text inside the text field
    navigator.clipboard.writeText(htmlDecode(copyText.innerHTML));
    
    // Alert the copied text
    alert("Copied the text: " + htmlDecode(copyText.innerHTML));
  }

