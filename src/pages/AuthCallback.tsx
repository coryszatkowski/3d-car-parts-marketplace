import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

export function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if we have tokens in the URL fragment (after #)
        const hashParams = new URLSearchParams(
          window.location.hash.substring(1)
        );
        const accessToken = hashParams.get("access_token");
        const refreshToken = hashParams.get("refresh_token");
        const error = hashParams.get("error");

        if (error) {
          console.error("OAuth error:", error);
          navigate("/?error=oauth_error");
          return;
        }

        if (accessToken && refreshToken) {
          // Set the session with the tokens from the URL
          const { data, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });

          if (sessionError) {
            console.error("Session error:", sessionError);
            navigate("/?error=session_error");
            return;
          }

          if (data.session) {
            console.log("Successfully authenticated:", data.session.user);
            // Clear the URL fragment
            window.history.replaceState(
              {},
              document.title,
              window.location.pathname
            );
            navigate("/");
            return;
          }
        }

        // Fallback: try to get existing session
        const { data, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("Session error:", sessionError);
          navigate("/?error=session_error");
          return;
        }

        if (data.session) {
          navigate("/");
        } else {
          navigate("/?error=no_session");
        }
      } catch (error) {
        console.error("Auth callback error:", error);
        navigate("/?error=auth_callback_failed");
      }
    };

    handleAuthCallback();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4 text-gray-600">Completing sign in...</p>
      </div>
    </div>
  );
}
