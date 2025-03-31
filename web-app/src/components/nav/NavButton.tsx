import { Button, ButtonProps } from "@mui/material";

interface NavButtonProps extends Omit<ButtonProps, "color"> {
  text: string;
  icon: React.ReactNode;
  isActive: boolean;
}

const NavButton: React.FC<NavButtonProps> = ({
  isActive,
  text,
  icon,
  ...rest
}: NavButtonProps) => {
  return (
    <Button
      variant="text"
      className={`w-full flex items-center justify-start ${
        isActive ? "hover:bg-[#e2f0fc]" : "hover:bg-gray-100"
      }`}
      disableRipple
      sx={{
        fontSize: "1rem",
        padding: "13px",
        textTransform: "none",
        justifyContent: "flex-start",
        borderRadius: "10px",
        color: "black",
        backgroundColor: isActive ? "#ecf6fe" : "transparent",
      }}
      {...rest} 
    >
      <div
        className={`w-5 mr-4 ${isActive ? "opacity-100" : "opacity-55"}`}
        style={{
          filter: isActive
            ? "brightness(0) invert(30%) sepia(99%) saturate(2000%) hue-rotate(195deg) brightness(100%) contrast(95%) opacity(0.8)"
            : "",
        }}
      >
        {icon}
      </div>
      {text}
    </Button>
  );
};

export default NavButton;
