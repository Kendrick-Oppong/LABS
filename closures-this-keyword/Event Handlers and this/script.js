/* 
Event Handlers and this:
• Create a button element in HTML.
• Attach an event listener to the button that calls a function handleClick().
• Inside handleClick(), try to log the properties of the button (e.g., this.id, 
this.textContent). Observe the value of this.
• Modify the code to use an arrow function for the event listener. Notice the 
difference in how this behaves.

*/

const button = document.getElementById("btn");

function handleClick() {
  alert(this.id);
  alert(this.textContent);
}
button.addEventListener("click", handleClick);

button.addEventListener("click", () => {
  alert(this.id);
  alert(this.textContent);
});
