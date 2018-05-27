var supportedThemes = ["Abyss",
            "DiscordDark",
            "DiscordLight",
            "HighContrast",
            "JournalDark",
            "KimbieDark",
            "Ktrvs",
            "MaterialDesign",
            "Monokai",
            "Red",
            "Solarized",
            "TomorrowNightBlue",
            "TwitchDark",
            "TwitchLight"];

document.getElementsByTagName("body")[0].addEventListener('load', setTheme());
var selectedtheme;

function setTheme() {
       selectedtheme = localStorage.getItem("theme");
       if(!supportedThemes.includes(selectedtheme) || selectedtheme == null || selectedtheme == undefined) {
           console.warn(chrome.i18n.getMessage("errorCustomThemeNotFound"));
           selectedtheme = "DiscordDark";
       }
       var css = document.createElement("link");
       css.rel = "stylesheet";
       css.id = "css";
       css.href = "/css/theme/" + selectedtheme + ".css";
       document.getElementsByTagName("head")[0].appendChild(css);
}
