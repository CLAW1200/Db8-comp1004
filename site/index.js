
function sendMessage() {
    var message = document.getElementById('message').value;
    addChatMessageUser('You', message);
}
function saveDebate() {
    // get data from debate info box
    var title = document.getElementById('debate-info').getElementsByTagName('p')[0].textContent.split(': ')[1];
    var description = document.getElementById('debate-info').getElementsByTagName('p')[1].textContent.split(': ')[1];
    var participants = document.getElementById('debate-info').getElementsByTagName('p')[2].textContent.split(': ')[1];
    var duration = document.getElementById('debate-info').getElementsByTagName('p')[3].textContent.split(': ')[1];
    var chatHistory = document.getElementById('chat-history');
    
    // get chat history
    var chatHistory = document.getElementById('chat-history');

    var debate = {
        title: title,
        description: description,
        participants: participants,
        duration: duration
    };

    // Add chat history to debate object
    debate.chatHistory = [];
    for (var i = 0; i < chatHistory.children.length; i++) {
        var message = chatHistory.children[i].textContent;
        debate.chatHistory.push(message);
    }
    var jsonDebate = JSON.stringify(debate);

    // Save jsonDebate to a JSON file and download it
    var blob = new Blob([jsonDebate], {type: "application/json"});
    var url  = URL.createObjectURL(blob);

    var a = document.createElement('a');
    a.download    = debate.title + ".json";
    a.href        = url;
    a.textContent = "Download debate.json";

    document.body.appendChild(a);          
    // Download the file
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
}

function addChatMessageUser(username, message) {
    var chatHistory = document.getElementById('chat-history');
    var messageElement = document.createElement('p');
    messageElement.textContent = username + ': ' + message;

    if (username === 'You') {
        messageElement.style.textAlign = 'right';
    } else {
        messageElement.style.textAlign = 'left';
    }

    chatHistory.appendChild(messageElement);
}        
addChatMessageUser('You', 'Hello');
addChatMessageUser('User 2', 'Hi');
addChatMessageUser('You', 'How are you?');
addChatMessageUser('User 2', 'I am good, thank you');

function addChatMessage(message) {
    var chatHistory = document.getElementById('chat-history');
    var messageElement = document.createElement('p');
    messageElement.textContent = message;
    
    if (message.startsWith('You')) {
        messageElement.style.textAlign = 'right';
    } else {
        messageElement.style.textAlign = 'left';
    }
    
    chatHistory.appendChild(messageElement);
}

function addChatInfo(title, duration, participants) {
    var chatInfo = document.getElementById('debate-info');
    var infoElement = document.createElement('p');
    infoElement.textContent = 'Title: ' + title + ', Duration: ' + duration + ', Participants: ' + participants;
    chatInfo.appendChild(infoElement);
}
//addChatInfo('Debate Title 1', '30 minutes', 2);

// Store the original HTML of the login-box
var originalLoginBoxHTML;

window.onload = function() {
    var loginBox = document.getElementsByClassName('login-box')[0];
    originalLoginBoxHTML = loginBox.innerHTML;
};

function login() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    // update account name in chat and header
    var header = document.getElementsByTagName('header')[0];
    header.getElementsByTagName('h3')[0].textContent = 'Account: ' + username;

    addChatMessageUser('You', 'Logged in as ' + username);

    // clear login box
    var loginBox = document.getElementsByClassName('login-box')[0];
    loginBox.innerHTML = '';

    // add logout button
    var logoutButton = document.createElement('button');
    logoutButton.textContent = 'Logout';
    logoutButton.onclick = function() {
        logout();
    };
    loginBox.appendChild(logoutButton);
}

function logout() {
    // clear account name in chat and header
    var header = document.getElementsByTagName('header')[0];
    header.getElementsByTagName('h3')[0].textContent = 'Account: ';

    addChatMessageUser('You', 'Logged out');

    // revert login box to original state
    var loginBox = document.getElementsByClassName('login-box')[0];
    loginBox.innerHTML = originalLoginBoxHTML;
}

// on load run overwriteCurrentDebate
window.onload = overwriteCurrentDebate();
function overwriteCurrentDebate() {
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var participants = document.getElementById('participants').value;
    var duration = document.getElementById('duration').value;

    var debate = {
        title: title,
        description: description,
        participants: participants,
        duration: duration
    };

    var chatInfoBox = document.getElementById('debate-info');
    chatInfoBox.innerHTML = ''; // Clear the chat info box

    // Create and append new elements for each attribute of the debate
    var title = document.createElement('p');
    title.textContent = 'Title: ' + debate.title;
    chatInfoBox.appendChild(title);

    var description = document.createElement('p');
    description.textContent = 'Description: ' + debate.description;
    chatInfoBox.appendChild(description);

    var participants = document.createElement('p');
    participants.textContent = 'Participants: ' + debate.participants;
    chatInfoBox.appendChild(participants);

    var duration = document.createElement('p');
    duration.textContent = 'Duration: ' + debate.duration;
    chatInfoBox.appendChild(duration);
}

