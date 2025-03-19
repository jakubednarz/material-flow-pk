import { Button, ButtonProps } from "@mui/material";


interface NavButtonProps extends ButtonProps {
  text: string;
  icon: string;
  isActive: boolean;
}

const NavButton: React.FC<NavButtonProps> = (p: NavButtonProps) => {
  return (
    <Button
      variant="text"
      className={`w-full flex items-center justify-start ${
        p.isActive ? "hover:bg-[#e2f0fc]" : "hover:bg-gray-100"
      }`}
      disableRipple
      sx={{
        fontSize: "1rem",
        padding: "13px",
        textTransform: "none",
        justifyContent: "flex-start",
        borderRadius: '10px',
        color: "black",
        backgroundColor: p.isActive ? "#ecf6fe" : "transparent"
      }}
      {...p}
    >
      <img 
        src={p.icon}
        className={`w-5 mr-4 ${p.isActive ? "opacity-100" : "opacity-55"}`}
        style={{ 
          filter: p.isActive 
            ? "brightness(0) invert(30%) sepia(99%) saturate(2000%) hue-rotate(195deg) brightness(100%) contrast(95%) opacity(0.8)" 
            : "" 
        }}
        alt=""
      />
      {p.text}
    </Button>
  );
};


export default NavButton;
