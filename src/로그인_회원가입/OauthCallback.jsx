import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const OAuth2Callback = () => {

    const navigate = useNavigate();
  
    console.log('OAuth2Callback');
  
    useEffect(() => {
      const fetchJwtToken = async () => {
        fetch("http://localhost:8080/jwtcallback", {
          method: "POST",
          credentials: "include"  // 쿠키 포함
        })
        .then((res) => {
          console.log('res', res);
          const authToken = res.headers.get("Authorization");
          if (authToken) {
            console.log('token saved!', authToken);
            localStorage.setItem("authToken", authToken);
            navigate("/");
          } else {
            console.error("Authorization header is missing.");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
      }
      fetchJwtToken();
    },[navigate]);
  
    return null;
  };
  
  export default OAuth2Callback;