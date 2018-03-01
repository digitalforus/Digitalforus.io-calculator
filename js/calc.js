var Stack = {
  // Array is used to implement stack
  constructor() {
    this.items = [];
  },

  // push function
    push(element) {
    // push element into the items
    this.items.push(element);
  },

  // pop function
  pop() {
    // return top most element in the stack
    // and removes it from the stack
    // Underflow if stack is empty
    if (this.items.length == 0) return "Underflow";
    return this.items.pop();
  },

  // peek function
  peek() {
    // return the top most element from the stack
    // but does'nt delete it.
    return this.items[this.items.length - 1];
  },

  // isEmpty function
  isEmpty() {
    // return true if stack is empty
    return this.items.length == 0;
  }
};

//input box that displays the ouptut to the user
var displayBox = document.getElementById("inp");

//clears the displaybox
function reset() {
    displayBox.value = "";
}

//deletes the last character of the string in the displayBox
function backSpace(){
    let x = displayBox.value;
    displayBox.value = x.substring(0, x.length - 1);
}

//returns the unicode value of a character
function getCharacter(chr){
    switch (chr) {
      case "*":
        return "\u00D7";
        break;
      case "/":
        return "\u00F7";
        break;
      default:
        return chr;
        break;
    }
}

//return true if the concatenation of an operator to the displayBox string gives a valid operation
function isValidOperator(chr){
    if(chr === '('){
        if(isNaN(displayBox.value[displayBox.value.length-1])){
            return true;
        }
    }
    else{
        if(!isNaN(displayBox.value[displayBox.value.length-1]) || (chr === ')')){
            return true;
        }
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
    if(!isNaN(chr)){
        displayBox.value += chr;
    }
    else{
        if(isValidOperator(chr) == true){
            displayBox.value += getCharacter(chr);
        }
    }
}

//returns the precedence value of the operator
function precedence(opr){
    switch (opr) {
      case "^":
        return 3;
        break;
      case "\u00D7":
      case "\u00F7":
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
    var chr = displayBox.value;
    var postfixStr = "";
    var stack = Object.create(Stack);

    for(let i=0; i<chr.length; i++){
        let c = chr.charAt(i);
        if(!isNaN(c)){
            postfixStr += c;
        }
        else{
            if(chr === '('){
                stack.push('(');
            }
            else if(chr === ')'){
                while (stack.peek() != "(") {
                postfixStr += stack.pop();
                }
                let del = stack.pop();
            }
            else{
                while (!stack.isEmpty()) {
                    if (precedence(stack.peek()) >= precedence(c)) {
                        postfixStr += stack.pop();
                    } else {
                        stack.push(c);
                    }
                }
                
            }

            
        }
        console.log(stack);
    }
    
    while (!stack.isEmpty()) {
      postfixStr += stack.pop();
    }
    console.log(postfixStr);

}

//evaluates the string in the displayBox
/* 

*/
function calc(){
    infixToPostfix();
}