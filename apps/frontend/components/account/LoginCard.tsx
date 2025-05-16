"use client";
import LoadingButton from "@/components/LoadingButton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

const LoginCard = () => {
  return (
    <>
      <Card className="w-sm md:w-md">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Login</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          <Label>Enter your email</Label>
          <Input type="email" placeholder="email" />
          <Label>Enter your password</Label>
          <Input type="password" placeholder="password" />
        </CardContent>
        <CardFooter className="flex items-center justify-end">
          <LoadingButton status="idle" text="login"></LoadingButton>
        </CardFooter>
      </Card>
    </>
  );
};

export default LoginCard;
