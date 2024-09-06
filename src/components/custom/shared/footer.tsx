import logo from "@/assets/poster-icon.png";
import america from "@/assets/america.png";
import { Separator } from "@/components/ui/separator";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#0E0E0E]">
      <div className="container mx-auto p-4">
        <div className="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6 py-20">
          <div className="flex gap-1">
            <img src={logo} alt="logo" className="h-10 w-10" />
            <h1 className="font-bold text-white text-3xl">
              Furni<span className="text-[#1E99F5]">Flex</span>
            </h1>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-white">About</h3>
            <div className="space-y-1 text-muted-foreground">
              <p>Master Plan</p>
              <p>Jobs</p>
              <p>Invest</p>
              <p>Pressroom</p>
              <p>Blog</p>
              <p>Contact</p>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Explore EEVE</h3>
            <div className="space-y-1 text-muted-foreground">
              <p>Unlock my Robot Power</p>
              <p>Starlight</p>
              <p>Robot Platform</p>
              <p>EEVE Roadmap</p>
            </div>
          </div>
          <div className="space-y-3">
            <h3 className="font-semibold text-white">Community & Support</h3>
            <div className="space-y-1 text-muted-foreground">
              <p>Willow X Community</p>
              <p>Developer & Maker Access</p>
              <p>Special Cases</p>
            </div>
          </div>
        </div>
        <Separator className="bg-gray-500" />
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4 py-10">
          {/* social media */}
          <div className="flex items-center gap-3">
            <Facebook className="text-muted-foreground w-6 h-6" />
            <Instagram className="text-muted-foreground w-6 h-6" />
            <FaXTwitter className="text-muted-foreground w-6 h-6" />
            <Linkedin className="text-muted-foreground w-6 h-6" />
          </div>
          <div className="flex md:justify-center items-center gap-3 sm:flex-nowrap flex-wrap text-muted-foreground">
            <p>March22 Recap</p>
            <p>Privacy Policy</p>
            <p>General Terms</p>
            <p>Contact</p>
          </div>
          <div className="flex md:justify-end items-center gap-1 text-muted-foreground">
            <img src={america} alt="" className="w-5 h-5" />
            <p>United States (English)</p>
          </div>
        </div>
        <div className="flex justify-center items-center">
          <small className="text-muted-foreground">
            EEVE © {new Date().getFullYear()}. All rights reserved.
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
