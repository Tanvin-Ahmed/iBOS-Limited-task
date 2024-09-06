import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type Props = {
  src: string;
  fallbackText: string;
  className?: string;
};

const CustomAvatar = ({ className, src, fallbackText }: Props) => {
  return (
    <Avatar className={className}>
      <AvatarImage src={src} alt="" />
      <AvatarFallback>{fallbackText}</AvatarFallback>
    </Avatar>
  );
};

export default CustomAvatar;
