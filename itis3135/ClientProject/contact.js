/*
 * Filename: contact.js
 * Author: [Your Name]
 * Date: November 30, 2025
 * Purpose: Provides form validation and interactive feedback for the contact form
 *          on Bob's Lawn Care & Landscaping website
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Get form elements
    const form = document.getElementById('contactForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');
    const messageInput = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');
    
    // Get error message elements
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const phoneError = document.getElementById('phoneError');
    const messageError = document.getElementById('messageError');
    
    // Helper functions - defined first
    function showError(errorElement, message, inputElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        inputElement.classList.add('error-input');
    }
    
    function clearError(errorElement, inputElement) {
        errorElement.textContent = '';
        errorElement.style.display = 'none';
        inputElement.classList.remove('error-input');
    }
    
    function showSuccessMessage() {
        // Hide form
        form.style.display = 'none';
        
        // Show success message
        successMessage.style.display = 'block';
        
        // Optional: Reset form after 5 seconds
        setTimeout(function() {
            form.reset();
            form.style.display = 'block';
            successMessage.style.display = 'none';
        }, 5000);
    }
    
    // Validation functions
    function validateName() {
        const nameValue = nameInput.value.trim();
        
        if (nameValue === '') {
            showError(nameError, 'Name is required', nameInput);
            return false;
        } else if (nameValue.length < 2) {
            showError(nameError, 'Name must be at least 2 characters', nameInput);
            return false;
        } else if (!/^[a-zA-Z\s]+$/.test(nameValue)) {
            showError(nameError, 'Name can only contain letters and spaces', nameInput);
            return false;
        } else {
            clearError(nameError, nameInput);
            return true;
        }
    }
    
    function validateEmail() {
        const emailValue = emailInput.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (emailValue === '') {
            showError(emailError, 'Email is required', emailInput);
            return false;
        } else if (!emailPattern.test(emailValue)) {
            showError(emailError, 'Please enter a valid email address', emailInput);
            return false;
        } else {
            clearError(emailError, emailInput);
            return true;
        }
    }
    
    function validatePhone() {
        const phoneValue = phoneInput.value.trim();
        const phonePattern = /^[\d\s\-\(\)]+$/;
        
        if (phoneValue === '') {
            showError(phoneError, 'Phone number is required', phoneInput);
            return false;
        } else if (!phonePattern.test(phoneValue)) {
            showError(phoneError, 'Please enter a valid phone number', phoneInput);
            return false;
        } else if (phoneValue.replace(/\D/g, '').length < 10) {
            showError(phoneError, 'Phone number must be at least 10 digits', phoneInput);
            return false;
        } else {
            clearError(phoneError, phoneInput);
            return true;
        }
    }
    
    function validateMessage() {
        const messageValue = messageInput.value.trim();
        
        if (messageValue === '') {
            showError(messageError, 'Message is required', messageInput);
            return false;
        } else if (messageValue.length < 10) {
            showError(messageError, 'Message must be at least 10 characters', messageInput);
            return false;
        } else {
            clearError(messageError, messageInput);
            return true;
        }
    }
    
    // Event listeners - defined after validation functions
    nameInput.addEventListener('blur', function() {
        validateName();
    });
    
    emailInput.addEventListener('blur', function() {
        validateEmail();
    });
    
    phoneInput.addEventListener('blur', function() {
        validatePhone();
    });
    
    messageInput.addEventListener('blur', function() {
        validateMessage();
    });
    
    // Clear error on focus
    nameInput.addEventListener('focus', function() {
        clearError(nameError, nameInput);
    });
    
    emailInput.addEventListener('focus', function() {
        clearError(emailError, emailInput);
    });
    
    phoneInput.addEventListener('focus', function() {
        clearError(phoneError, phoneInput);
    });
    
    messageInput.addEventListener('focus', function() {
        clearError(messageError, messageInput);
    });
    
    // Form submission handler
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPhoneValid = validatePhone();
        const isMessageValid = validateMessage();
        
        // If all validations pass, show success message
        if (isNameValid && isEmailValid && isPhoneValid && isMessageValid) {
            showSuccessMessage();
        }
    });
    
});