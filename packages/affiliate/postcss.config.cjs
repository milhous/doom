const browserslist = [
    "last 1 version",
    "> 1%",
    "maintained node versions",
    "not dead",
];

module.exports = {
    plugins: {
        autoprefixer: {
            grid: "autoplace",
            cascade: true,
            remove: true,
            // 解决各个应用无需在package.json配置Browserslist
            overrideBrowserslist: browserslist,
        },
        "postcss-pxtorem": {
            rootValue: 100,
            unitPrecision: 2,
            propList: ["*"],
            replace: true,
            mediaQuery: false,
            minPixelValue: 2,
            exclude: /node_modules/i,
        },
        "postcss-normalize": {
            browsers: browserslist.join(","),
        },
    },
};