function saveDebateRoomTemplate() {
    var title = document.getElementById('title').value;
    var description = document.getElementById('description').value;
    var participants = document.getElementById('participants').value;
    var duration = document.getElementById('duration').value;

    var debate = {
        title: title,
        description: description,
        participants: participants,
        duration: duration
    };

    // Title cannot be empty
    if (title === '') {
        alert('Title cannot be empty');
        return;
    }

    // Participants must be a positive integer of two or more and not empty
    if (isNaN(participants) || participants < 2) {
        alert('Participants must be two or more');
        return;
    }

    if (participants === '') {
        alert('Participants cannot be empty');
        return;
    }

    // Duration must be a positive integer of 5 mins or more and not empty
    if (isNaN(duration) || duration < 5) {
        alert('Duration must be 5 minutes or more');
        return;
    }


    if (duration === '') {
        alert('Duration cannot be empty');
        return;
    }


    var jsonDebate = JSON.stringify(debate);

    // Save jsonDebate to a JSON file and download it
    var blob = new Blob([jsonDebate], {type: "application/json"});
    var url  = URL.createObjectURL(blob); 

    var a = document.createElement('a');
    //name of the file should be the title of the debate
    a.download    = debate.title + ".json";
    a.href        = url;
    a.textContent = "Download debate.json";

    document.body.appendChild(a);

    // Download the file
    a.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

}
window.onload = addDebateItemOnclick();
function uploadDebate() {
    var fileInput = document.getElementById('upload');
    var file = fileInput.files[0];
    var reader = new FileReader();

    if (file) { // Check if a file is selected
        reader.onload = function(e) {
            var content = e.target.result;
            var debate = JSON.parse(content);

            var debateContainer = document.getElementById('debate-container');
            var debateItems = debateContainer.getElementsByClassName('debate-item');
            var isDuplicate = false;

            for (var i = 0; i < debateItems.length; i++) {
                var existingDebateTitle = debateItems[i].textContent;
                if (existingDebateTitle === debate.title) {
                    isDuplicate = true;
                    break;
                }
            }
            if (!isDuplicate) {
                var debateItem = document.createElement('div');
                debateItem.className = 'debate-item';
                debateItem.textContent = debate.title;
                // also store description, participants, duration even though not displayed
                debateItem.setAttribute('data-description', debate.description);
                debateItem.setAttribute('data-participants', debate.participants);
                debateItem.setAttribute('data-duration', debate.duration);
                debateItem.setAttribute('data-chat-history', JSON.stringify(debate.chatHistory));
                
                debateContainer.appendChild(debateItem);
            }
        };
        reader.readAsText(file);
        addDebateItemOnclick();
    }
}
function searchDebate() {
    var search = document.getElementById('search').value;
    var debateItems = document.getElementsByClassName('debate-item');

    for (var i = 0; i < debateItems.length; i++) {
        var debateItem = debateItems[i];
        var debateTitle = debateItem.textContent;

        if (debateTitle.indexOf(search) > -1) {
            debateItem.style.display = '';
        } else {
            debateItem.style.display = 'none';
        }
    }
}

function loadDebateInfo(debate) {
    console.log('Loading debate info');
    var chatInfoBox = document.getElementById('debate-info');
    chatInfoBox.innerHTML = ''; // Clear the chat info box

    // Create and append new elements for each attribute of the debate
    var title = document.createElement('p');
    title.textContent = 'Title: ' + debate.title;
    chatInfoBox.appendChild(title);

    var description = document.createElement('p');
    description.textContent = 'Description: ' + debate.description;
    chatInfoBox.appendChild(description);

    var participants = document.createElement('p');
    participants.textContent = 'Participants: ' + debate.participants;
    chatInfoBox.appendChild(participants);

    var duration = document.createElement('p');
    duration.textContent = 'Duration: ' + debate.duration;
    chatInfoBox.appendChild(duration);

    // Add chat history to chat box
    var chatHistory = debate.chatHistory;
    var chatHistoryBox = document.getElementById('chat-history');
    chatHistoryBox.innerHTML = ''; // Clear the chat history box
    try {
        for (var i = 0; i < chatHistory.length; i++) {
            var message = chatHistory[i];
            addChatMessage(message);
        }
    } catch (error) {
        console.log('No chat history found');
    }
}

// Add the onclick event to each debate item after a debate is uploaded
// window.onload = addDebateItemOnclick;
function addDebateItemOnclick() {
    //print to console
    console.log('Adding onclick event to debate items');
    var debateItems = document.getElementsByClassName('debate-item');
    console.log(debateItems);
    for (var i = 0; i < debateItems.length; i++) {
        var debateItem = debateItems[i];
        debateItem.onclick = function() {
            var title = this.textContent;
            var description = this.getAttribute('data-description');
            var participants = this.getAttribute('data-participants');
            var duration = this.getAttribute('data-duration');
            var chatHistory = this.getAttribute('data-chat-history');

            console.log(chatHistory)

            // if chat history does not exist, create an empty array
            if (chatHistory === "undefined") {
                var debate = {
                    title: title,
                    description: description,
                    participants: participants,
                    duration: duration
                };
            }
            else {
                var debate = {
                    title: title,
                    description: description,
                    participants: participants,
                    duration: duration,
                    chatHistory: JSON.parse(chatHistory)
                };
            }
                    
            loadDebateInfo(debate);
        };
    }
}
