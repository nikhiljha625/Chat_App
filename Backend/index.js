import  express from "express";
import { Server } from 'socket.io';
import { createServer } from 'http';
const app=express();

app.use(express.json());

let chats=[]
app.post('/sendmsg',(req,res)=>{
    let msg=req.body.msg;
    let sender=req.body.sender;
    let receiver=req.body.receiver;
    chats.push({
        "msg":msg,
        "sender":sender,
        "receiver":receiver,
        "time": new Date(),
        "isseen":false
    })
    res.send("Sent")
})

app.get('getallmsg',(req,res)=>{
    let receiver=req.body.receiver;
    let relevantChats=chats.filter(chat=> chat.receiver===receiver)
    res.send(relevantChats);
})

const port=3051;
app.listen(port)


// web socket based

const server= createServer(app);
const io=new Server(server);


function onConnect(socket){
    socket.emit('getUserID');
    socket.on()
}


io.on('connect',onConnect);