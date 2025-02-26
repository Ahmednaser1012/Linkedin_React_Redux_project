import "./sidebar.css";
import "./mainbody.css";
import "./activities.css";
import "./Media.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import PostModel from "./postModel/postModel";
// import { FetchArticlesApi } from "../indexFunction";
const Home = () => {
  const user = useSelector((state) => state.userState.user);

  const { articles, loading } = useSelector((state) => state.articles);

  console.log(loading);
  console.log(articles);

  const [showModel, SetshowModel] = useState(false);

  const handelbutton = () => {
    SetshowModel(!showModel);
    console.log("clicked");
  };

  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    return match ? match[1] : "";
  };

  return (
    <>
      <div className="mainbody">
        <div className="sidebar" style={{ border: "none" }}>
          <div className="sidebar_first_col">
            <div
              className="profile_header"
              style={{
                borderTopLeftRadius: "10px",
                borderTopRightRadius: "10px",
              }}
            ></div>
            {user && user.photoURL ? (
              <img
                src={user.photoURL}
                alt="noimage"
                style={{
                  height: "80px",
                  width: "80px",
                  borderRadius: "50%",
                  border: "4px solid white",
                  margin: "-35px auto 0 auto",
                }}
              />
            ) : (
              <img
                src="/images/image.png"
                alt="non"
                style={{
                  height: "80px",
                  width: "80px",
                  borderRadius: "50%",
                  border: "4px solid white",
                  margin: "-35px auto 0 auto",
                }}
              />
            )}

            <div className="profile_info">
              <p style={{ textAlign: "center" }} className="act_title">
                Welcome, {user ? user.displayName : "Guest !"}
              </p>
              <p className="account_name">
                Student at Jss tu science and technology ,Mysuru
              </p>
            </div>
            <div style={{ border: "0.2px solid lightgrey" }}></div>
            <div className="connections">
              <span style={{ float: "left" }} className="account_name">
                connections
              </span>
              <span style={{ float: "right" }}>
                <a href="#" style={{ color: "blue" }}>
                  30
                </a>
              </span>
              <br></br>
              <h6>Grow your network</h6>
            </div>
            <div className="viewed">
              <div className="text account_name">Who viewed your profile</div>
              <div>
                <a href="#" style={{ color: "blue" }}>
                  30
                </a>
              </div>
            </div>
            <div className="sidebar_access">
              <div className="account_name">
                Access exclusive tools and sights
              </div>
              <a href="#"> Try premium for one month</a>
            </div>
            <div className="sidebar_footer">
              <i className="bi bi-bookmark-fill"></i>
              <div>My items</div>
            </div>
          </div>
        </div>

        {/* ****************************************** */}
        {/* *******************posts*********************** */}

        <div className="posts">
          <div className="post_box">
            <div className="input">
              <div className="input_text">
                {user && user.photoURL ? (
                  <img src={user.photoURL} alt="noimage" className="profile" />
                ) : (
                  <img src="/images/image.png" alt="non" className="profile" />
                )}

                <input
                  type="text"
                  placeholder="start a post"
                  className="post_input"
                  onClick={handelbutton}
                  disabled={loading ? true : false}
                />
              </div>
              <div className="input_blocks">
                <div className="input_option">
                  <div className="option">
                    <i
                      className="bi bi-image"
                      style={{ color: "lightblue" }}
                    ></i>
                  </div>
                  <div className="option_text">Photo</div>
                </div>
                <div className="input_option">
                  <div className="option">
                    <i
                      className="bi bi-play-btn-fill"
                      style={{ color: "lightgreen" }}
                    ></i>
                  </div>
                  <div className="option_text">Video</div>
                </div>
                <div className="input_option">
                  <div className="option">
                    <i
                      className="bi bi-calendar-event"
                      style={{ color: "orange" }}
                    ></i>
                  </div>
                  <div className="option_text">Event</div>
                </div>
                <div className="input_option">
                  <div className="option">
                    <i
                      className="bi bi-card-text"
                      style={{ color: "crimson" }}
                    ></i>
                  </div>
                  <div className="option_text">Write article</div>
                </div>
              </div>
            </div>
          </div>
          {/* ***********post_item*********** */}
          {articles.length === 0 ? (
            <p> NO Articles Add Yet</p>
          ) : (
            <div className="post_item">
              {loading && <img src="/public/images/loader.svg" alt="loading" />}
              {articles.length > 0 &&
                articles.map((article, key) => {
                  return (
                    <>
                      <div className="post_item" key={key}>
                        <div className="post_item_header">
                          <div className="post_item_info">
                            <img
                              src={user.photoURL}
                              alt="no image"
                              className="post_profile"
                              style={{ height: "50px" }}
                            />
                            <div
                              className="post_item_owner"
                              style={{ marginLeft: " 8px" }}
                            >
                              <a href="#" className="act_title">
                                {article.actor.title}
                              </a>
                              <p className="account_name">792,456 Followers</p>
                              <p className="account_name">Promoted</p>
                            </div>
                          </div>
                          <i
                            className="bi bi-three-dots"
                            style={{ padding: "5px" }}
                          ></i>
                        </div>

                        <div className="post_item_body_info">
                          <p style={{ fontSize: " 0.95rem" }}></p>
                          {article.description}
                        </div>

                        {article.video ? (
                          <img
                            src={`https://img.youtube.com/vi/${getYouTubeVideoId(
                              article.video
                            )}/hqdefault.jpg`}
                            alt="Video Thumbnail"
                            className="post_item_body_video"
                            style={{ width: "100%" }}
                            onError={(e) =>
                              (e.target.src = "/images/default-video.png")
                            } // استبدال عند الخطأ
                          />
                        ) : article.actor.image ? (
                          <img
                            src={article.actor.image}
                            alt="Uploaded Image"
                            className="post_item_body_video"
                            style={{ width: "100%" }}
                            onError={(e) =>
                              (e.target.src = "/images/default-user.png")
                            }
                          />
                        ) : (
                          <p> لا توجد صورة متاحة</p>
                        )}

                        <div className="post_item_comment_info">
                          <img src="/images/1.svg" alt="" />
                          <img src="/images/2.svg" alt="" />
                          <img src="/images/3.svg" alt="" />
                          <span className="account_name">20 . Comments</span>
                        </div>

                        <div className="post_item_footer">
                          <div className="footer_item">
                            <i className="bi bi-hand-thumbs-up"></i>
                            <div>Like</div>
                          </div>
                          <div className="footer_item">
                            <i className="bi bi-chat-text"></i>
                            <div>Comment</div>
                          </div>
                          <div className="footer_item">
                            <i className="bi bi-arrow-90deg-right"></i>
                            <div>Share</div>
                          </div>
                          <div className="footer_item">
                            <i className="bi bi-cursor-fill"></i>
                            <div>Send</div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          )}
          <PostModel showModel={showModel} handelbutton={handelbutton} />

          {/* ***********post_item*********** */}
          <div className="post_item">
            <div className="post_item_header">
              <div className="post_item_info">
                <img
                  src="/images/myntra.jpg"
                  alt="no image"
                  className="post_profile"
                  style={{ height: "50px" }}
                />
                <div className="post_item_owner" style={{ marginLeft: " 8px" }}>
                  <a href="#" className="act_title">
                    Myntra Fashion
                  </a>
                  <p className="account_name">792,456 Followers</p>
                  <p className="account_name">Promoted</p>
                </div>
              </div>
              <i className="bi bi-three-dots" style={{ padding: "5px" }}></i>
            </div>

            <div className="post_item_body_info">
              <p style={{ fontSize: " 0.95rem" }}></p>
            </div>

            <img
              src="/images/rcb2.jpg"
              alt="noom"
              className="post_item_body_video"
              style={{ width: "100%" }}
            />

            <div className="post_item_comment_info">
              <img src="/images/1.svg" alt="" />
              <img src="/images/2.svg" alt="" />
              <img src="/images/3.svg" alt="" />
              <span className="account_name">20 . Comments</span>
            </div>

            <div className="post_item_footer">
              <div className="footer_item">
                <i className="bi bi-hand-thumbs-up"></i>
                <div>Like</div>
              </div>
              <div className="footer_item">
                <i className="bi bi-chat-text"></i>
                <div>Comment</div>
              </div>
              <div className="footer_item">
                <i className="bi bi-arrow-90deg-right"></i>
                <div>Share</div>
              </div>
              <div className="footer_item">
                <i className="bi bi-cursor-fill"></i>
                <div>Send</div>
              </div>
            </div>
          </div>
          {/* ***********post_item*********** */}
          <div className="post_item">
            <div className="post_item_header">
              <div className="post_item_info">
                <img
                  src="/images/new.png"
                  alt="no image"
                  className="post_profile"
                  style={{ height: "50px" }}
                />
                <div
                  className="post_item_owner"
                  style={{ marginleft: "8px", paddingLeft: "10px" }}
                >
                  <a href="#" className="act_title">
                    Techniczoid{" "}
                  </a>
                  <p className="account_name">10 Million - Followers</p>
                  <p className="account_name">Youtube Channel</p>
                </div>
              </div>
              <i className="bi bi-three-dots" style={{ padding: "5px" }}></i>
            </div>

            <div className="post_item_body_info">
              <p style={{ fontSize: "0.95rem" }}>
                Published new video on CSS Property Box model. this video will
                run through few more properties that make up the box-model ,
                Margin, Border, Padding, Content-Height & Width
              </p>
            </div>

            <video
              width="100%"
              controls
              className="post_iten_body_video"
              style={{ outline: "none" }}
            >
              <source src="/images/test.mp4" type="video/mp4" />
            </video>

            <div className="post_item_comment_info">
              <img src="/images/1.svg" alt="" />
              <img src="/images/2.svg" alt="" />
              <img src="/images/3.svg" alt="" />
              <span className="account_name">20 . Comments</span>
            </div>

            <div className="post_item_footer">
              <div className="footer_item">
                <i className="bi bi-hand-thumbs-up"></i>
                <div>Like</div>
              </div>
              <div className="footer_item">
                <i className="bi bi-chat-text"></i>
                <div>Comment</div>
              </div>
              <div className="footer_item">
                <i className="bi bi-arrow-90deg-right"></i>
                <div>Share</div>
              </div>
              <div className="footer_item">
                <i className="bi bi-cursor-fill"></i>
                <div>Send</div>
              </div>
            </div>
          </div>
        </div>

        {/* ****************************************** */}
        {/* *******************activity*********************** */}
        <div className="activity">
          <div className="news">
            <div className="news_head">
              <div className="news_title">Linkedln News</div>
              <i
                className="bi bi-info-square-fill"
                style={{ fontSize: " 15px" }}
              ></i>
            </div>
            <br />

            <div className="new_list">
              <div
                className="act_title"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <i
                  className="bi bi-record-fill"
                  style={{
                    fontSize: "14px",
                    marginRight: "10px",
                    display: "block",
                    marginTop: "5px",
                  }}
                ></i>
                Indian crosses 3,58,974 daily cases
              </div>
              <div style={{ marginLeft: "25px" }} className="account_name">
                10h ago - 5,043 readers
              </div>
            </div>

            <div className="new_list">
              <div
                className="act_title"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <i
                  className="bi bi-record-fill"
                  style={{
                    fontSize: "14px",
                    marginRight: "10px",
                    display: "block",
                    marginTop: "5px",
                  }}
                ></i>
                Zomato files for $1.18 IPO
              </div>
              <div style={{ marginLeft: "25px" }} className="account_name">
                13h ago - 52,043 readers
              </div>
            </div>
            <div className="new_list">
              <div
                className="act_title"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <i
                  className="bi bi-record-fill"
                  style={{
                    fontSize: "14px",
                    marginRight: "10px",
                    display: "block",
                    marginTop: "5px",
                  }}
                ></i>
                Jobs pay ,in IT soar
              </div>
              <div style={{ marginLeft: "25px" }} className="account_name">
                1d ago - 7865 readers
              </div>
            </div>

            <div className="new_list">
              <div
                className="act_title"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: " flex-start",
                }}
              >
                <i
                  className="bi bi-record-fill"
                  style={{
                    fontSize: "14px",
                    marginRight: "10px",
                    display: "block",
                    marginTop: "5px",
                  }}
                ></i>
                Google saving $1B a year from WFH
              </div>
              <div style={{ marginLeft: "25px" }} className="account_name">
                2d ago - 7865 readers
              </div>
            </div>
          </div>

          <div className="news">
            <div className="news_head">
              <div className="news_title">Todays most viewed courses</div>
              <i
                className="bi bi-info-square-fill"
                style={{ fontSize: "15px" }}
              ></i>
            </div>
            <br />

            <div className="new_list">
              <div
                className="act_title"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <i
                  className="bi bi-record-fill"
                  style={{
                    fontSize: "14px",
                    marginRight: "10px",
                    display: "block",
                    marginTop: "5px",
                  }}
                ></i>
                Indian crosses 3,58,974 daily cases
              </div>
              <div style={{ marginLeft: "25px" }} className="account_name">
                Top news 9874 - reviews
              </div>
            </div>

            <div className="new_list">
              <div
                className="act_title"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "flex-start",
                }}
              >
                <i
                  className="bi bi-record-fill"
                  style={{
                    fontSize: "14px",
                    marginRight: "10px",
                    display: "block",
                    marginTop: "5px",
                  }}
                ></i>
                Indian crosses 3,58,974 daily cases
              </div>
              <div style={{ marginLeft: "25px" }} className="account_name">
                Top news 9874 - reviews
              </div>
            </div>
          </div>

          <div className="news">
            <div className="news_head">
              <div className="news_title act_title">Add to your feed</div>
              <i
                className="bi bi-info-square-fill"
                style={{ fontSize: "15px" }}
              ></i>
            </div>
            <br />

            <div className="account_feed">
              <img
                src="/images/home-logo.svg"
                alt="no image"
                className="account_picture"
                style={{ height: "30px" }}
              />
              <div className="account_info">
                <h4 className="act_title">Linkedln</h4>
                <p className="account_name">Company - internet</p>

                <div className="follow">+ Follow</div>
              </div>
            </div>

            <div className="account_feed">
              <img
                src="/images/myntra.jpg"
                alt="no image"
                className="account_picture"
              />
              <div className="account_info">
                <h4 className="act_title">Myntra</h4>
                <p className="account_name">Company - internet</p>

                <div className="follow">+ Follow</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
