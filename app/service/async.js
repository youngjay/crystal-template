var slice = [].slice;
var noop = function() {};


var pipe = function() {
    var fns = slice.call(arguments);

    return function() {
        var args = slice.call(arguments);
        var finalCallback = args.length ? args[args.length - 1] : null;

        if (typeof finalCallback === 'function') {
            args.pop();
        }
        else {
            finalCallback = noop;
        }

        var context = this;

        return fns.concat(finalCallback).reduceRight(function(callback, handler) {
            return function() {
                return handler.apply(context, slice.call(arguments).concat(callback))
            }
        }).apply(null, args);
    }
};

// var parallel = function() {
//     var fns = slice.call(arguments);
//     var len = fns.length;
    
//     return function() {
//         var args = slice.call(arguments);
//         var finalCallback = args.pop();

//         var context = this;

//         var completes = {}
//         var check = function(i, args) {
//             completes[i] = args;

            
//         },

//         return fns.forEach(function(fn, i) {
//             fn.apply(context, args.concat(function() {
//                 check(i, arguments);
//             }))
//         })
//     };
// };

// var a = pipe(
//     function(n, callback) {
//         console.log('first', n)
//         callback(n + 1);
//     },
//     function(n, callback) {
//         console.log('second', n)
//         callback(n + 2)
//     }
// )

// a(1)


module.exports = {
    pipe: pipe
};