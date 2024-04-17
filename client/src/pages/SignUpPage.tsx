import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <SignUp />
    </div>
  );
}

export default SignUpPage;
