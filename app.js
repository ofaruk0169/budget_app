//Module for the data manipulating teh budget

var budgetController = (function() {

//cpde

})();

//Module for changing the user interface

var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn'
    }

    return {
        getInput: function() {

            return {
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
           
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

}) ();


//module for changing the behaviour (app controller)

var controller = (function(budgetCtrl, UICtrl) {

    var DOM = UICtrl.getDOMstrings();

    var ctrlAddItem = function() {
         // 1. Get the field input data
        var input = UICtrl.getInput();
        console.log(input);
        //2. add item to the budget controller 

        //33. Add the new item to the UI

        //4 . Calculate the budget

        //5 Display the budget on the UI
        
    }

    //for mouse press
    document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

    //for enter key
    document.addEventListener('keypress', function (event) {

        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();

        }

    });

}) (budgetController, UIController);






