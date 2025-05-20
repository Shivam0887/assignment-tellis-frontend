import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

type Theme = "light" | "dark";

interface ThemeState {
  theme: Theme;
  onThemeChange: (newTheme: Theme) => void;
}

const ThemeContext = createContext<ThemeState>({
  theme: "dark",
  onThemeChange: () => {},
});

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const isDarkPrefers =
      localStorage.getItem("theme") === "dark" ||
      window.matchMedia("(prefers-color-scheme:dark)").matches;

    document.documentElement.classList.toggle("dark", isDarkPrefers);
    if (!isDarkPrefers) {
      setTheme("light");
    }
  }, []);

  const onThemeChange = (newTheme: Theme) => {
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, onThemeChange }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
