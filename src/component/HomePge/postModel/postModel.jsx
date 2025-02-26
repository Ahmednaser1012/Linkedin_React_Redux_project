import { useState } from "react";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
// import { Timestamp } from "firebase/firestore";
import { PostArticleApi } from "../../indexFunction";

const PostModel = ({ handelbutton, showModel }) => {
  const user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();

  // const PostArticles = (payload) => {
  //   dispatch(PostArticleApi(payload));
  // };

  const [editor, setEditor] = useState({
    text: "",
    assetArea: "",
    shareImage: null,
    videoLink: "",
  });

  const [loading, setLoading] = useState(false); // حالة التحميل

  // const handleChange = (e) => {
  //   const file = e.target.files[0];

  //   if (!file) {
  //     alert("Please select a valid file!");
  //     return;
  //   }

  //   setEditor({ ...editor, shareImage: file });
  // };

  const handlePostArticles = async (e) => {
    e.preventDefault();
    if (!editor.text) return;

    setLoading(true); // تفعيل حالة التحميل

    const payload = {
      user,
      description: editor.text,
      images: editor.shareImage, // متغير الصور متوافق مع API
      video: editor.videoLink,
    };

    await dispatch(PostArticleApi(payload));

    reset(e); // إعادة تعيين الحقول بعد الرفع
    setLoading(false); // إيقاف حالة التحميل
  };

  // const handlePostArticles = (e) => {
  //   e.preventDefault();
  //   if (e.target !== e.currentTarget) {
  //     return;
  //   }
  //   const payload = {
  //     user: user,
  //     description: editor.text,
  //     image: editor.shareImage,
  //     video: editor.videoLink,
  //     timestamp: Timestamp.now(),
  //   };
  //   PostArticles(payload);
  //   reset(e);
  // };

  const switchAssetArea = (area) => {
    setEditor({ ...editor, assetArea: area });
  };

  const reset = (e) => {
    setEditor({
      text: "",
      assetArea: "",
      shareImage: "",
      videoLink: "",
    });
    handelbutton(e);
  };
  return (
    <>
      {showModel && (
        <Container>
          <Content>
            <Header>
              <h2>Create a post</h2>
              <button onClick={(e) => reset(e)}>
                <img src="/images/close-icon.svg" alt="" />
              </button>
            </Header>
            <ShareContent>
              <UserInfo>
                {user && user.photoURL ? (
                  <img src={user.photoURL} alt="" />
                ) : (
                  <img src="/images/user.svg" alt="" />
                )}
                <span>{user.displayName}</span>
              </UserInfo>
              <Editor>
                <textarea
                  value={editor.text}
                  onChange={(e) =>
                    setEditor({ ...editor, text: e.target.value })
                  }
                  placeholder="What do you want to talk about?"
                  autoFocus={true}
                />
                {/* {editor.assetArea === "image" ? (
                  <UploadImage>
                    <input
                      type="file"
                      name="image"
                      id="file"
                      style={{ display: "none" }}
                      // onChange={handleChange}
                    />
                    <p>
                      <label
                        style={{
                          cursor: "pointer",
                          display: "block",
                          marginBottom: "15px",
                        }}
                        htmlFor="file"
                      >
                        Select an image to share
                      </label>
                    </p>
                    {editor.shareImage && (
                      <img
                        src={URL.createObjectURL(editor.shareImage)}
                        alt="img"
                      />
                    )}
                  </UploadImage>
                ) : (
                  
                  editor.assetArea === "media" && (
                    <>
                      <input
                        style={{ width: "100%", height: "30px" }}
                        type="text"
                        value={editor.videoLink}
                        onChange={(e) =>
                          setEditor({ ...editor, videoLink: e.target.value })
                        }
                        placeholder="Please input a video link"
                      />
                      {editor.videoLink && (
                        <ReactPlayer width="100%" url={editor.videoLink} />
                      )}
                    </>
                  )
                )} */}

                {editor.assetArea === "media" && (
                  <>
                    <input
                      style={{ width: "100%", height: "30px" }}
                      type="text"
                      value={editor.videoLink}
                      onChange={(e) =>
                        setEditor({ ...editor, videoLink: e.target.value })
                      }
                      placeholder="Please input a video link"
                    />
                    {editor.videoLink && (
                      <ReactPlayer width="100%" url={editor.videoLink} />
                    )}
                  </>
                )}
              </Editor>
            </ShareContent>
            <ShareCreation>
              <AttachAssets>
                {/* <AssetButton onClick={() => switchAssetArea("image")}>
                  <img src="/images/share-image.svg" alt="" />
                </AssetButton> */}
                <AssetButton onClick={() => switchAssetArea("media")}>
                  <img src="/images/share-video.svg" alt="" />
                </AssetButton>
              </AttachAssets>
              <ShareComment>
                <AssetButton>
                  <img src="/images/share-comment.svg" alt="" />
                  Anyone
                </AssetButton>
              </ShareComment>

              <PostButton
                onClick={handlePostArticles}
                disabled={loading || !editor.text}
              >
                {loading ? "Posting..." : "Post"}
              </PostButton>
            </ShareCreation>
          </Content>
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 9999;
  color: black;
  background-color: rgba(0, 0, 0, 0.8);
  animation: fadeIn 0.3s;
`;
const Content = styled.div`
  width: 100%;
  max-width: 552px;
  background-color: white;
  max-height: 99%;
  overflow: initial;
  border-radius: 5px;
  position: relative;
  display: flex;
  flex-direction: column;
  top: 32px;
  margin: 0 auto;
  button {
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: background 0.3s ease;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 16px 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.15);
  align-items: center;
  h2 {
    line-height: 1.5;
    font-weight: 400;
    font-size: 18px;
    color: rgba(0, 0, 0, 0.6);
  }
  button {
    height: 40px;
    width: 40px;
    min-width: auto;
    color: rgba(0, 0, 0, 0.15);
    background: none;
    border-radius: 50%;
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
  svg,
  img {
    pointer-events: none;
  }
`;
const ShareContent = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  vertical-align: baseline;
  background: transparent;
  padding: 8px 12px;
`;
const UserInfo = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  sv,
  img {
    width: 48px;
    height: 48px;
    background-clip: content-box;
    border: 2px solid transparent;
    border-radius: 50%;
  }
  span {
    font-weight: 600;
    line-height: 1.5;
    font-size: 16px;
    margin-left: 5px;
  }
`;
const ShareCreation = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 24px 16px 16px;
  height: 60px;
`;
const AssetButton = styled.button`
  height: 40px;
  min-width: auto;
  color: rgba(0, 0, 0, 0.6);
  font-weight: 500;
  font-size: 14px;
  background: none;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: rgba(0, 0, 0, 0.08);
  }
`;
const AttachAssets = styled.div`
  display: flex;
  align-items: center;
  padding-right: 8px;
  ${AssetButton} {
    width: 40px;
  }
`;
const ShareComment = styled.div`
  padding-left: 8px;
  margin-right: auto;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  display: grid;
  place-items: center;
  ${AssetButton} {
    svg,
    img {
      margin-right: 5px;
    }
    padding: 10px;
    height: 30px;
    border-radius: 30px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.08);
    }
  }
`;
const PostButton = styled.button`
  min-with: 60px;
  padding-left: 16px;
  padding-right: 16px;
  background: ${(props) => (props.disabled ? "rgb(235,235,235)" : "#0a66c2")};
  color: ${(props) => (props.disabled ? "rgb(0,0,0,0.25)" : "white")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  font-weight: 500;
  font-size: 16px;
  border-radius: 30px;
  &:hover {
    background: ${(props) => (props.disabled ? "" : "#004182")};
  }
`;
const Editor = styled.div`
  padding: 12px 24px;
  textarea {
    width: 100%;
    min-height: 100px;
    resize: none;
    font-size: 16px;
    font-weight: 400;
    outline: none;
    border: none;
    line-height: 1.5;
  }
`;
// const UploadImage = styled.div`
//   text-align: center;
//   img {
//     width: 100%;
//   }
// `;

PostModel.propTypes = {
  handelbutton: PropTypes.func.isRequired,
  showModel: PropTypes.bool.isRequired,
};

export default PostModel;
