
var socket;

var connectToSocket = () => {
    socket = io("http://localhost:3000");
    
    socket.on("receive_msg", (msg) => {
        addMsgToBlock(msg, 'receive');
    })

    socket.on("970387653", (msg) => {

    })
}

/*
socket.on("receivemsg", (data) => {
    //addMsg(data, 'receive');
}); */


var sendMessage = () => {
    var msg = $("#userMsg").val();
    $("#userMsg").val('');
    addMsgToBlock(msg, 'send');
    socket.emit("user_send_msg", msg);
}

var addMsgToBlock = (msg, type) => {
    /*var className;
    if (type == 'send') {
        className = 'sentMsg';
    } else {
        className = 'receiveMsg';
    }*/
    var className = (type == 'send') ? 'sentMsg' : 'receiveMsg';
    var divTag = $("<div />").text(msg).addClass(className);
    $(".msgblock").append(divTag);
}

let closeBox = ()=>{
    $(".chatContainer").css("display", "none");
}