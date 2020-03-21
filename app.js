//Module for the data manipulating the budget

var budgetController = (function() {

    //The contructor function is allowing new instances of similar objects

    var Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    var Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

//These data objects are allowing us to store the information gained from the previous object ^

    var data = {
        allItems: {
            exp: [],
            inc: []
        },
        totals: {
            exp: 0,
            inc: 0
        }
    };

    return {
        addItem: function(type, des, val) {
            var newItem;

            //This is the data type in the allItems object. Followed by the length of that array minus 1. Then grab the last id but add 1
            if (data.allItems[type].length > 0) {
                ID = data.allItems[type][data.allItems[type].length -1].id + 1;
            } else {
                ID = 0;
            }
            //depending on the type, the object corresponding with the type will be created ^
            if (type === 'exp') {
                newItem = new Expense(ID, des, val);
            } else if (type === 'inc') {
                newItem = new Income(ID, des, val);
            }

            //The "type" here will add to the specified type in the function parameter. This new object we have created is then pushed 
            //to the corresponding array
            data.allItems[type].push(newItem);

            //return the new element 
            return newItem;
        },

        testing: function() {
            console.log(data);
        }
    };



})();





//Module for changing the user interface

var UIController = (function() {

    var DOMstrings = {
        inputType: '.add__type',
        inputDescription: '.add__description',
        inputValue: '.add__value',
        inputButton: '.add__btn',
        incomeContainer: '.income__list',
        expensesContainer: '.expenses__list',
    }

    return {
        getInput: function() {

            return {

                //This returns the information we need as a key value pair type of thing
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value
            };
           
        },

        addListItem: function(obj, type) {
            
            var html, newHtml, element;
            // Create HTML string with placeholder text. The % sign is what you want to replace. 
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="income-0"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>';

            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }

            //REPLACE THJE PLACEHOLDER TEXT WITH SOME ACTUAL DATA. The % followed by the data you would like to insert

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //INSERT the html into the DOM (insert adjacenthtml method, this places our new html after the relevent html element) 
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

        },

        clearFields: function() {
            var fields, fieldsArr;

            //so we select all the classes with a certain tag. This is how you select multiple. It returns a list, we need it to be an array
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            //this is how you convert to an array
            fieldsArr = Array.prototype.slice.call(fields);

            //loops through all of the elements of both divs we arrayed and empties them as follows
            fieldsArr.forEach(function(current, index, array) {

                current.value = "";

            });
        },

        getDOMstrings: function() {
            return DOMstrings;
        }
    };

}) ();










//module for changing the behaviour (app controller)

var controller = (function(budgetCtrl, UICtrl) {

        var setupEventListeners = function() {

        var DOM = UICtrl.getDOMstrings();

        //for mouse press
        document.querySelector(DOM.inputButton).addEventListener('click', ctrlAddItem);

        //for enter key
        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();

            }

        });

    };
    
   

    var ctrlAddItem = function() {
        var input, newItem;

         // 1. Get the field input data
        var input = UICtrl.getInput();
        
        //2. add item to the budget controller 
        var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        //33. Add the new item to the UI
        UICtrl.addListItem(newItem, input.type);
        
        //clear the fields
        UICtrl.clearFields();
        
        //4 . Calculate the budget

        //5 Display the budget on the UI
        
    };

    return {
        init: function() {
            console.log('Application has started.');
            setupEventListeners();
        }
    };



}) (budgetController, UIController);


controller.init();





