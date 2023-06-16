/**
import axios from "axios";

export const fetchData = async ({ props }) => {
  const { link, navigate } = props;
  const token = localStorage.getItem("token");
  console.log(token);
  if (!token) {
    navigate("/monitoring-prime/authentication/sign-in");
  }
  try {
    const response = await axios.post(link, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // Trả về true nếu token hợp lệ
    return response;
  } catch (error) {
    // Xử lý lỗi và trả về false nếu token không hợp lệ
    console.log("Token không hợp lệ:", error);
    navigate("/monitoring-prime/authentication/sign-in");
  }
};
 */