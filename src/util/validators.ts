// util/validators.ts

/**
 * Validates an email address
 * @param email - The email to validate
 * @returns boolean - true if email is valid
 */
export const validateEmail = (email: string): boolean => {
     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     return re.test(email);
   };
   
   /**
    * Validates a password meets minimum requirements
    * @param password - The password to validate
    * @returns boolean - true if password is valid
    */
   export const validatePassword = (password: string): boolean => {
     // At least 8 characters, contains at least one letter and one number
     const re = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
     return re.test(password);
   };
   
   /**
    * Validates a username (alphanumeric with optional underscores/hyphens)
    * @param username - The username to validate
    * @returns boolean - true if username is valid
    */
   export const validateUsername = (username: string): boolean => {
     const re = /^[a-zA-Z0-9_-]{3,20}$/;
     return re.test(username);
   };
   
   /**
    * Validates a name (letters and spaces only)
    * @param name - The name to validate
    * @returns boolean - true if name is valid
    */
   export const validateName = (name: string): boolean => {
     const re = /^[a-zA-Z\u0600-\u06FF\s]{2,50}$/; // Supports Arabic and English letters
     return re.test(name.trim());
   };