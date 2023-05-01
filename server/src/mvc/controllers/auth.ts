import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import Users from '../models/user';
import jwt from 'jsonwebtoken';

export default async function registerUser(request: Request, response: Response): Promise<void> {
  try {
    const newUser = request.body;
    // CHECK FOR DUPLICATE EMAILS
    const emailCheck = await Users.findOne({ email: newUser.email });
    console.log(emailCheck);
    if (emailCheck) {
      response.status(400);
      response.send('Please provide another e-mail address')
    } else {
      console.log(newUser);
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(newUser.password, salt);
      const newUserRecord = newUser;
      newUserRecord.password = passwordHash;
      const save = await Users.create(newUserRecord)
      .then(() => {
          console.log('here', newUserRecord);
          response.status(200);
          response.send('You can now login with your credentials');
        })
    }
  } catch (error) {
    console.error(error);
    response.status(500);
    response.send('Failed to register a new user');
  }
} 

export async function loginUser(request: Request, response: Response): Promise<void> {
  try {
    const user = request.body;
    const userCheck = await Users.findOne({ email: user.email });
    if (!userCheck) {
      response.status(400);
      response.send('Invalid credentials');
    } else {
      const passwordCheck = bcrypt.compare(user.password, userCheck.password as string);
      if (!passwordCheck) {
        response.status(400);
        response.send('Invalid credentials');
      } else {
        console.log('Successful login!');
        // TODO: HIDE SECRET
        const token = jwt.sign({ id: userCheck._id }, 'shrek');
        const userData = userCheck;
        userData.password = "";
        response.status(200);
        response.json({ token, userData });
      }
    }
  } catch (error) {
    console.log(error);
    response.status(500);
    response.send('Authentication error');
  }
}

export async function updateUserInfo(request: Request, response: Response): Promise<void> {
  const data = request.body;
  const update = await Users.findByIdAndUpdate(data.user.id, { isComplete: data.isComplete });
  if (!update) {
    response.status(404);
    response.send('Failed to update');
  } else {
    response.status(200);
    response.send('User status updated');
  }
}