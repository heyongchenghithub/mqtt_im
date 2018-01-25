module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true
        },
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "globals": {
        "async": false,
        "await": false,
        "config": false,
        "logger": false,
        "rds": false,
        "httpPub": false,
        "ObjectId": false
      },
    "rules": {
        "indent": ["warn", "tab"],
        "linebreak-style": ["warn", "unix"],
        "semi": ["warn", "always"],
        "no-console": "off",
        "no-cond-assign": ["error"],
        "no-undef": "error", //禁用未声明的变量，除非它们在 /*global */ 注释中被提到
    }
};