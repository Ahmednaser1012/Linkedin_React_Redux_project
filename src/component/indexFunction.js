import { signInWithPopup } from "firebase/auth";
import { auth, provider, storage } from "../firbase";
import { clearUser, signIN } from "../ReduxToolKit/userslice";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import {
  addArticle,
  loadingArt,
  setArticles,
} from "../ReduxToolKit/articlesSlice";

export function googleSignIn() {
  return (dispatch) => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        console.log(user);
        dispatch(
          signIN({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}

// return (dispatch) => {
//   signInWithPopup(auth, provider)
//     .then((payload) => {
//       dispatch();
//     })
//     .catch((error) => {
//       alert(error.message);
//     });

//********************* */

export function signoUT() {
  return (dispatch) => {
    auth
      .signOut()
      .then(() => {
        dispatch(clearUser());
        console.log("signout success");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
}

//********************* */
export function getUserAuth() {
  return (dispatch) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(
          signIN({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(signIN(null));
      }
    });
  };
}
//********************* */

//**********post articles *********** */
// export function PostArticleApi(payload) {
//   return (dispatch) => {
//     dispatch(loadingArt(true));
//     if (payload.images) {
//       const storageRef = ref(storage, `images/${payload.images.name}`);
//       const uploadRef = uploadBytesResumable(storageRef, payload.images);
//       uploadRef.on(
//         "state_changed",
//         (snapshot) => {
//           const progress =
//             (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//           console.log(`Upload is ${progress}% done`);
//           switch (snapshot.state) {
//             case "paused":
//               console.log("Upload is paused");
//               break;
//             case "running":
//               console.log("Upload is running");
//               break;
//             default:
//               console.log("Upload is done");
//           }
//         },
//         (error) => {
//           console.log(error);
//         },
//         () => {
//           getDownloadURL(uploadRef.snapshot.ref).then((downloadURL) => {
//             const collRef = collection(db, "articles");
//             addDoc(collRef, {
//               actor: {
//                 description: payload.user.email,
//                 title: payload.user.displayName,
//                 date: payload.timestamp,
//                 image: payload.user.photoURL,
//               },
//               comments: 0,
//               video: payload.video,
//               description: payload.description,
//               shareImg: downloadURL,
//             });
//           });
//         }
//       );
//       dispatch(loadingArt(false));
//     } else if (payload.video) {
//       const collRef = collection(db, "articles");
//       addDoc(collRef, {
//         actor: {
//           description: payload.user.email,
//           title: payload.user.displayName,
//           date: payload.timestamp,
//           image: payload.user.photoURL,
//         },
//         comments: 0,
//         video: payload.video,
//         description: payload.description,
//         shareImg: payload.image,
//       });
//       dispatch(loadingArt(false));
//     } else {
//       const collRef = collection(db, "articles");
//       addDoc(collRef, {
//         actor: {
//           description: payload.user.email,
//           title: payload.user.displayName,
//           date: payload.timestamp,
//           image: payload.user.photoURL,
//         },
//         comments: 0,
//         video: payload.video,
//         description: payload.description,
//         shareImg: payload.image,
//       });
//       dispatch(loadingArt(false));
//     }
//   };
// }

//**********post articles*********** */

const uploadImageToFirebase = async (imageFile) => {
  try {
    const storageRef = ref(storage, `images/${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      uploadTask.on(
        "state_changed",
        null,
        (error) => reject(error),
        async () => {
          const originalUrl = await getDownloadURL(uploadTask.snapshot.ref);
          const proxyUrl = "http://localhost:8080/";

          resolve(proxyUrl + originalUrl);
        }
      );
    });
  } catch (error) {
    console.error(" Error uploading image:", error);
    return null;
  }
};

export const PostArticleApi = (payload) => async (dispatch) => {
  try {
    dispatch(loadingArt(true));

    let imageURL = "";

    if (payload.images) {
      imageURL = await uploadImageToFirebase(payload.images);
    }

    const newArticle = {
      actor: {
        description: payload.user?.email || "Unknown",
        title: payload.user?.displayName || "Anonymous",
        date: Date.now(), // ⬅️ استبدال serverTimestamp() بتوقيت محلي
        image: payload.user?.photoURL || "/images/user.svg",
      },
      comments: 0,
      video: payload.video || "",
      description: payload.description || "",
      shareImg: imageURL ? imageURL : null,
    };

    console.log("  لن يتم إرسال البيانات إلى Firestore:", newArticle);

    dispatch(
      addArticle({ id: Math.random().toString(36).substr(2, 9), ...newArticle })
    );
  } catch (error) {
    console.error(" خطأ أثناء إضافة المقال:", error);
  } finally {
    dispatch(loadingArt(false));
  }
};
export const FetchArticlesApi = () => async (dispatch) => {
  dispatch(loadingArt(true));

  try {
    //  جلب بيانات وهمية بدلاً من Firestore
    const fakeArticles = [
      {
        id: "1",
        actor: {
          description: "test@example.com",
          title: "Test User",
          date: Date.now(),
          image: "/images/user.svg",
        },
        comments: 2,
        video: "",
        description: "هذا مقال تجريبي!",
        shareImg: "",
      },
    ];

    console.log(" لن يتم جلب البيانات من Firestore. استخدام بيانات وهمية.");

    dispatch(setArticles(fakeArticles));
  } catch (error) {
    console.error(" خطأ أثناء جلب المقالات:", error);
  } finally {
    dispatch(loadingArt(false));
  }
};
