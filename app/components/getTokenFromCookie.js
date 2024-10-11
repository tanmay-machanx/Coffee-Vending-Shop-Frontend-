import Cookies from "js-cookie";
export default function getJwtTokenFromCookies() {
    return Cookies.get('jwt');
}