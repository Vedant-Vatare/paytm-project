import { useNavigate } from "react-router-dom";

const useRedirectToProfile = () => {
  const navigate = useNavigate();

  const redirectToProfile = ({ userId }) => {
    console.log(userId);
    if (!userId) {
      console.error("No user ID provided for navigation");
      return;
    }

    try {
      // Use navigate with additional error handling
      navigate(`/user/${userId}`, {
        onSuccess: () => console.log("Navigation successful"),
        onError: (error) => console.error("Navigation error:", error),
      });
    } catch (error) {
      console.error("Error during navigation:", error);
    }
  };
  return redirectToProfile;
};

export default useRedirectToProfile;
