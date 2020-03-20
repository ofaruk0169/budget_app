//Module for the data manipulating teh budget

var budgetController = (function() {

//cpde

})();

//Module for changing the user interface

var UIController = (function() {

    //code

}) ();


//module for changing the behaviour (app controller)

var controller = (function(budgetCtrl, UICtrl) {

    var ctrlAddItem = function() {
         // 1. Get the field input data

        //2. add item to the budget controller 

        //33. Add the new item to the UI

        //4 . Calculate the budget

        //5 Display the budget on the UI
        console.log('hi')
    }

    //for mouse press
    document.querySelector('.add__btn').addEventListener('click', ctrlAddItem);

    //for enter key
    document.addEventListener('keypress', function (event) {

        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();

        }

    });

}) (budgetController, UIController);






