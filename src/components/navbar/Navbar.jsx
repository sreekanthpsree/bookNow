import { useEffect, useState } from "react";
import styles from "./navbar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Flatpickr from "react-flatpickr";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import ReactCountryFlag from "react-country-flag";
import { getLocations, userLogout } from "@/api/api";
import getCountryCode from "@/helper/getCountryCode";
import Link from "next/link";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import LoginSignup from "../authentication/LoginSignup";
import { useDispatch } from "react-redux";
import { toggleModal } from "@/store/features/modal-slice";
import { getUserCookies } from "@/helper/getCookies";
import { logout } from "@/store/features/auth-slice";
import { useAuthContext } from "@/store/context/AuthContextProvider";
import { useRouter } from "next/navigation";

function Navigationbar() {
  const [locations, setLocations] = useState();
  const [userData, setUserData] = useAuthContext();
  const dispatch = useDispatch();
  const router = useRouter();
  const handleOpenModal = () => {
    dispatch(toggleModal({ isOpen: true }));
  };
  async function logoutUser() {
    try {
      const response = await userLogout(userData.token, userData.userId);

      if (response.success) {
        dispatch(logout());
        setUserData({});
        router.push("/");
      } else {
        throw error;
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchLocations() {
    try {
      const locationData = await getLocations();
      if (locationData.success === "1") {
        setLocations(locationData.result);
      }
    } catch (error) {}
  }
  useEffect(() => {
    fetchLocations();
    const user = getUserCookies("user");
    if (user) {
      setUserData(user);
    }
  }, []);
  return (
    <>
      <div className="sticky-to ">
        <nav className="flex flex-row m-2 p-2 justify-between">
          <div className="fs-2">
            <Link href="/" style={{ textDecoration: "none" }}>
              <h6
                className={`brand d-flex mt-3 m-auto text-danger shadow-md p-0 ${styles.brand}`}
              >
                bookNow
              </h6>
            </Link>
          </div>
          {/* <div className="w-50 mt-1 text-end">
            <FormControl
              className=" w-50 text-center rounded-md shadow-md border-none"
              variant="standard"
            >
              <InputLabel id="demo-simple-select-standard-label">
                Countries
              </InputLabel>
              <Select
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                label="Age"
              >
                <MenuItem value="">Select</MenuItem>
                {locations &&
                  locations.map((location) => {
                    return (
                      <MenuItem
                        className="flex flex-row justify-between"
                        value={location}
                      >
                        {location}
                        <ReactCountryFlag
                          className="mt-1 ms-2 text-center"
                          countryCode={getCountryCode(location)}
                          svg
                        />
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div> */}
          <div>
            <div className="flex gap-2 mt-3">
              <div className=" flex text-end ms-4 gap-2 flex-row ">
                <Flatpickr
                  data-enable-time
                  placeholder="Pick a date"
                  className="form-control rounded-5 shadow-md"
                />
                <input
                  type="text"
                  className={`rounded-5 form-control shadow-md`}
                  placeholder="Search text"
                />
              </div>
              <div className="d-flex flex-row">
                <div>
                  <button
                    type="submit"
                    className=" btn bg-red-500 shadow-md rounded-5"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </div>
              </div>
              <div className=" ms-2 text-end justify-end">
                <ul className={`${styles.ul} ${styles.blogList} d-flex`}>
                  {userData && userData.isAuth ? (
                    <li className={`${styles.list}`} key={"1"}>
                      <button
                        className="btn bg-red-500 rounded-5 dropdown-toggle ms-2 shadow-md"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <FontAwesomeIcon icon={faUser} />
                      </button>
                      <ul
                        className={`${styles.dropdownMenu} dropdown-menu bg-danger rounded-xl ${styles.ul}`}
                      >
                        <li className={`${styles.list}`}>
                          <div className={`${styles.dropdownItem}`}>
                            <div className="flex">
                              <Link
                                className={`${styles.dropdownItem}`}
                                href="/users"
                              >
                                Hi,{userData.username}
                              </Link>
                            </div>
                          </div>
                        </li>

                        <li className={`${styles.list}`}>
                          <button
                            onClick={logoutUser}
                            className={`${styles.dropdownItem}`}
                          >
                            Logout
                          </button>
                        </li>
                        {/* <li className={`${styles.list}`}>
                          <Link
                            className={`${styles.dropdownItem} ${styles.link}`}
                            href="/signin"
                          >
                            Login
                          </Link>
                        </li> */}
                      </ul>
                    </li>
                  ) : (
                    <li>
                      <button
                        onClick={handleOpenModal}
                        className="bg-red-500  mb-1 rounded-xl hover:bg-white p-2 text-black font-extrabold"
                      >
                        Login
                      </button>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </nav>
        <div>
          <LoginSignup />
        </div>
      </div>
    </>
  );
}

export default Navigationbar;
