import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return <SignUp
    appearance={{
      elements: {
        formButtonPrimary: 'hover:bg-teal-600/80 transition-color text-white text-sm normal-case',

      },
      variables: {
        colorPrimary: "rgb(20 184 166)"
      }
    }}
  />;
}