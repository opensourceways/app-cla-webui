import { useAppearance } from "@/stores/common";
import { isClient } from "@/shared/utils";

const APPEARANCE_KEY = "ms-theme";

export const useTheme = () => {
  const appearanceStore = useAppearance();

  const isLight = computed(() => appearanceStore.value === "light");
  const isDark = computed(() => appearanceStore.value === "dark");

  const changeTheme = () => {
    if (isClient()) {
      const theme = appearanceStore.value === "dark" ? "light" : "dark";
      appearanceStore.value = theme;
      localStorage.setItem(APPEARANCE_KEY, theme);
    }
  };

  watch(
    () => {
      return appearanceStore.value;
    },
    (val) => {
      const documentElement = document.documentElement;
      val === "light" && documentElement.removeAttribute("data-o-theme");
      val === "dark" && documentElement.setAttribute("data-o-theme", "dark");
    }
  );

  onMounted(() => {
    let theme;
    if (!localStorage.getItem(APPEARANCE_KEY)) {
      const prefereDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      theme = prefereDark ? "dark" : "light";
    } else {
      theme = localStorage.getItem(APPEARANCE_KEY);
    }

    appearanceStore.value = theme === "dark" ? "dark" : "light";
  });

  return {
    isLight,
    isDark,
    theme: appearanceStore,
    changeTheme,
  };
};
