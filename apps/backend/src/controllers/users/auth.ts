import type { Request, Response } from "express";
import User from "../../models/users.model";
import { createToken } from "../../utils/jwt";
import { comparePassword, encryptPassword } from "../../utils/password";

export type TUser = {
  name: string;
  email: string;
  password: string;
};

export const login = async (req: Request, res: Response) => {
  try {
    const body: TUser = req.body;
    if (!body.name || !body.email || !body.password) {
      res.status(400).json({ error: "Invalid user credentials" });
      return;
    }
    const user = await User.findOne({ email: body.email });
    console.log(user);
    if (!user?.email) {
      res.status(500).json({ error: "user not found!" });
      return;
    }

    const isMatched = await comparePassword(body.password, user.password!);

    if (!isMatched) {
      res.status(500).json({ error: "password didn't match!" });
      return;
    }

    const token = await createToken({
      user_id: user._id.toString(),
      name: user.name!,
    });

    res.status(200).json({ token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err: "Internal server problem" });
  }
};

export const signin = async (req: Request, res: Response) => {
  const body: TUser = req.body;
  if (!body.name || !body.email || !body.password) {
    res.status(400).json({ error: "Invalid user credentials" });
    return;
  }
  const user = await User.findOne({ email: body.email });
  console.log(user);
  if (user?.email) {
    res.status(500).json({ error: "user already exists!" });
    return;
  }

  const hashedPassword = await encryptPassword(body.password);

  const newUser = new User({
    name: body.name,
    email: body.email,
    password: hashedPassword,
  });

  await newUser.save();

  const token = await createToken({
    user_id: newUser._id.toString(),
    name: newUser.name!,
  });

  res.status(200).json({ token });
};
