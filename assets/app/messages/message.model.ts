export class Message {
    constructor(public content:string, public username:string, public messageId?:string, public userId?:string){
        this.content = content;
        this.username = username;
        this.messageId = messageId;
        this.userId = userId
    }
}