import bcrypt from "bcryptjs";
import { Request, Response } from "express";
import User from "../models/User";

export const initializeSuperAdmin = async() => {
    try {
        const hashedPassword = await bcrypt.hash('12345678', 10);

    const user = await User.findOneAndUpdate(
      { name: 'superadmin' },
      {
        name: 'superadmin',
        email: 'superadmin@gmail.com', 
        password: hashedPassword,        
        role: 'admin',
        phone: "9999999999",
        country_code: "+91",
        city: "Mumbai",
        state: "Maharashtra"
      },
      { upsert: true, new: true, setDefaultsOnInsert: true } 
    );
    console.log('Superadmin Initialized');
    } catch (error:any) {
    console.error('Error in findOrCreateSuperAdmin:', error);
    throw error;    
  }
}