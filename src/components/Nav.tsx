import { Link } from "react-router-dom";

export default function Nav() {
  return (
    <div className="flex items-end bg-gradient-to-tr from-slate-300 to-slate-500 px-5 py-6 text-xl font-bold text-slate-700">
      <NavItem to="/" name="decidio" />
      <NavItem to="/new" name="new" />
      <NavItem to="/library" name="library" />
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
    <Link
      to={props.to}
      className="mx-2 rounded-md px-2 py-1 duration-150 hover:bg-gradient-to-tr hover:from-slate-200 hover:to-slate-100 hover:ease-linear"
    >
      {props.name}
    </Link>
  );
}
