import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./ApiError";
import { ZodError } from "zod";

type FunctionType = {
  (req: NextRequest): Promise<NextResponse>;
};

export const asyncHandler = (fn: FunctionType) => {
  return async (req: NextRequest) => {
    try {
      return await fn(req);
    } catch (error: any) {
      if (error instanceof ApiError) {
        console.log("ApiError>>", error.message);

        return NextResponse.json(
          {
            error: error.message,
            errorName: "ApiError",
            errorStack:
              process.env.NODE_ENV === "development" ? error.stack : null,
          },
          { status: 500 }
        );
      } else if (error instanceof ZodError) {
        console.log("ZodError>>", error.errors);

        return NextResponse.json(
          {
            error: error.errors,
            errorName: "ZodError",
            errorStack:
              process.env.NODE_ENV === "development" ? error.stack : null,
          },
          { status: 400 }
        );
      } else {
        console.error(error);
        return NextResponse.json(
          {
            error: "Internal Server Error",
            errorName: "InternalServerError",
            errorStack:
              process.env.NODE_ENV === "development" ? error.stack : null,
          },
          { status: 500 }
        );
      }
    }
  };
};
