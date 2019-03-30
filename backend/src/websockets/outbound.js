
const websockets = [];

/**
 * 
 * @param {string} message | stringified message to be broadcasted to all websocket clients
 */
const broadcast = (message) => {
    websockets.forEach(ws => {
        ws.send(message);
    });
};

module.exports = {websockets, broadcast};
