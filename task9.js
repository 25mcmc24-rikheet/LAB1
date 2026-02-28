$(document).ready(function(){

    $.getJSON("task9.json", function(data){

        const form = $("<form></form>");

        data.elements.forEach(function(field){

            const section = $("<div class='field-section'></div>");
            section.append(`<label>${field.label}</label>`);

            let inputElement;

            if(field.type === "select"){

                inputElement = $(`<select id="${field.id}">
                                    <option value="">-- Select --</option>
                                 </select>`);

                if(field.options){
                    field.options.forEach(function(option){
                        inputElement.append(`<option value="${option}">${option}</option>`);
                    });
                }

            } else {
                inputElement = $(`<input type="${field.type}" id="${field.id}" />`);
            }

            section.append(inputElement);
            section.append(`<div class="error-text" id="${field.id}-error"></div>`);

            form.append(section);
        });

        form.append("<button type='submit'>Submit</button>");
        $("#formContainer").append(form);

        $("#state").parent().hide();

        $("#country").on("change", function(){

            const selectedCountry = $(this).val();
            const stateDropdown = $("#state");

            stateDropdown.empty();
            stateDropdown.append("<option value=''>-- Select State --</option>");

            if(data.countryStates[selectedCountry]){
                data.countryStates[selectedCountry].forEach(function(state){
                    stateDropdown.append(`<option value="${state}">${state}</option>`);
                });

                $("#state").parent().slideDown();
            } else {
                $("#state").parent().slideUp();
            }
        });

        function validate(id){

            const value = $("#" + id).val().trim();
            const errorDiv = $("#" + id + "-error");
            errorDiv.text("");

            if(id === "fullName"){
                if(!/^[A-Za-z ]{3,}$/.test(value)){
                    errorDiv.text("Enter valid name (minimum 3 letters).");
                    return false;
                }
            }

            if(id === "emailId"){
                if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)){
                    errorDiv.text("Invalid email format.");
                    return false;
                }
            }

            if(id === "password"){
                if(value.length < 8){
                    errorDiv.text("Password must be at least 8 characters.");
                    return false;
                }
            }

            if(id === "mobile"){
                if(!/^\d{10}$/.test(value)){
                    errorDiv.text("Mobile must be exactly 10 digits.");
                    return false;
                }
            }

            if(id === "dob"){
                if(!value){
                    errorDiv.text("Date of birth required.");
                    return false;
                }

                const birth = new Date(value);
                const today = new Date();
                let age = today.getFullYear() - birth.getFullYear();
                if(age < 18){
                    errorDiv.text("You must be at least 18 years old.");
                    return false;
                }
            }

            if(id === "country" && value === ""){
                errorDiv.text("Please select country.");
                return false;
            }

            if(id === "state" && $("#state").is(":visible") && value === ""){
                errorDiv.text("Please select state.");
                return false;
            }

            return true;
        }

        $(document).on("input change", "input, select", function(){
            validate($(this).attr("id"));
        });

        form.submit(function(e){
            e.preventDefault();

            let formValid = true;

            data.elements.forEach(function(field){
                if(field.required){
                    if(!validate(field.id)){
                        formValid = false;
                    }
                }
            });

            if(!formValid){
                alert("Fix errors before submitting.");
                return;
            }

            $("<div class='success-message'>Form Submitted Successfully!</div>")
                .hide()
                .appendTo(".form-card")
                .fadeIn();

            this.reset();
            $("#state").parent().hide();
        });

    });

});