"use strict";

//Create an IIFE to close the app off from the global scope
(function(){
// check fields and hide the submit button
document.addEventListener('DOMContentLoaded', function(){
    const display = new Display();
    display.checkFields();
    display.hideSubmit();
    display.events();
});

//display constructor function
class Display {
    constructor() {
        console.log(this) //this points to the Display o
        this.name = document.getElementById('name');
        this.course = document.getElementById('course');
        this.author = document.getElementById('author');
        this.customers = document.querySelector('.customer-list');
        this.customerForm = document.getElementById('customer-form');
    }

    events = function (){
        this.customerForm.addEventListener('submit', (event) => {
            event.preventDefault();
            console.log(this) //this points to the form
            const name = document.querySelector('.name');
            const course = document.querySelector('.course');
            const author = document.querySelector('.author');
        
            const customer = new Customer(name.value, course.value, author.value);
            //const display = new Display();
        
            //display.feedback(customer);
            //display.clearFields();
            this.feedback(customer)
            this.clearFields()
        })
    }

    checkFields = function (){
        this.name.addEventListener('blur', this.validateField);
        this.course.addEventListener('blur', this.validateField);
        this.author.addEventListener('blur', this.validateField);
    }

    validateField = function(){
        // console.log(this);
        if (this.value === ''){
            this.classList.remove('complete');
            this.classList.add('fail');
        } else {
            this.classList.add('complete');
            this.classList.remove('fail');
        }
    
        const complete = document.querySelectorAll('.complete');
    
        if(complete.length === 3){
            document.querySelector('.submitBtn').disabled = false;
        } else {
            document.querySelector('.submitBtn').disabled = true;
        }
    };
    //disable submit button
    hideSubmit = function(){
        const btn = document.querySelector('.submitBtn');
        btn.disabled = true;
    };
    //show loading and feedback
    feedback = function (customer) {
        const feedback = document.querySelector('.feedback');
        const loading = document.querySelector('.loading');
    
        feedback.classList.add('showItem', 'alert', 'alert-success');
        loading.classList.add('showItem');
    
        const self = this;
        self.hideSubmit();
    
        setTimeout(function(){
            feedback.classList.remove('showItem', 'alert', 'alert-success');
            loading.classList.remove('showItem');
            self.addCustomer(customer);
    
        }, 3000);
    };
    
    addCustomer = function(customer){
    
        const random = this.getRandom();
    
        const div = document.createElement('div');
         div.classList.add('col-11', 'mx-auto', 'col-md-6', 'my-3', 'col-lg-4');
         div.innerHTML = `<div class="card text-left">
         <img src="./img/cust-${random}.jpg" class="card-img-top" alt="">
         <div class="card-body">
          <!-- customer name -->
          <h6 class="text-capitalize "><span class="badge badge-warning mr-2">name :</span><span id="customer-name">${customer.name}</span></h6>
          <!-- end of customer name -->
          <!-- customer name -->
          <h6 class="text-capitalize my-3"><span class="badge badge-success mr-2">course :</span><span id="customer-course">
            ${customer.course}
           </span></h6>
          <!-- end of customer name -->
          <!-- customer name -->
          <h6 class="text-capitalize"><span class="badge badge-danger mr-2">author :</span><span id="course-author">${customer.author}</span></h6>
          <!-- end of customer name -->
         </div>
        </div>`
        this.customers.appendChild(div);
    }
    //random number
   getRandom = function(){
        let random = Math.floor(Math.random()*5+1);
        return random;
    };
    
    clearFields = function(){
        this.name.value = '';
        this.course.value = '';
        this.author.value = '';
    
        this.name.classList.remove('complete', 'fail');
        this.course.classList.remove('complete', 'fail');
        this.author.classList.remove('complete', 'fail');
    };

      //random number
  getRandom = function(){
        let random = Math.floor(Math.random()*5+1);
        return random;
    };

}


//customer constructor function
function Customer(name, course, author){
    this.name = name;
    this.course = course;
    this.author = author;
};

})()

//https://www.thecodeship.com/web-development/methods-within-constructor-vs-prototype-in-javascript/