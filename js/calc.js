var Stack = {
    items: [],

    // push function
    push: function(element) {
        // push element into the items
        this.items.push(element);
    },

    // pop function
    pop: function() {
        // return top most element in the stack
        // and removes it from the stack
        // Underflow if stack is empty
        if (this.items.length == 0) return "Underflow";
        return this.items.pop();
    },

    // peek function
    peek: function() {
        // return the top most element from the stack
        // but does'nt delete it.
        return this.items[this.items.length - 1];
    },

    // isEmpty function
    isEmpty: function() {
        // return true if stack is empty
        return this.items.length == 0;
    }
};




//input box that displays the ouptut to the user
var answer = "";
var displayBox = document.getElementById("inp");
var buff = "";
var input = [];

//clears the displaybox
function reset() {
    displayBox.value = "";
    input = [];
    buff = "";
    answer = "";
}

//deletes the last character of the string in the displayBox
function backSpace(){
    let x = displayBox.value;
    displayBox.value = x.substring(0, x.length - 1);
    if(isNaN(displayBox.value) && isNaN(input.length-1)){
        input.pop();
    }
    else if (!isNaN(displayBox.value) && isNaN(input.length - 1)){
        buffer = buffer.substring(0, buffer.length-1);
    }
    else{
        /*let y = input.length - 1;
        let a = y.substring(0, y.length - 1);*/
    }
    
    
}

//concatenates chr with the string in the displayBox
/* 
if chr is a Number 
    -concatenate chr with displayBox string
else
    if (concating chr with displayBox string is a vaalid operation)
        - concatenate chr with displayBox string
*/
function output(chr) {
    //if chr is a number
    if(!isNaN(chr)){
        displayBox.value += chr;
        buff += chr;
        //input.push(buff);
    }
    else if((chr === '.') && (isValidOperator(chr) == true)){
        displayBox.value += chr;
        buff += chr;
    }
    else if ((chr === '(') && (isValidOperator(chr) == true)){
        input.push(chr);
        displayBox.value += chr;
    }
    else if ((chr === ')') && (isValidOperator(chr) == true)) {
        input.push(buff);
        buff = "";
        displayBox.value += chr;
        input.push(chr);
    }
    //if chr is not a number
    else{
        if(isValidOperator(chr) == true){
            input.push(buff);
            buff = "";
            displayBox.value += getCharacter(chr);
            input.push(chr);
        }
    }
    console.log(input);
}

function outputAns(){
    displayBox.value += answer;
    input.push(answer);
}

//evaluates the string in the displayBox
/* 
get the postfix expression for the string by calling infixToPostfix()
evalute the postfix expression by calling evaluatePostfix()
*/
function calc() {
    if ((!isNaN(displayBox.value[displayBox.value.length - 1])) || (displayBox.value[displayBox.value.length - 1] === ')')){
        input.push(buff);
        buff = "";
        let x = infixToPostfix();
        displayBox.value = evaluatePostfix(x);
        input = [];
        input.push(evaluatePostfix(x));
        answer = evaluatePostfix(x);
    }
}

//caluclates the percentage of the last number on the displaybox
function percent(){
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = buff / 100;
        displayBox.value = replaceEnd(buff);
    }
}

function _1_over_x(){
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = 1/buff;
        displayBox.value = replaceEnd(buff);
    }
}

function x_square() {
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = Math.pow(buff, 2);
        displayBox.value = replaceEnd(buff);
    }
}

function x_cube() {
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = Math.pow(buff, 3);
        displayBox.value = replaceEnd(buff);
    }
}

function x_sqrt() {
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = Math.sqrt(buff);
        displayBox.value = replaceEnd(buff);
    }
}

function x_cuberoot() {
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = Math.cbrt(buff);
        displayBox.value = replaceEnd(buff);
    }
}

function x_log() {
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = Math.log(buff);
        displayBox.value = replaceEnd(buff);
    }
}

function x_log() {
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = Math.log(buff);
        displayBox.value = replaceEnd(buff);
    }
}

function x_sin() {
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = Math.sin(buff);
        displayBox.value = replaceEnd(buff);
    }
}

function x_cos() {
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = Math.cos(buff);
        displayBox.value = replaceEnd(buff);
    }
}

function x_tan() {
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = Math.tan(buff);
        displayBox.value = replaceEnd(buff);
    }
}

