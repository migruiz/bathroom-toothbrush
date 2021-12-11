const { of, Observable, } = require('rxjs');
const { mapTo,delay,concatMap, startWith} = require('rxjs/operators');

const CronJob = require('cron').CronJob;
var mqtt = require('./mqttCluster.js');

global.mtqqLocalPath = process.env.MQTTLOCAL;
const nightTimeTariffStream = () =>  new Observable(subscriber => {  
    
    new CronJob(
        '0 9 * * *',
       function() {
           subscriber.next();
       },
       null,
       true,
       'Europe/London'
   );
});

of(3).pipe(
 concatMap(v => of(v).pipe(
     delay(20  * 1000),
     mapTo("OFF"),
     startWith("ON")
     ))
).subscribe(async m => {
    console.log('bathroom/master/state', m);
    (await mqtt.getClusterAsync()).publishMessage('bathroom/master/switch/state',m)
})