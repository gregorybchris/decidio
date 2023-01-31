import { Link } from "react-router-dom";

function Nav() {
  return (
    <div className="flex items-end px-5 py-6 text-slate-700 font-bold text-xl bg-slate-300">
      <NavItem to="/" name="decidio" />
      <NavItem to="/new" name="new" />
      <NavItem to="/archive" name="archive" />
      <NavItem to="/about" name="about" />
    </div>
  );
}

interface NavItemProps {
  to: string;
  name: string;
}

function NavItem(props: NavItemProps) {
  return (
    <Link to={props.to} className="px-2 py-1 mx-2 hover:bg-slate-100 rounded-md hover:ease-linear duration-150">
      {props.name}
    </Link>
  );
}

export default Nav;
