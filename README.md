# INTRO

## EVENT LOOP

*Stack* is where all your JavaScript code gets pushed and executed one by one as the interpreter reads your program, and gets popped out once the execution is done. If your statement is asynchronous: `setTimeout`,`AJAX`, `promise`, or `click` event, then that code gets forwarded to *Event Table*, which is responsible for moving your asynchronous code to *Callback/Event Queue* after specified time.

*Heap* is where all the memory allocation happens for your variables that you have defined in your program.

*Callback Queue* is where your asynchronous code gets pushed to, and waits for the execution.

*Event Loop* keeps running continuously and checks the *Main Stack*. If it has any frames to execute, if not then it checks if *Callback Queue* has codes to execute then it pops the message from it to the *Main Stack* for the execution.

*Job Queue* is another queue browsers have introduced (the other one is *Callback Queue*). This functionality is reserved only for `new Promise()`, so when you use promises in your code, you add `.then()` method, which is a cabllback method. These 'thenable' methods are added to *Job Queue* once the promise has returned/resolved, and then gets executed.

Example"

```javascript
console.log('Message no. 1: Sync');
setTimeout(function() {
   console.log('Message no. 2: setTimeout');
}, 0);

var promise = new Promise(function(resolve, reject) {
   resolve();
});

promise.then(function(resolve) {
   console.log('Message no. 3: 1st Promise');
})

.then(function(resolve) {
   console.log('Message no. 4: 2nd Promise');
});

console.log('Message no. 5: Sync');
```

The output of this is:

// Message no. 1: Sync
// Message no. 5: Sync
// Message no. 2: setTimeout
// Message no. 3: 1st Promise
// Message no. 4: 2nd Promise

The sync console output is expected to come first in chronologic order. As for the async console output, they also come in chronological order, but only after the sync ones.

Take note that the `setTimeout` callback takes a parameter of 0 as time to timeout, that doesn't mean the code will run imediately, but that it runs as soons as *Main Stack* is done with its tasks, it's pretty much like `.then()`.

Your asynchronous code will run after the *Main Stack* is done with all the task execution.

## CALLBACK

A *callback* is a function passed as an argument to another function. This techinique allows a function to call another function. A *callback* function can run after another function has finished.

Remember that when you pass a function as an argument, remember not to use parenthesis. Write `calculator(5, 5, display)` and not `display()`.

*Callback* functions really shine in asynchronous functions, where one function has to wait for another function.

## PROMISES

*Promises* are important building blocks for asynchronous operations in JavaScript.

*Promise* is a special JavaScript object. It produces a value after an asynchronous (aka, *async*) operation completes successfully, or an error if it does not complete successfully due to time out, network error, and so on.

Successful call completions are indicated by the `resolve` function call, and errors are indicated by the `reject` function call.

While *callbacks* are useful, there is a huge downside to them as well. At times, we may have one callback inside another callback that that is yet inside another callback and so on. This is called *callback hell*.

There are a few ways to come out of (or not get into) *callback hell*. The most commom one is by using a *Promise* or *async* function. However, to understand *async* functions well, you need to have a fair understanding of *Promise* first.

The syntax for a *Promise* is as follows ->

```javascript
let promise = new Promise(function(resolve, reject) {
  // Code to execute
});
```

The executor function takes two arguments, `resolve` and `reject`. These are the callbacks provided by the JavaScript language. Your logic goes inside the executor function that runs automatically when a `new` *Promise* is created.

A promisse object has 3 states ->

- *Pending*: as soon as the executor function starts execution;
- *Fulfilled*: when the promise is resolved;
- *Rejected*: when the promise is rejected.

As for results, there are 3 outcomes ->

- *undefined*: when the `state` is *pending*;
- *value*: when the `resolve(value)` is called;
- *error*: when the `reject(error)` is called.

As soon as a *Promise* reaches *fulfilled* or *rejected*, it's treated as *settled*.

### HANDLERS

A *Promise* uses an executor function to complete a task (mostly asynchronously). A consumer function (that uses an outcome of the promise) should get notified when the executor function is done with either resolving or rejecting.

The handler methods, `.then()`, `.catch()` and `.finally()` help to create the link between the executor and the consumer functions so that they can be in sync when a promise settles.

Much like Dart (Yeah, I know Dart is influenced by JavaScript), `.then()` is best suited for no-errors-scenario and `.catch()` for when they exist, but the former could potentially bring errors as well, acting like Dart's `.whenComplete()`.

The `.finally()` handler performs cleanups like stopping a loader, closing a live connection, and so on. It will be called irrespective of wether a promise `resolves` or `rejects`. It passes through the result or error to the next handler can call a `.then()` or `.catch()` again.

```javascript
let loading = true;
loading && console.log('Loading...');

// Getting Promise
promise = getPromise(ALL_POKEMONS_URL);

promise.finally(() => {
    loading = false;
    console.log(`Promise Settled and loading is ${loading}`);
}).then((result) => {
    console.log({result});
}).catch((error) => {
    console.log(error)
});
```

If the promise resolves, the `.then()` method will be called, otherwise the `.catch()` method will be called. As for `.finally()`, it doesn't matter the outcome, it will run regardless.

### PROMISE CHAIN

The `promise.then()` call always returns a new promise with state as *pending* and result as *undefined*. It allows us to call the next `.then()` method on this new promise. The first call will return a value that will be used by the second call, and there can be as many calls as you'd need, and this phenomenon is called *Promise Chain*.

```JavaScript
// Promise Chain with multiple then and catch
let promise = getPromise(ALL_POKEMONS_URL);

promise.then(result => {
    let onePokemon = JSON.parse(result).results[0].url;
    return onePokemon;
}).then(onePokemonURL => {
    console.log(onePokemonURL);
    return getPromise(onePokemonURL);
}).then(pokemon => {
    console.log(JSON.parse(pokemon));
}).catch(error => {
    console.log('In the catch', error);
});
```

### MULTIPLE PROMISES

There are six static methods available in the *Promise* API. Apart from `resolve` and `reject`.

- `Promise.{all | any | allSettled | race }`: These methods accept an array of promises and run them in parallel.

*Promise.all* waits for all the promises to resolve and returns the array of promise results. If any of the promises reject or execute to fail due to an error, all the other promise results will be ignored.

*Promise.any* waits for only the first promise to resolve.

*Promise.allSettled* waits for all the promises to settle (resolve/reject) and returns their results as an array of objects.

*Promise.race()* waits for the first (quickest) promise to settle, and returns the result/error accordingly.

> more on promises [here](https://www.freecodecamp.org/news/javascript-promise-tutorial-how-to-resolve-or-reject-promises-in-js/).

## ASYNC AWAIT

*Async* is a better way to deal with *Promises*. Pretty much like Dart's *async*, therefore I'll reserve my right to remain silent.
