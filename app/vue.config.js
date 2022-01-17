module.exports = {
  pwa: {
    name: "Kando Finances",
    themeColor: "#08843A",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "#FAE7C6",
    assetsVersion: "1.0.1",
    iconPaths: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/mstile-150x150.png",
      msTileColor: "#d7f9de",
    },
    manifestOptions: {
      name: "Kando Finances",
      short_name: "Kando-Fi",
      start_url: "/",
      id: "ru.kenguruka.finances",
      background_color: "#FAE7C6",
      msTileColor: "#d7f9de",
    },
  },
};