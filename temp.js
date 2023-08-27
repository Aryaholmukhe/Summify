// get the html elements

let keyPoints = document.getElementById("message");
let summaryHtml = document.getElementById("summary");

const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjUyMjYwNjkwODgyNzIzODQiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiNnZ0cmtiV1pudWhhZ1VySkNYbWhPN20wbmpmZ3JXTmxAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjkzMDAzNDA1LCJleHAiOjE2OTMwODk4MDUsImF6cCI6IjZ2dHJrYldabnVoYWdVckpDWG1oTzdtMG5qZmdyV05sIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.enR3Q59Glz45gaqF1qSHBhfIK95T2EcRKC0YjIWveC5w-m0OFWzR6l0Krn5FWy3s33PY0lKYrrzMkj28zxdnHx5y5BRb22KE3NgZlMkJay-eShcv3YvIwD-2awfWzgYVRmQdV5C6RRh2e5FoLcGqUxa1I-KncDXNT_YZQGmQIOo12nxQbnLBugz0sgjxNqZlvRVECnjtcyGhSLAAtn-ohyh69AssuhmCiZU2C0x3P9pa-jweIIbHcacMu7tOkT6ENmh9Y4dwSQyMvecV07Omeqn7gL8BLiz_NJ6lns41sWRIyoZhCI_2QEOLuS8DevnzKqkFsApIjEoOMZrtnqMLwQ'
    }
};


//Get URL From Webpage
document.addEventListener("DOMContentLoaded", 
    function() {
        const audioForm = document.getElementById("audioURLForm");
        // const audioInput = document.getElementById("audioURLInput");

        audioForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the form from submitting
            // console.log(audioInput.value)
            const selectedFile = audioInput.value;
            if (selectedFile) {
                console.log("Selected file:", selectedFile);
                getAudioURLConverID(selectedFile)
                // You can perform further actions with the selected file here
            } else {
                console.log("No file selected");
            }
        });
    }
);

document.addEventListener("DOMContentLoaded", 
    function() {
        const videoForm = document.getElementById("videoURLForm");
        const videoInput = document.getElementById("videoURLInput");

        videoForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent the form from submitting
            // console.log(audioInput.value)
            const selectedFile = videoInput.value;
            if (selectedFile) {
                console.log("Selected file:", selectedFile);
                getVideoURLConverID(selectedFile)
                // You can perform further actions with the selected file here
            } else {
                console.log("No file selected");
            }
        });
    }
);



let conversationId = 6634567105773568;


async function getAudioURLConverID(url_link) {
    // DONT TOUCH THIS
    const optionsPost = {
        method: 'POST',
        headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjUyMjYwNjkwODgyNzIzODQiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiNnZ0cmtiV1pudWhhZ1VySkNYbWhPN20wbmpmZ3JXTmxAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjkzMDAzNDA1LCJleHAiOjE2OTMwODk4MDUsImF6cCI6IjZ2dHJrYldabnVoYWdVckpDWG1oTzdtMG5qZmdyV05sIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.enR3Q59Glz45gaqF1qSHBhfIK95T2EcRKC0YjIWveC5w-m0OFWzR6l0Krn5FWy3s33PY0lKYrrzMkj28zxdnHx5y5BRb22KE3NgZlMkJay-eShcv3YvIwD-2awfWzgYVRmQdV5C6RRh2e5FoLcGqUxa1I-KncDXNT_YZQGmQIOo12nxQbnLBugz0sgjxNqZlvRVECnjtcyGhSLAAtn-ohyh69AssuhmCiZU2C0x3P9pa-jweIIbHcacMu7tOkT6ENmh9Y4dwSQyMvecV07Omeqn7gL8BLiz_NJ6lns41sWRIyoZhCI_2QEOLuS8DevnzKqkFsApIjEoOMZrtnqMLwQ'
        },
        body: JSON.stringify({
        url: url_link
        })
    };

    
    await fetch('https://api.symbl.ai/v1/process/audio/url', optionsPost)
        .then(response => response.json())
        .then(response => {conversationId = response["conversationId"];})
        .catch(err => console.error(err));
    console.log("ConversationID", conversationId)
    document.getElementById("converID").innerHTML = conversationId;
}   
  

