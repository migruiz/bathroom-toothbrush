const { from,of, Observable,forkJoin,iif,throwError,defer,interval,empty } = require('rxjs');
const { groupBy,take, endWith,reduce,mergeMap,throttleTime,map,share,filter,first,mapTo,timeoutWith,toArray,takeWhile,delay,tap,catchError,concatMap,switchMapTo} = require('rxjs/operators');

const CronJob = require('cron').CronJob;

const cronJobStream = (cronExpr) =>  Observable.create(subscriber => {  
    
    new CronJob(
       cronExpr,
       function() {
           subscriber.next();
       },
       null,
       true,
       'Europe/London'
   );
});