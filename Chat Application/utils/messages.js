const moment = require('moment');

// format message to have username, text and time values
function formatMessage(username, text){
    return {
        username, 
        text, 
        time: moment().format('h:mm a')
    }
}

module.exports = formatMessage;