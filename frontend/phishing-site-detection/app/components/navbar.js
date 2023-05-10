import ico from "@/assets/ico.jpg";
import Image from "next/image";

const Navbar = ({ setLogout, name }) => {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Welcome {name}</a>
      </div>
      <div className="avatar">
        <div className="w-24 rounded-full">
          <Image src={ico} alt="" />
        </div>
      </div>
      <div className="flex-none">
        <button onClick={() => setLogout(true)} className="btn btn-ghost">
          logout
        </button>
      </div>
    </div>
  );
};
export default Navbar;
