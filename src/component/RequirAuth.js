// import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const RequirAuth = ({ children }) => {
  const user = useSelector((state) => state.userState.user);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/", { replace: true }); // إعادة التوجيه إلى الصفحة الرئيسية إذا لم يكن المستخدم موجودًا
    }
  }, [user, navigate]);

  //   if (!user) {
  //     return null; // عدم عرض أي شيء أثناء إعادة التوجيه
  //   }

  return children; // عرض المكونات الأبناء إذا كان المستخدم موجودًا
};

export default RequirAuth;
