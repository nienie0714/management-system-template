let uuid = require('node-uuid');
let WebSocketServer = require('ws').Server;
let wss = new WebSocketServer({
    port: 9999
});

console.log('Your server application is running here: http://localhost:9999');

class Client {
    constructor(nickname, ws) {
        this.id = uuid.v4();
        this.nickname = nickname;
        this.ws = ws;
    }

    output() {
        return {
            id: this.id,
            nickname: this.nickname
        };
    }
}

let clients = [];
let clientIndex = 0;
wss.on('connection', ws => {
    console.log('connection');
    ws.on('message', message => {
        console.log('receive message', message);
        let data = JSON.parse(message);
        //接受消息
        if (data.type) {
            clients.forEach(item => {
                console.log(clients.length, item.id, data.id);
                if (item.id === data.id) {
                    send(item, 1, data.text);
                }
            });
        } else {
            if (data.id) {
                let index = -1;
                clients.forEach(item => {
                    //登入
                    if (item.id === data.id) {
                        index = 1;
                        item.ws = ws;
                        send(item, 0, '欢迎' + item.nickname + '加入聊天室');
                    }
                });
                if (index === -1) {
                    createUser(ws);
                }
            } else {
                createUser(ws);
            }
        }
    });

    ws.on('close', message => {
        console.log('server closed...', '(status=' + message + ')');
    });
});

//新建用户
function createUser(ws) {
    console.log('create user...');
    let client = new Client('匿名' + clientIndex, ws);
    clients.push(client);
    clientIndex++;
    send(client, 0, '欢迎新用户' + client.nickname + '加入聊天室');
}

//type:0通知消息，1聊天消息
function send(currentClient, type, message) {
    console.log('send message...');
    clients.forEach(client => {
        console.log(client.nickname, '(readyStatus=' + client.ws.readyState + ')');
        if (client.ws.readyState === 1) {
            console.log(
                JSON.stringify(
                    Object.assign(currentClient.output(), {
                        type,
                        message
                    })
                )
            );
            client.ws.send(
                JSON.stringify(
                    Object.assign(currentClient.output(), {
                        type,
                        message
                    })
                )
            );
        }
    });
}
