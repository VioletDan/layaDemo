var num = 0;
// num = "1";
//ts
var A = {
    score: 0,
    addScore: function (value) {
        this.score += value;
    }
};
A.addScore(1);
console.log(A.score); //1  number
//js
var B = {
    score: 0,
    addScore: function (value) {
        this.score += value;
    }
};
B.addScore("1");
console.log(B.score); //"01" string
//# sourceMappingURL=test.js.map