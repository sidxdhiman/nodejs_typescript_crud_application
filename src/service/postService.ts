import User from "../database/index";
import multer from "multer";

export class PostService {
  public async postUser(userData: any): Promise<any> {
    try {
      const user = await User.create(userData);
      console.log("User posted successfully!");
      return user; 
    } catch (error) {
      console.error("Error creating user:", error); 
      throw new Error('Error creating user'); 
    }
  }
}


