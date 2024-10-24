import { EditorState } from '@codemirror/state';
import { EditorView, lineNumbers } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { python } from '@codemirror/lang-python';
import { javascript } from '@codemirror/lang-javascript';
import { autocompletion, completeFromList } from '@codemirror/autocomplete';


let currentLanguage = 'cpp'

const code_button = document.getElementById("code");
const block_button = document.getElementById("block");
code_button.disabled = true;

block_button.addEventListener('click', function() {
  const block = document.getElementById('block-panel');
  const code = document.getElementById('code-part');
  const text = document.getElementById('title');
  block_button.disabled = true;
  code_button.disabled = false;
  text.innerText = "Block Editor";
  block.style.display = 'block';
  code.style.display = 'none';
});

code_button.addEventListener('click', function() {
  const block = document.getElementById('block-panel');
  const code = document.getElementById('code-part');
  const text = document.getElementById('title');
  block_button.disabled = false;
  code_button.disabled = true;
  text.innerText = "Code Editor";
  block.style.display = 'none';
  code.style.display = 'block';
});

// Initialize the editor with JavaScript
function initEditor(language) {
  const startState = EditorState.create({
    doc: '', // Initial empty document
    extensions: [basicSetup, getLanguageExtension(language), autocompletion()]
  });

  view = new EditorView({
    state: startState,
    parent: document.getElementById("editor")
  });
}
// Function to get the language extension based on the language name
function getLanguageExtension(language) {
  switch (language) {
    case 'javascript':
      return javascript();
    case 'python':
      return python();
    case 'c':
      return cpp();
    case 'cpp':
      return cpp();
    default:
      return javascript(); // Fallback to JavaScript
  }
}

// Function to set the language based on button click
function setLanguage(language) {
  // Reinitialize the editor with the new language
  view.destroy(); // Destroy the old editor instance
  initEditor(language); // Create a new editor instance
}

// Initialize the editor
initEditor(currentLanguage);

// Example game canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 300;

// Sample canvas content (a simple game loop can go here)
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'skyblue';
  ctx.fillRect(10, 10, 380, 380);
  ctx.fillStyle = '#222';
  ctx.font = '30px Arial';
  ctx.fillText('Game Canvas', 100, 200);
}

const selectElement = document.getElementById('language-select');
selectElement.value = 'cpp';
selectElement.addEventListener('change', function() {
  const selectedValue = selectElement.value;
  console.log(`You selected: ${selectedValue}`);
  setLanguage(selectedValue);
});

draw();


