import Image from "next/image";
import logo from "../../../public/companyLogo.png";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="row no-gutter">
      <div className="col-3">
        <Link href="/">
          <Image src={logo} alt="company-logo" className="company-logo" />
        </Link>
      </div>
      <div className="col-9 navbar-links">
        <Link href="/products">
          <p className="">Products</p>
        </Link>
        <Link href="/checkout">
          <p className="">View Cart</p>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
