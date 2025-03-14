const isDarkMode = () => {
  const isSystemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)")?.matches || false;
  const themeValue = localStorage?.getItem("my-app-theme") || null;
  const isDark =
    themeValue && themeValue === "dark"
      ? true
      : themeValue && themeValue === "light"
        ? false
        : isSystemDark
  return isDark;
}

export default isDarkMode;