async function getVideoURLConverID(url_link) {
    // DONT TOUCH THIS
    const optionsPost = {
        method: 'POST',
        headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjUyMjYwNjkwODgyNzIzODQiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiNnZ0cmtiV1pudWhhZ1VySkNYbWhPN20wbmpmZ3JXTmxAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjkzMDAzNDA1LCJleHAiOjE2OTMwODk4MDUsImF6cCI6IjZ2dHJrYldabnVoYWdVckpDWG1oTzdtMG5qZmdyV05sIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.enR3Q59Glz45gaqF1qSHBhfIK95T2EcRKC0YjIWveC5w-m0OFWzR6l0Krn5FWy3s33PY0lKYrrzMkj28zxdnHx5y5BRb22KE3NgZlMkJay-eShcv3YvIwD-2awfWzgYVRmQdV5C6RRh2e5FoLcGqUxa1I-KncDXNT_YZQGmQIOo12nxQbnLBugz0sgjxNqZlvRVECnjtcyGhSLAAtn-ohyh69AssuhmCiZU2C0x3P9pa-jweIIbHcacMu7tOkT6ENmh9Y4dwSQyMvecV07Omeqn7gL8BLiz_NJ6lns41sWRIyoZhCI_2QEOLuS8DevnzKqkFsApIjEoOMZrtnqMLwQ'
        },
        body: JSON.stringify({
        url: url_link
        })
    };

    
    await fetch('https://api.symbl.ai/v1/process/video/url', optionsPost)
        .then(response => response.json())
        .then(response => {conversationId = response["conversationId"];})
        .catch(err => console.error(err));
    console.log("ConversationID", conversationId)
    document.getElementById("converID").innerHTML = conversationId;
}   

//Fetching API for Summary
let summaryInfo
async function getSummary(url_link){

      await fetch(url_link, options)
        .then(response => response.json())
        .then(response => {summaryInfo=response; console.log("URL IN FETCH", url_link);console.log("Response", response);})
        .catch(err => console.error(err));
}

async function getURLSummary(){

    let audioSummaryURL = "https://api.symbl.ai/v1/conversations/"+conversationId+"/summary"

    information = await getSummary(audioSummaryURL)
    console.log(summaryInfo)
    summaryHtml.innerHTML = `<p>${JSON.stringify(summaryInfo.summary[0].text)}</p>`;
    summaryHtml.innerHTML += `<p>${JSON.stringify(summaryInfo.summary[1].text)}</p>`;


}    


//Fetching API for Message
let messageInfo
async function getMessage(url_link){
    // const options = {
    //     method: 'GET',
    //     headers: {
    //       accept: 'application/json',
    //       authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjUyMjYwNjkwODgyNzIzODQiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiNnZ0cmtiV1pudWhhZ1VySkNYbWhPN20wbmpmZ3JXTmxAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjkzMDAzNDA1LCJleHAiOjE2OTMwODk4MDUsImF6cCI6IjZ2dHJrYldabnVoYWdVckpDWG1oTzdtMG5qZmdyV05sIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.enR3Q59Glz45gaqF1qSHBhfIK95T2EcRKC0YjIWveC5w-m0OFWzR6l0Krn5FWy3s33PY0lKYrrzMkj28zxdnHx5y5BRb22KE3NgZlMkJay-eShcv3YvIwD-2awfWzgYVRmQdV5C6RRh2e5FoLcGqUxa1I-KncDXNT_YZQGmQIOo12nxQbnLBugz0sgjxNqZlvRVECnjtcyGhSLAAtn-ohyh69AssuhmCiZU2C0x3P9pa-jweIIbHcacMu7tOkT6ENmh9Y4dwSQyMvecV07Omeqn7gL8BLiz_NJ6lns41sWRIyoZhCI_2QEOLuS8DevnzKqkFsApIjEoOMZrtnqMLwQ'
    //     }
    //   };

      await fetch(url_link, options)
        .then(response => response.json())
        .then(response => {messageInfo=response; console.log("URL IN FETCH", url_link);console.log("Response", response);})
        .catch(err => console.error(err));
}

async function getURLMessage(){

    let audioMessageURL = "https://api.symbl.ai/v1/conversations/"+conversationId+"/messages"

    information = await getMessage(audioMessageURL)
    console.log(messageInfo)
    let messages = []
    for (let i = 0; i < messageInfo.messages.length; i++) {
        messages.push(messageInfo.messages[i].text)
        keyPoints.innerHTML += `<li>${JSON.stringify(messageInfo.messages[i].text)}</li>`;
      }
}    

