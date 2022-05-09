import IntlMessages from "../../utils/IntlMessages";
import { Menu } from "./Menu";

export default function ProfileGroup() {
    return (
        <div className="dropdown dropdown-end">
            <label tabIndex="0" className="btn btn-sm btn-ghost btn-no-uppercase"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">
                <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
            </svg><IntlMessages id="navmenu.profile" /></label>
            <Menu />
        </div>
    );
}