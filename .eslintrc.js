module.exports = {
  "extends": "react-app",
  "rules": {
    // enable additional rules
    "indent": ["error", 2],
    "semi": ["error", "always"],
    "quotes": [2, "single"], // 单引号
    "no-multiple-empty-lines": [2, {"max": 1}], // 禁止多行空行
    "object-curly-spacing": [2, "always"], // 花括号前后必须空格
    "array-bracket-spacing": [2, "never"], // 数组中括号前后不允许空格
    "space-unary-ops": [2, {"words": true, "nonwords": true, "overrides": {"!": false, ".": false}}], // 一元操作符前后必须加空格
    "key-spacing": [2, {"beforeColon": false, "afterColon": true, "mode": "strict"}], // {a: 1} 冒号与键无空格，与值有一个空格
    "keyword-spacing": [2, {"before": true, "after": true}], // 关键词前后必须加空格
    "space-before-blocks": [2, "always"], // 强制{}之前加空格
    "space-before-function-paren": [2, "always"], // function () function与() 之间加空格
    "space-in-parens": [2, "never"], // 圆括号前后不加空格
    "prefer-destructuring": [1, { "array": false, "object": true}]  //用对象解构
  }
}
