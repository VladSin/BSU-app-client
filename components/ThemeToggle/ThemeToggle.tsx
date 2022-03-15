import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Button from "../Button/Button";
import Sun from "../../assets/icons/sun.svg";
import Moon from "../../assets/icons/moon.svg";

interface ThemeToggleProps {
  className?: string;
}

function ThemeToggle({ className }: ThemeToggleProps): JSX.Element {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;
  if (currentTheme === "dark") {
    return (
      <Button onClick={() => setTheme("light")} className={className} type={"reset"}>
        <Sun height={26} width={26} />
      </Button>
    );
  } else {
    return (
      <Button onClick={() => setTheme("dark")} className={className} type={"reset"}>
        <Moon height={26} width={26} />
      </Button>
    );
  }
}

export default ThemeToggle;
