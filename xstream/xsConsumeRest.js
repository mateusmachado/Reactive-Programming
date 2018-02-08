const xs = require('xstream'); 
const fetch = require('fetch');

const URL = "https://jsonplaceholder.typicode.com/users";
const producer = {
    emitter(){
        const that = this;
        return {
            next(){
                emitUserData(listener);
            },
            complete(){
                that.stop()
            }
        }
    },
    start(listener){
        xs.Stream.periodic(5000).take(2).addListener(this.emitter())
    },
    stop(){
        listener.complete();
    }
}
const emitUserData = (listener) => {
    fetch.fetchUrl(URL, (error, meta, body) => {
        if(error) return;
        const data = JSON.parse(body.toString());
        data.forEach(user => {
            listener.next(user)
        }, this);
    })
}
const simplifyUserData = (user) => {
    return {
        name: user.name,
        email: user.email,
        website: user.website
    }
}
const listener = {
    next(user){
        console.log(`user name is ${user.name}`);
        console.log(`user email is ${user.email}`);
        console.log(`user website is ${user.website}`);
        console.log('------------------------------');
    },
    error(){
        console.error("stream error");
    },
    complete(){
        console.log("stream completed");
    }
}

const userStream = xs.Stream.create(producer).map(simplifyUserData);
userStream.addListener(listener);