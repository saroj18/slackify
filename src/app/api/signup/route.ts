import { ApiError } from "@/helper/ApiError";
import { userZodSchema } from "@/schema/userZodSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/utils/prismaDb";
import { asyncHandler } from "@/helper/asyncHandler";

export const POST = asyncHandler(async (req) => {
  const { email, password, username } = await req.json();
  const validateInfo = await userZodSchema.parseAsync({
    email,
    password,
    username,
  });

  const findUser = await prisma.user.findUnique({
    where: {
      email: validateInfo.email,
    },
  });

  if (findUser) {
    throw new ApiError("User already exists");
  }

  const hashedPassword = await bcrypt.hash(validateInfo.password, 10);

  const createUser = await prisma.user.create({
    data: {
      email: validateInfo.email,
      password: hashedPassword,
      username: validateInfo.username,
      name: validateInfo.username,
    },
  });

  if (!createUser) {
    throw new ApiError("User not created");
  }
  return NextResponse.json(
    { message: "Signup Successfully", data: createUser },
    { status: 200 }
  );
});
