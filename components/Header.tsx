import { Plus } from "@/icons";
import Link from "next/link";

export function Header() {
  return (
    <header className="header">
      <h1 className="header__h1">My Workspace</h1>
      <Link href="/?action=create">
        <button className="btn btn__primary btn__icon">
          <Plus /> <span>Add new</span>
        </button>
      </Link>
    </header>
  );
}
