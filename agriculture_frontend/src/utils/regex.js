export const Regex = [
    {
        // email
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        message: "Email is invalid."
    },
    {
        // password
        regex: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        message: "Password must be at least 8 characters long and include at least one letter and one number."
    },
    {
        // full name
        regex: /^[a-zA-Z]+(\s[a-zA-Z]+)*$/,
        message: "Full name must contain only letters and spaces, without leading or trailing spaces."
    },
    {
        // subject
        regex: /^(?!\s*$).{8,150}$/,
        message: "Please enter between 8 and 150 characters. Subject should not be empty or contain only spaces."
    },
    {
        // message
        regex: /^(?!\s*$)[\s\S]{10,5000}$/,
        message: "Please enter between 10 and 5000 characters. Message should not be empty or contain only spaces."
    },
    {
        // comment
        regex: /^[a-zA-Z0-9\s.:,'’-]{0,200}$/,
        message: "Please enter between 10 and 200 characters. Message should not be empty or contain only spaces."
    },
    {
        // code promo
        regex: /^[A-Z0-9]{6,12}$/,
        message: " Promo code must be 5 to 15 letters or numbers with no special characters or spaces."
    },
    {
        // city
        regex: /^[A-Za-zÀ-ÿ\u00C0-\u017F\s\-']{2,50}$/,
        message: "Please enter a correct city"
    },
    {
        // date birthday
        regex: /^\d{4}-\d{2}-\d{2}$/,
        message: "Please enter a valid date"
    },
    {
        // experience
        regex: /^\d+\s+[A-Za-z]+$/,
        message: "Please enter a valid experience"
    },
    {
        // phone
        regex: /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?\d{3,4}[-.\s]?\d{3,4}$/,
        message: "Please enter a valid phone"
    },
    {
        // domain
        regex: /^[A-Za-z\s]+$/,
        message: "Please enter a valid domain"
    }
]
