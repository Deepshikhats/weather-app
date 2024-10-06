import { Button } from "@mui/material";

interface HeaderProps {
  title?: string;
}
const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header className="App-header">
      <h2>{title}</h2>
    </header>
  );
};

export default Header;
