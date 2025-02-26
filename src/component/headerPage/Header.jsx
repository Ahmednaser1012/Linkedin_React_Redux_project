import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import "./header.css";
import { signoUT } from "../indexFunction";
import { Link } from "react-router-dom";
const Header = () => {
  const user = useSelector((state) => state.userState.user);
  // console.log(user.photoURL);
  const dispatch = useDispatch();
  // const navgate = useNavigate();

  const signOut = () => {
    dispatch(signoUT());
  };

  return (
    <>
      <div className="header">
        <div className="header_left">
          <Link to="/">
            <img src="/images/home-logo.svg" alt="no image" />
          </Link>
          <div className="search_box">
            <i className="bi bi-search"></i>
            <input type="text" className="search_input" placeholder="Search" />
          </div>
        </div>
        <div className="header_right">
          <div className="nav_link ">
            <div className="nav_icon">
              <i
                className="bi bi-house-door-fill"
                style={{ fontSize: "1.3rem  !important" }}
              ></i>
            </div>
            <div className="nav_text">Home</div>
          </div>

          <div className="nav_link network">
            <div className="nav_icon">
              <i
                className="bi bi-people-fill"
                style={{ fontSize: "1.3rem" }}
              ></i>
            </div>
            <div className="nav_text">My Network</div>
          </div>

          <div className="nav_link jobs">
            <div className="nav_icon">
              <i
                className="bi bi-bag-fill"
                style={{ fontSize: " 1.3rem  !important" }}
              ></i>
            </div>
            <div className="nav_text">Jobs</div>
          </div>

          <div className="nav_link">
            <div className="nav_icon">
              <div className="infoo">3</div>
              <i
                className="bi bi-chat-dots-fill"
                style={{ fontsize: " 1.3rem  !important" }}
              ></i>
            </div>
            <div className="nav_text">Messaging</div>
          </div>

          <div className="nav_link">
            <div className="nav_icon">
              <div className="infoo">3</div>
              <i
                className="bi bi-bell-fill"
                style={{ fontSize: "1.3rem  !important" }}
              ></i>
            </div>
            <div className="nav_text">Notifications</div>
          </div>
          {/* ************************************* * */}
          {/* ************************************* * */}
          {/* ************************************* * */}
          <div
            className="header_right_2"
            style={{ borderLeft: "1px solid grey" }}
          >
            <div className="nav_link">
              <div className="nav_icon">
                {user && user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt="No Image"
                    style={{
                      height: "25px",
                      marginTop: "10px",
                      objectfit: "contain",
                      borderradius: "50px",
                    }}
                  />
                ) : (
                  <img
                    src="/images/image.png"
                    alt="non"
                    style={{
                      height: "30px",
                      objectfit: "contain",
                      borderradius: "50px",
                    }}
                  />
                )}

                <div className="nav_text dropdown drop">
                  <i
                    className="bi bi-caret-down-fill dropdown"
                    style={{ fontsize: "1rem  !important", float: "center" }}
                  ></i>
                  <div className="dropdown-content">
                    <div className="dropdown_profile">
                      {user && user.photoURL ? (
                        <img
                          src={user.photoURL}
                          alt="NoImage"
                          style={{
                            height: "30px",
                            objectfit: "contain",
                            borderradius: "50px",
                            paddingRight: "10px",
                          }}
                        />
                      ) : (
                        <img
                          src="/images/image.png"
                          style={{
                            height: "50px",
                            objectfit: "contain",
                            borderradius: "50px",
                          }}
                          alt="noimage"
                        />
                      )}

                      <div
                        className="dropdown_profile_info"
                        style={{ paddingleft: "10px" }}
                      >
                        <div className="act_title">
                          {user && user.displayName
                            ? user.displayName
                            : "User Geast"}
                        </div>
                        <div className="acoount_name">
                          {user && user.email ? user.email : "User Geast"}
                        </div>
                      </div>
                    </div>
                    <div className="profile_view_button">View profile</div>

                    <div className="bdr_bottom"></div>
                    <div className="title" style={{ color: "black" }}>
                      Accounts
                    </div>
                    <div className="list">Settings & Privacy</div>
                    <div className="list">Help</div>
                    <div className="list bdr_bottom">Language</div>

                    <div className="title" style={{ color: "black" }}>
                      Manage
                    </div>
                    <div className="list">Post & Activity</div>
                    <div className="list bdr_bottom">Job Postion Account</div>
                    <div className="list" onClick={signOut}>
                      sign out
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="right_nav_text ">Try Premium Free for 1 Month</div>
            <div className="small_screen">
              <i className="bi_i bi-three-dots"></i>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
