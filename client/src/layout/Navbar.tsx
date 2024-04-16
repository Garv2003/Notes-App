import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="d-flex justify-content-between align-items-center p-2 px-0 rounded-3">
      <Link to="/" className="fs-2 text-decoration-none text-dark fw-bold">
        Pensieve
      </Link>
      <SignedOut>
        <Button variant="primary">
          <Link to="/sign-in" className="text-white text-decoration-none">
            Sign In
          </Link>
        </Button>
      </SignedOut>
      <SignedIn>
        <UserButton afterSignOutUrl="/sign-in" />
      </SignedIn>
    </div>
  );
};

export default Navbar;