function x_ln() {
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = Math.log(buff);
        displayBox.value = replaceEnd(buff);
    }
}

function x_sinh() {
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = Math.sinh(buff);
        displayBox.value = replaceEnd(buff);
    }
}

function x_cosh() {
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = Math.cosh(buff);
        displayBox.value = replaceEnd(buff);
    }
}

function x_tanh() {
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = Math.tanh(buff);
        displayBox.value = replaceEnd(buff);
    }
}

function x_exp() {
    if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
        buff = Math.exp(buff);
        displayBox.value = replaceEnd(buff);
    }
}





//--------------------------------------Helper Methods---------------------------------------------------------

//replaces the string in the displayBox from the end to the first operator seen
function replaceEnd(x){
    var xds = displayBox.value;
    var xinp = input[input.length - 1];
    console.log(xinp);
    var xStr = xds.substring(0, xds.lastIndexOf(xinp)+1);
    console.log(xStr);
    return xStr + x;
}

//returns the unicode value of a character
function getCharacter(chr) {
    switch (chr) {
        case '*':
            return "\u00D7";
            break;
        case '/':
            return "\u00F7";
            break;
        default:
            return chr;
            break;
    }
}

//return true if the concatenation of an operator to the displayBox string gives a valid operation
function isValidOperator(chr) {
    if (chr === '(') {
        if (isNaN(displayBox.value[displayBox.value.length - 1])) {
            return true;
        }
    } 
    else if(chr === ')'){
         if (!isNaN(displayBox.value[displayBox.value.length - 1])) {
             return true;
         }
    }
    else {
        if ((!isNaN(displayBox.value[displayBox.value.length - 1])) || (displayBox.value[displayBox.value.length - 1] === ')')) {
            return true;
        }
    }
}

//returns the precedence value of the operator
function precedence(opr){
    switch (opr) {
      case "^":
        return 3;
        break;
      case "*":
      case "/":
        return 2;
        break;
      case "+":
      case "-":
        return 1;
        break;
      default:
        return 0;
        break;
    }
}

//convert the string in the displayBox to a postfix expression
/* loop on each character of displayBox
 *     if chr is an operand
 *          add chr to postfix string
 *     else if chr is (
 *          push chr to stack
 *     else if chr is )
 *          pop all operand and add to postfix string until we get a (
 *     else
 *         if the precedence of top element of stack > precedence of chr
 *            pop top of stack to postfix string
 *            check again
 *         else
 *            push chr to stack
*/
function infixToPostfix(){
    var postfixStr = [];
    var stack = Object.create(Stack);

    for(let i=0; i<input.length; i++){
        let chr = input[i];
        if(!isNaN(chr)){
            postfixStr.push(chr);
        }
        else{
            if(chr === '('){
                stack.push('(');
            }
            else if(chr === ')'){
                while (stack.peek() != "(") {
                postfixStr.push(stack.pop());
                }
                let del = stack.pop();
            }
            else{
                while(precedence(stack.peek()) >= precedence(chr)) {
                    postfixStr.push(stack.pop());
                } 
                
                stack.push(chr);
            }
        }
    }
    
    while (!stack.isEmpty()) {
      postfixStr.push(stack.pop());
    }
    console.log(postfixStr);
    return postfixStr;
}

//evaluates a postfix expression using stack
/* 
loops through each character of the postfix string
if chr is an operand
    -push to stack
else
    -pop a
    -pop b
    -solve b operator a
*/
function evaluatePostfix(exp) {
  var stack = Object.create(Stack);
  for (var i = 0; i < exp.length; i++) {
    var c = exp[i];
    if(c != ""){
        if (!isNaN(c)){
            stack.push(c - "0");
        } 
        else {
            var val1 = stack.pop();
            var val2 = stack.pop();
            if (val1 == "Underflow" || val2 == "Underflow")
                return "Invalid Operation";
            switch (c) {
                case "+":
                stack.push(val2 + val1);
                break;
                case "-":
                stack.push(val2 - val1);
                break;
                case "/":
                stack.push(val2 / val1);
                break;
                case "*":
                stack.push(val2 * val1);
                break;
                case "*":
                stack.push(Math.pow(val2, val1));
                break;
            }
        }
    }
  }
  return stack.pop();
}
