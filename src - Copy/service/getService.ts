import { IntegerType } from "mongodb";
import User from "../database/index";

export class GetService {
  public async getUsers() {
    try {
      const users = await User.find({}); 
      return users; 
    } catch (error) {
      console.error("Error fetching users from database:", error); 
      throw new Error('Error fetching users');
    }
  }
}
export class GetByIdService {
  public async getUserbyId(userId: String){
    try {
      const result = await User.findOne({userId: userId});
      return result;
    } catch (error) {
      console.error("Error fetching user", error);
      throw new Error('Error fetching users');
    }
  }
}