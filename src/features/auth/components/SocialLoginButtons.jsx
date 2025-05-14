import React from "react";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaFacebook, FaTwitter } from "react-icons/fa";

export function SocialLoginButtons({ className }) {
  return (
    <div className={`grid grid-cols-3 gap-3 ${className}`}>
      <Button variant="outline" type="button" onClick={() => console.log("Google login")}>
        <FaGoogle className="mr-2 h-4 w-4" />
        Google
      </Button>
      <Button variant="outline" type="button" onClick={() => console.log("Facebook login")}>
        <FaFacebook className="mr-2 h-4 w-4" />
        Facebook
      </Button>
      <Button variant="outline" type="button" onClick={() => console.log("Twitter login")}>
        <FaTwitter className="mr-2 h-4 w-4" />
        Twitter
      </Button>
    </div>
  );
}