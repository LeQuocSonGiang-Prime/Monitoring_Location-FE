// @mui icons
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import GitHubIcon from "@mui/icons-material/GitHub";
import YouTubeIcon from "@mui/icons-material/YouTube";

// Material Kit 2 React components
import MKTypography from "components/MKTypography";

// Images
import logoCT from "assets/images/logo-ct-dark.png";

export default {
  brand: {
    name: "Monitor Prime",
    image: logoCT,
    route: "/",
  },
  socials: [
    {
      icon: <FacebookIcon />,
    },
    {
      icon: <TwitterIcon />,
    },
    {
      icon: <GitHubIcon />,
    },
    {
      icon: <YouTubeIcon />,
    },
  ],
  menus: [
    {
      name: "Trợ giúp",
      items: [
        { name: "Liên hệ với chúng tôi", href: " " },
        { name: "Chăm sóc khác hàng", href: " " },
      ],
    },
    {
      name: "Thông tin pháp lý",
      items: [
        { name: "điều khoản dịch vụ", href: " " },
        { name: "chính sách bảo mật", href: " " },
        { name: "giấy phép (không)", href: " " },
      ],
    },
  ],
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      Được thực hiện bởi những người sinh viên{" "}
    </MKTypography>
  ),
};
