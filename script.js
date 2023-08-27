
let API_KEY = "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjU2NDE4NjMwNjAyNTg4MTYiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiN1RRRGFnNU15QmNrZlEyMlY0ODRRdVk1Y0JRa0t0QzFAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjkzMDkwMDg3LCJleHAiOjE2OTMxNzY0ODcsImF6cCI6IjdUUURhZzVNeUJja2ZRMjJWNDg0UXVZNWNCUWtLdEMxIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.qK-4Gpl-Nxzs_P-K4cin6v1TnmEvnptsS2g_XKWBKM-zlhR6wr8aiHiahOy4CuojvgxNW9Zv3AfVH4MX3dWOytpKY6hzTHn252Srn_x2trmTfUV9uIM4ZchZyAVJIRGv91_r88F2_36c7StQmAPixNRRFHwGT3jOa_MupPoVJ1tZBkVc4L_Jk3H4PPvr7n3EVI29sIVrKNZ8euLWVXqNQZ1r_9GbF1DdxHklP-CSSxFW8zspUYWHZjBW4RWoMWX840Eov-eU2wvLhlwii5ubjJOTXO2vohRjyPsWXl-ABILevNQrdcGsbIl123lfKfIGi5wryFRYzHrN_fxTLZ3WCA";

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
// let conversationId = 5088577051688960;
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
        console.log(audioForm)
        audioForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent the form from submitting
            // console.log(audioInput.value)
            const selectedFile = audioInput.value;
            if (selectedFile) {
                console.log("Selected file:", selectedFile);
                getAudioURLConverID(selectedFile);
                // You can perform further actions with the selected file here
            } else {
                console.log("No file selected");
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
            // console.log(audioInput.value)
            const selectedFile = videoInput.value;
            if (selectedFile) {
                console.log("Selected Video file:", selectedFile);
                getVideoURLConverID(selectedFile)
                // getConversation()
                // You can perform further actions with the selected file here
            } else {
                console.log("No file selected");
            }
        });
    }
);


async function getConversation(){
      
      await fetch('https://api.symbl.ai/v1/conversations/'+conversationId, options)
        .then(response => response.json())
        .then(response => console.log(response))
        .catch(err => console.error(err));
}

// let conversationId = 5088577051688960;


async function getAudioURLConverID(url_link) {
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


    response = await fetch('https://api.symbl.ai/v1/process/audio/url', optionsPost);
    response = await response.json();
    conversationId = await response["conversationId"];
    jobId = await response["jobId"];
        // .then(response => response.json())
        // .then(response => console.log(response))
        // .then(response => { conversationId = response["conversationId"]; })
        // .then(response => { jobId = response["jobId"];})
        // .catch(err => console.error(err));
    console.log("ConversationID", conversationId)
    document.getElementById("converID").innerHTML = "ID found. Proceed to the next step.";
    await getConversation()
}

async function getJobStatus(){
    response = await fetch('https://api.symbl.ai/v1/job/'+jobId, options)
    response = await response.json()
    console.log(response.status)
    return response["status"]
}

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
        // .then(response => response.json())
        // .then(response => { conversationId = response["conversationId"]; })
        // .catch(err => console.error(err));
    console.log("ConversationID", conversationId)
    document.getElementById("converID").innerHTML = "ID found. Proceed to the next step.";
}


  

//Fetching API for Summary
let summaryInfo
async function getSummary(url_link) {
      
    // response = await fetch(url_link, options)
    //     // .then(response => response.json())
    //     // .then(response => {summaryInfo = response; console.log("summary info has been added")})
    //     // .catch(err => console.error(err));
    // summaryInfo = await response.json()

    async function fetchJSON(url, options) {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        return response.json();
    }
    summaryInfo = await fetchJSON(url_link, options)
    console.log("SummaryInfo", summaryInfo);
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
        
        if (selectedFile) {
            document.getElementById("loadersummerize").style.display = "block";
            summaryInterval = setInterval(getURLSummary, 5000);
        } else {
            console.log("No file selected");
        }
    }

async function getURLSummary() {
    let audioSummaryURL = `https://api.symbl.ai/v1/conversations/${conversationId}/summary`;

    information = await getSummary(audioSummaryURL);
    console.log(JSON.stringify(summaryInfo));
    let workingstatus = await getJobStatus();
    console.log("returned:", getJobStatus());

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


//Fetching API for Message
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
    // await fetch(url_link, options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .then(response => { messageInfo = response; console.log("URL IN FETCH", url_link); console.log("Response", response);console.log(messageInfo)})
    //     .catch(err => console.error(err));
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
        if (selectedFile) {
            document.getElementById("loaderkeypoint").style.display = "block";
            messageInterval = setInterval(getURLMessage, 5000);
        } else {
            console.log("No file selected");
        }
}

async function getURLMessage() {

    let audioMessageURL = "https://api.symbl.ai/v1/conversations/" + conversationId + "/messages"
    keyPoints.innerHTML = "";
    information = await getMessage(audioMessageURL)
    console.log(JSON.stringify(messageInfo))
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

    // await fetch(url_link, options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .then(response => { topicInfo = response; console.log("URL IN FETCH", url_link); console.log("Response", response);console.log("TopicInfo", topicInfo);})
    //     .catch(err => console.error(err));
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
        if (selectedFile) {
            document.getElementById("loaderkeytopic").style.display = "block";
            topicInterval = setInterval(getURLTopic, 5000);
        } else {
            console.log("No file selected");
        }
}

async function getURLTopic() {

    let audioTopicURL = "https://api.symbl.ai/v1/conversations/" + conversationId + "/topics?sentiment=true&parentRefs=true";
    
    // let score = document.getElementById("score")
    // let sentiment = document.getElementById("sentiment")
    let topic = document.getElementById("topic")
    // score.innerHTML = ""
    // sentiment.innerHTML = ""
    topic.innerHTML = "";
    
    information = await getTopic(audioTopicURL)
    console.log("Topic INFO", JSON.stringify(topicInfo))
    
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
    // await fetch(url_link, options)
    //     .then(response => response.json())
    //     .then(response => console.log(response))
    //     .then(response => {questionInfo = response; console.log("URL IN FETCH", url_link); console.log("Response", questionInfo); })
    //     .catch(err => console.error(err));
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
        if (selectedFile) {
            document.getElementById("loaderquestion").style.display = "block";
            questionInterval = setInterval(getURLQuestion, 5000);
        } else {
            console.log("No file selected");
        }
}

async function getURLQuestion() {
    
    let audioQuestionURL = "https://api.symbl.ai/v1/conversations/" + conversationId + "/questions"

    information = await getQuestion(audioQuestionURL)
    console.log("Question INFO", JSON.stringify(questionInfo))
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
// let summary = document.getElementById("Get Summary")
// if(summary.addEventListener)
//   summary.addEventListener('onclick", functionName) 



