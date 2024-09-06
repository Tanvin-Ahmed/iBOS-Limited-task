import logo from "@/assets/poster-icon.png";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, LogOut, ShoppingBasket } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import CustomAvatar from "./custom-avatar";
import { useContext } from "react";
import { AuthContext } from "@/context/auth-context";

const navItems = [
  {
    id: crypto.randomUUID(),
    label: "Home",
  },
  {
    id: crypto.randomUUID(),
    label: "Products",
  },
  {
    id: crypto.randomUUID(),
    label: "Categories",
  },
  {
    id: crypto.randomUUID(),
    label: "Custom",
  },
  {
    id: crypto.randomUUID(),
    label: "Blog",
  },
];

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header className="shadow">
      <nav className="w-full container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex justify-center items-center gap-1">
            <img src={logo} alt="logo" className="h-7 w-7" />
            <p className="hidden sm:block font-bold">
              Furni<span className="text-[#1E99F5]">Flex</span>
            </p>
          </div>
          {/* medium to large screen */}
          <div className="md:flex hidden justify-center items-center gap-3">
            {navItems.map((item) => (
              <Link to="#" key={item.id} className="rounded px-2">
                {item.label}
              </Link>
            ))}
          </div>
          <div className="flex justify-center items-center gap-3">
            {/* card icon */}
            <Button
              variant={"ghost"}
              size={"icon"}
              className="relative rounded-full"
            >
              <ShoppingBasket />
              <div className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-gray-800 flex justify-center items-center">
                <small className="text-white text-[9px]">1</small>
              </div>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size={"icon"}
                  className="rounded-full p-0 h-7 w-7"
                >
                  <CustomAvatar
                    fallbackText="PI"
                    src="https://github.com/shadcn.png"
                    className="h-7 w-7"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                  <DropdownMenuItem
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="bg-red-500 text-white"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* mobile navigation dropdown */}
            <div className="block md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size={"icon"}>
                    <AlignJustify />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                  <DropdownMenuGroup>
                    {navItems.map((item) => (
                      <DropdownMenuItem key={item.id}>
                        {item.label}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
