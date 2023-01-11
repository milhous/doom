module.exports = {
    plugins: {
        autoprefixer: {},
        "postcss-pxtorem": {
            rootValue: 100,
            unitPrecision: 2,
            propList: ["*"],
            replace: true,
            mediaQuery: false,
            minPixelValue: 2,
            exclude: /node_modules/i,
        },
    },
};