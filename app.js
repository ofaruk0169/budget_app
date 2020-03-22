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

    var calculateTotal = function(type) {
        var sum = 0;
        data.allItems[type].forEach(function(cur) {
            sum = sum + cur.value;
        });
        //after each loop each value from the inc or exp will be added to the sum
        data.totals[type] = sum;
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
        },
        budget: 0,
        percenetage: -1
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

        deleteItem: function(type, id) {

            var ids, index;

            //id = 6
            //data.allItems[type][id];
            // ids = [1 2 3 6 8]
            // index = 3





            var ids = data.allItems[type].map(function(current) {
                return current.id;
            });

            index = ids.indexOf(id);

            if (index !== -1) {
                data.allItems[type].splice(index, 1); 

            }

        },

        calculateBudget: function() {

            //cacluate total income and expenses
            calculateTotal('exp');
            calculateTotal('inc');



            //calcualte the budget: icnome - expenses
            data.budget = data.totals.inc - data.totals.exp;

            //calcaulte the percenetage of income that we spent 
            if (data.totals.inc > 0) {
                data.percenetage = Math.round((data.totals.exp / data.totals.inc) * 100);
            } else {
                data.percenetage = -1;
            }

        },

        getBudget: function() {
            return {
                budget: data.budget,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp,
                percenetage: data.percenetage
            };
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
        budgetLabel: '.budget__value',
        incomeLabel: '.budget__income--value',
        expensesLabel: '.budget__expenses--value',
        percentageLabel: '.budget__expenses--percentage',
        container: '.container'
    }; 

    return {
        getInput: function() {

            return {

                //This returns the information we need as a key value pair type of thing
                type: document.querySelector(DOMstrings.inputType).value, // will be either inc or exp
                description: document.querySelector(DOMstrings.inputDescription).value,
                //parse float changes string to number. 
                value: parseFloat(document.querySelector(DOMstrings.inputValue).value)
            };
           
        },

        addListItem: function(obj, type) {
            
            var html, newHtml, element;
            // Create HTML string with placeholder text. The % sign is what you want to replace. 
            if (type === 'inc') {
                element = DOMstrings.incomeContainer;
                html = '<div class="item clearfix" id="inc-%id%"> <div class="item__description">%description%</div> <div class="right clearfix"> <div class="item__value">%value%</div> <div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div> </div></div>';

            } else if (type === 'exp') {
                element = DOMstrings.expensesContainer;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%description%</div><div class="right clearfix"><div class="item__value">%value%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';

            }

            //REPLACE THJE PLACEHOLDER TEXT WITH SOME ACTUAL DATA. The % followed by the data you would like to insert

            newHtml = html.replace('%id%', obj.id);
            newHtml = newHtml.replace('%description%', obj.description);
            newHtml = newHtml.replace('%value%', obj.value);

            //INSERT the html into the DOM (insert adjacenthtml method, this places our new html after the relevent html element) 
            document.querySelector(element).insertAdjacentHTML('beforeend', newHtml)

        },

        deleteListItem: function(selectorID) {

            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);

        },

        clearFields: function() {
            var fields, fieldsArr;

            //so we select all the classes with a certain tag. This is how you select multiple. It returns a list, we need it to be an array
            fields = document.querySelectorAll(DOMstrings.inputDescription + ', ' + DOMstrings.inputValue);

            //this is how you convert to an array
            fieldsArr = Array.prototype.slice.call(fields);

            //loops through all of the elements of both divs we arrayed and empties them as follows. Each parameter means the following, the current element, current index and the original array (in this case the fieldsArr)
            fieldsArr.forEach(function(current, index, array) {

                current.value = "";

            });

            //this will focus on the first element of the array. Which is the description
            fieldsArr[0].focus();
        },

        displayBudget: function(obj) {

            document.querySelector(DOMstrings.budgetLabel).textContent = obj.budget;
            document.querySelector(DOMstrings.incomeLabel).textContent = obj.totalInc;
            document.querySelector(DOMstrings.expensesLabel).textContent = obj.totalExp;
            

            if (obj.percenetage > 0) {
                document.querySelector(DOMstrings.percentageLabel).textContent = obj.percenetage + '%';
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = '---';
            }

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

        //for enter key// the addEventListener always has access to this "event" object and we can call it whatever we want
        document.addEventListener('keypress', function (event) {

            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();

            }

        });

        document.querySelector(DOM.container).addEventListener('click', ctrlDeleteItem);

    };
    
   var updateBudget = function () {

      //1 . Calculate the budget
      budgetCtrl.calculateBudget();

      //2 return the budget
      var budget = budgetCtrl.getBudget();


      //3 Display the budget on the UI
      UICtrl.displayBudget(budget);

   };

    var ctrlAddItem = function() {
        var input, newItem;

         // 1. Get the field input data
        var input = UICtrl.getInput();
        
        //The code will only work if the description value is not empty, the number is a number and the value is more that 0
        if (input.description !== "" && !isNaN(input.value) && input.value > 0 ) {

        
        //2. add item to the budget controller 
        var newItem = budgetCtrl.addItem(input.type, input.description, input.value);
        //33. Add the new item to the UI
        UICtrl.addListItem(newItem, input.type);
        
        //clear the fields
        UICtrl.clearFields();
        
        //calculate and update budget

        updateBudget();
       }
    };

    var ctrlDeleteItem = function(event) {

        var itemID, splitID, type, ID;


        //this is a good way to check what is being clicked in the console. Here we are traversing up the DOM to get to the node we need.
        //This was to get a specific ID which we want to delete. 
        itemID = event.target.parentNode.parentNode.parentNode.parentNode.id;
        //This is to split the ID into a array.
        if (itemID) {

            //INC-1// We are now splitting the newly formed array into its parts to get the relevant parts
            splitID = itemID.split('-');
            type = splitID[0];
            ID = parseInt(splitID[1]);

            //1. delete the item from the data strucuter
            budgetCtrl.deleteItem(type, ID);

            //2 delete the item from the UI

            UICtrl.deleteListItem(itemID);

            //3. update and display the new budget
            updateBudget();
        }

    };

    return {
        init: function() {
            console.log('Application has started.');
            UICtrl.displayBudget({
                budget: 0,
                totalInc: 0,
                totalExp: 0,
                percenetage: -1
            });
            setupEventListeners();
        }
    };



}) (budgetController, UIController);


controller.init();





