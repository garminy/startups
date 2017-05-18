function on(ele, type, fn) {
    ele.addEventListener(type, fn, false);
}
function off(ele, type, fn) {
    ele.removeEventListener(type, fn, false);
}

function processThis(fn, obj) {
    return function () {
        fn.call(obj, null);
    }
}

function EventEmitter(){

}
EventEmitter.prototype.on = function(){};
EventEmitter.prototype.run = function(){};
EventEmitter.prototype.off = function(){};