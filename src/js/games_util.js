let angle = 0; // Initial angle for rotation
let chosenBlocks = []; // Store chosen blocks in sequence

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function openTab(tabName) {
  var i, tabcontent, tabbuttons;

  // Hide all tab contents
  tabcontent = document.getElementsByClassName("tab-content");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the active class from all tab buttons
  tabbuttons = document.getElementsByClassName("tab-button");
  for (i = 0; i < tabbuttons.length; i++) {
    tabbuttons[i].className = tabbuttons[i].className.replace(" active", "");
  }

  // Show the current tab content and add an "active" class to the button that opened the tab
  document.getElementById(tabName).style.display = "block";
  event.currentTarget.className += " active";
}
// Drag-and-drop logic
function drag(event) {
  event.dataTransfer.setData('text', event.target.id);
}

// Drop a block into the chosen area to add it to the sequence
function dropToSequence(event) {
  event.preventDefault();
  let blockId = event.dataTransfer.getData("text");
  const content = document.getElementById("content");

  // Only add to chosen area if dragging from the block list
  if (!blockId.includes("-") && parseInt(window.getComputedStyle(content).height) != 365) {
    let block = document.getElementById(blockId).cloneNode(true);
    block.id = blockId + "-" + chosenBlocks.length; // Give unique id
    block.draggable = true;  // Make it draggable after being chosen
    block.ondragstart = drag;  // Attach drag event handler to cloned block
    let currentHeight = parseInt(window.getComputedStyle(content).height);
    if (currentHeight + 45 < 375) {
      content.style.height = (currentHeight + 40) + "px";
    }
    else if (currentHeight != 375) {
      content.style.height = 365 + "px";
    }

    // Add the cloned block to the chosen area
    document.getElementById("content").appendChild(block);
    chosenBlocks.push(blockId);  // Add to the sequence list
  }
}

function allowDrop(event) {
  event.preventDefault();
}

// Function to simulate the playing of the chosen sequence
async function playSequence() {
  let playButton = document.querySelector(".play-button");

  // Disable the play button while the sequence is playing
  playButton.disabled = true;

  let canvas = document.getElementById("gameCanvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  console.log(chosenBlocks.length);

  for (let i = 0; i < chosenBlocks.length; i++) {
    let action = chosenBlocks[i];
    console.log(chosenBlocks[i]);
    if (action === "moveBlock") {
      moveSprite(50);
    } else if (action === "rotateBlock") {
      rotateSprite(90);
    }

    // Draw something on the canvas to represent movement
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(x, y, 20, 0, 2 * Math.PI);
    ctx.fill();

    await sleep(1000);
  }
  playButton.disabled = false;
}

function droptoRemove(event) {
  event.preventDefault();
  let blockId = event.dataTransfer.getData('text');
  console.log(blockId);
  if (blockId.includes("-")) {
    let blockElement = document.getElementById(blockId);
    blockElement.parentNode.removeChild(blockElement);

    let originalBlockId = blockId.split("-")[0];
    let index = chosenBlocks.indexOf(originalBlockId);
    if (index > -1) {
      chosenBlocks.splice(index, 1);
    }
  }
}

