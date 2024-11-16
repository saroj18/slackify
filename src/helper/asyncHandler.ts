import { NextRequest, NextResponse } from "next/server";
import { ApiError } from "./ApiError";
import { ZodError } from "zod";

type ContextType = {
  params?: { [key: string]: string }; // Dynamic route parameters
  searchParams?: URLSearchParams; // Query parameters
};
type FunctionType = {
  (req: NextRequest, context: ContextType): Promise<NextResponse>;
};

export const asyncHandler = (fn: FunctionType) => {
  return async (req: NextRequest, context: ContextType) => {
    try {
      return await fn(req, context);
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
        console.error(error.message);
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