let topicInfo
async function getTopic(url_link){
    // const options = {
    //     method: 'GET',
    //     headers: {
    //       accept: 'application/json',
    //       authorization: 'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlFVUTRNemhDUVVWQk1rTkJNemszUTBNMlFVVTRRekkyUmpWQ056VTJRelUxUTBVeE5EZzFNUSJ9.eyJodHRwczovL3BsYXRmb3JtLnN5bWJsLmFpL3VzZXJJZCI6IjUyMjYwNjkwODgyNzIzODQiLCJpc3MiOiJodHRwczovL2RpcmVjdC1wbGF0Zm9ybS5hdXRoMC5jb20vIiwic3ViIjoiNnZ0cmtiV1pudWhhZ1VySkNYbWhPN20wbmpmZ3JXTmxAY2xpZW50cyIsImF1ZCI6Imh0dHBzOi8vcGxhdGZvcm0ucmFtbWVyLmFpIiwiaWF0IjoxNjkzMDAzNDA1LCJleHAiOjE2OTMwODk4MDUsImF6cCI6IjZ2dHJrYldabnVoYWdVckpDWG1oTzdtMG5qZmdyV05sIiwiZ3R5IjoiY2xpZW50LWNyZWRlbnRpYWxzIn0.enR3Q59Glz45gaqF1qSHBhfIK95T2EcRKC0YjIWveC5w-m0OFWzR6l0Krn5FWy3s33PY0lKYrrzMkj28zxdnHx5y5BRb22KE3NgZlMkJay-eShcv3YvIwD-2awfWzgYVRmQdV5C6RRh2e5FoLcGqUxa1I-KncDXNT_YZQGmQIOo12nxQbnLBugz0sgjxNqZlvRVECnjtcyGhSLAAtn-ohyh69AssuhmCiZU2C0x3P9pa-jweIIbHcacMu7tOkT6ENmh9Y4dwSQyMvecV07Omeqn7gL8BLiz_NJ6lns41sWRIyoZhCI_2QEOLuS8DevnzKqkFsApIjEoOMZrtnqMLwQ'
    //     }
    //   };

      await fetch(url_link, options)
        .then(response => response.json())
        .then(response => {topicInfo=response; console.log("URL IN FETCH", url_link);console.log("Response", response);})
        .catch(err => console.error(err));
}

async function getURLTopic(){

    let audioTopicURL = "https://api.symbl.ai/v1/conversations/"+conversationId+"/topics?sentiment=true&parentRefs=true"

    information = await getTopic(audioTopicURL)
    console.log("Topic INFO", JSON.stringify(topicInfo))
    let topics = []
    let sentiment = [];
    for (let i = 0; i < topicInfo.topics.length; i++) {
        topics.push(topicInfo.topics[i].text)
        document.getElementById("topic").innerHTML += `<ul> ${JSON.stringify(topicInfo.topics[i].text)}<ul>`;
      }
      for (let i = 0; i < topicInfo.topics.length; i++) {
        sentiment.push(topicInfo.topics[i].score)
        document.getElementById("sentiment").innerHTML += `<ul> ${JSON.stringify(topicInfo.topics[i].sentiment.polarity.score)}<ul>`;
        document.getElementById("sentiment").innerHTML += `<ul> ${JSON.stringify(topicInfo.topics[i].sentiment.suggested)}<ul>`;
      }
}    



let questionInfo
async function getQuestion(url_link){

      await fetch(url_link, options)
        .then(response => response.json())
        .then(response => {questionInfo=response; console.log("URL IN FETCH", url_link);console.log("Response", response);})
        .catch(err => console.error(err));
}

async function getURLQuestion(){

    let audioQuestionURL = "https://api.symbl.ai/v1/conversations/"+conversationId+"/questions"

    information = await getQuestion(audioQuestionURL)
    console.log("Question INFO", JSON.stringify(questionInfo))
    let questions = []
    for (let i = 0; i < questionInfo.questions.length; i++) {
        questions.push(questionInfo.questions[i].text)
        document.getElementById("question").append(`<ul> ${JSON.stringify(questionInfo.questions[i].text)}<ul>`);
      }
}    

//A way to get the summary to show up when we click on the button so that it runs the function directly
// let summary = document.getElementById("Get Summary")
// if(summary.addEventListener) 
//   summary.addEventListener('onclick", functionName) 

