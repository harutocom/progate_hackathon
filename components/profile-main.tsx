import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { User } from "../lib/types";

interface ProfileMainProps {
  user: User;
}

export const ProfileMain = ({ user }: ProfileMainProps) => {
  return (
    <div className="profile-icon-container flex flex-col items-center mb-6">
      <h2 className="profile-title text-[60px] mb-[50px] font-[Manrope]">
        Profile
      </h2>
      <Avatar className="size-32">
        <AvatarImage src={user.profileImg} alt={user.username} />
      </Avatar>
      <h1 className="text-[30px] font-[inter] mt-10 mb-12">{user.username}</h1>
    </div>
  );
};
