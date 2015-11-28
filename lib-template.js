(function (factory) {
    if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
        // CommonJS or Node: hard-coded dependency on "knockout"
        factory(require("knockout"));
    } else if (typeof define === "function" && define["amd"]) {
        //AMD anonymous module with hard-coded dependency on "knockout"
        define(["knockout"], factory);
    } else {
        // <script> tag: use the global 'ko' object, registering the binding handler
        factory(ko);
    }
})(function (ko) {
   ko.sayHello = function(){
        console.log('Hello World!');
   }
});