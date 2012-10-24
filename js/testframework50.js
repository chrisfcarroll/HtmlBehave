/*  www.cafe-encounter.net/p734/ */

function Specification( name, tests, outputContainer ){
    this.name= name;
    this.tests= tests;
    this.outputContainer= outputContainer || $('#testResults');
}

Specification.prototype = {
    name : 'UnnamedSpecification',
    tests : {},
    outputContainer : null,

    addMyselfToUI : function(){
        this.outputContainer.append( "<li><h3>" + this.name +"</h3><ul id='" + this.name + "'></ul></li>");
    },

    testDomId:function (test) {
        return this.name + "_" + test;
    },

    addTestToUI : function addTestToUI( test ){
        $('#' + this.name).append( "<li id='" + this.testDomId(test) + "'>" + test + "<input type='checkbox'/></li>");
    },

    markTestPassed : function( test ){
        $("#" + this.testDomId(test) + " input").prop("checked",true);
    },

    markTestFailed : function( test, ex ){
        $("#" + this.testDomId(test) + " input").prop("checked",false);
        $("#" + this.testDomId(test) + " input").after("<ul>Output:<li>" + ex.toString() + "</li></ul>");
    },

    runTest : function (test) {
        this.addTestToUI(test);
        try{
            this.tests[test]();
            this.markTestPassed(test)
        } catch(ex)  {
            this.markTestFailed(test, ex);
        }
    },

    runTests : function(){
        this.addMyselfToUI();

        for (var test in this.tests) {
            if (this.tests.hasOwnProperty(test)) this.runTest( test );
        }
    }
};

$(function(){
     new Specification("BrowserTestRunner_Specifications", {

        aTestShouldAddItselfInTheTestResults:function() {},

        aPassingTestShouldTickTheCheckbox : function() {}
    }).runTests();

    new Specification("BrowserTestRunner_Specifications_ExpectedFails", {
        aFailingTestShouldUntickTheCheckbox:function () {
            throw "this test should fail with this message.";
        }
    }).runTests();
});
