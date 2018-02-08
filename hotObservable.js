const Rx = require('rxjs/Rx');

const source = Rx.Observable.interval(2000)
                            .startWith(123)
                            .publish()
                            .refCount();
source.subscribe(value => console.log("first observer", value))
setTimeout(_ =>{
    source.subscribe(value => console.log("second observer", value))
}, 5000);
setTimeout(_ =>{
    source.subscribe(value => console.log("third observer", value))
}, 8000)