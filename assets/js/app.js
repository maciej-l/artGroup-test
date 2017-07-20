// Form Validator
var formController = (function() {
	var formConfig = {
		minLength: 6,
		email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
	};
	return {
		// form will be validated by the length
		lengthValidator: function(element) {
			if(element.length < formConfig.minLength) {
				return false;
			} else {
				return true;
			}
		},
		// form will be validated if in the mail address will be "@"
		emailValidator: function(element) {
			if(!formConfig.email.test(element)){
				return false;
			} else {
				return true;
			}
		},
		// checking if the form checkbox is checked
		checkboxValidator: function(element) {
			if(element) {
				return true;
			} else {
				return false;
			}
		}
	};
})();

// UI Controller
var uiController = (function() {
	// DOM elements
	var domStrings = {
			name: document.getElementById('name'),
			surname: document.getElementById('surname'),
			phoneNo: document.getElementById('phone-no'),
			email: document.getElementById('email'),
			checkbox: document.getElementById('statement'),
			sendBtn: document.getElementById('send'),
			alertBox: document.querySelector('.form__msg-alert'),
			okBox: document.querySelector('.form__msg-ok')
	};
	
	return {
		domElements: function() {
			return domStrings;
		},
		getValues: function() {
			return {
				nameValue: domStrings.name.value,
				surnameValue: domStrings.surname.value,
				phoneValue: domStrings.phoneNo.value,
				emailValue: domStrings.email.value,
				statementValue: domStrings.checkbox.checked
			};
		}
	};
})();

var app = (function(uiCtrl, formCtrl) {
	var name;
	// DOM elements
	domElem = uiCtrl.domElements();

	// form validator
	var validator = function() {
		event.preventDefault();
		
		// get the values of inputs
		var values = uiCtrl.getValues();
		
		// form validaion 
		nameValidation = formCtrl.lengthValidator(values.nameValue);
		surnameValidation = formCtrl.lengthValidator(values.surnameValue);
		phoneValidation = formCtrl.lengthValidator(values.phoneValue);
		emailValidation = formCtrl.emailValidator(values.emailValue);
		checboxValidation = formCtrl.checkboxValidator(values.statementValue);

		if(nameValidation === false || surnameValidation === false || phoneValidation === false || emailValidation === false || checboxValidation === false) {
			
			// checking if there is shown ok msg and hide it.
			// show error msg 
			if(domElem.okBox.style.display === "block") {
				domElem.okBox.style.display = "none";
			}
			domElem.alertBox.style.display = "block";
		} else {

			// checking if error msg is shown - if true hide it
			// display ok msg
			if(domElem.alertBox.style.display === "block") {
				domElem.alertBox.style.display = "none";
			}
			domElem.okBox.style.display = "block";
		}

	};

	// form listener - button click
	var sendForm = function() {
		domElem.sendBtn.addEventListener('click', validator);
	};

	return {
		// init function
		init: function() {
			sendForm();
		}
	};
})(uiController, formController);

app.init();