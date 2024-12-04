export interface User {
    firstName: string;
    lastName: string;
    email: string;
    password: string; // This is the hashed password in the database
    claims: string[]; // Array of Claim IDs (reference to claims made by the user)
  
    // Method to compare password (using bcrypt)
    comparePassword(candidatePassword: string): Promise<boolean>;
  }
  