type FormType = {
  label: string;
  placeholder: string;
  name: "username" | "email" | "password";
  type: string;
};

type FormTypeForLogin = {
  label: string;
  placeholder: string;
  name: "email" | "password";
  type: string;
};

export const signUpForm: FormType[] = [
  {
    label: "Username",
    placeholder: "Enter your username",
    name: "username",
    type: "text",
  },
  {
    label: "Email",
    placeholder: "Enter your email",
    name: "email",
    type: "email",
  },
  {
    label: "Password",
    placeholder: "Enter your password",
    name: "password",
    type: "password",
  },
];

export const logInForm: FormTypeForLogin[] = [
  {
    label: "Email",
    placeholder: "Enter your email",
    name: "email",
    type: "email",
  },
  {
    label: "Password",
    placeholder: "Enter your password",
    name: "password",
    type: "password",
  },
];
