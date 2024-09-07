// Initialize CodeMirror editors
const htmlEditor = CodeMirror.fromTextArea(document.getElementById('html-code'), {
    mode: 'xml',
    theme: 'material-darker',
    lineNumbers: true,
    autoCloseTags: true,
});

const cssEditor = CodeMirror.fromTextArea(document.getElementById('css-code'), {
    mode: 'css',
    theme: 'material-darker',
    lineNumbers: true,
    autoCloseBrackets: true,
});

const jsEditor = CodeMirror.fromTextArea(document.getElementById('js-code'), {
    mode: 'javascript',
    theme: 'material-darker',
    lineNumbers: true,
    autoCloseBrackets: true,
});
//notes



// Function to show the placeholder in the console
function showConsolePlaceholder() {
    const consoleDiv = document.getElementById('console');
    consoleDiv.innerHTML = '<div id="console-placeholder"><h6 class="hello">Console error will appear here</h6></div>';
}

// Function to run the code and display output/errors
function runCode() {
    const htmlCode = htmlEditor.getValue();
    const cssCode = cssEditor.getValue();
    const jsCode = jsEditor.getValue();

    const output = document.getElementById('output').contentWindow.document;
    const consoleDiv = document.getElementById('console');
    const consolePlaceholder = document.getElementById('console-placeholder');

    consoleDiv.innerHTML = ''; // Clear previous console output

    output.open();
    output.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
            <script>
                window.onerror = function(message, source, lineno, colno, error) {
                    const consoleDiv = parent.document.getElementById('console');
                    const consolePlaceholder = parent.document.getElementById('console-placeholder');
                    if (consolePlaceholder) {
                        consolePlaceholder.style.display = 'none'; // Hide placeholder text
                    }
                    consoleDiv.innerHTML += '<span style="color:red;">' + message + ' at ' + source + ':' + lineno + ':' + colno + '</span><br>';
                    console.log('Error captured:', message, source, lineno, colno, error);
                    return true; // Prevent default error handling
                };
                try {
                    ${jsCode}
                } catch (e) {
                    console.log('Caught error:', e);
                    window.onerror(e.message, e.fileName, e.lineNumber, e.columnNumber, e);
                }
            <\/script>
        </body>
        </html>
    `);
    output.close();
}

// Auto-save feature
window.onload = () => {
    if (localStorage.getItem('htmlCode')) htmlEditor.setValue(localStorage.getItem('htmlCode'));
    if (localStorage.getItem('cssCode')) cssEditor.setValue(localStorage.getItem('cssCode'));
    if (localStorage.getItem('jsCode')) jsEditor.setValue(localStorage.getItem('jsCode'));
   

    // Show placeholder in console on load
    showConsolePlaceholder();
};

htmlEditor.on('change', () => localStorage.setItem('htmlCode', htmlEditor.getValue()));
cssEditor.on('change', () => localStorage.setItem('cssCode', cssEditor.getValue()));


// Live Preview Pane (commented out to disable auto-run feature)
htmlEditor.on('change', runCode);
cssEditor.on('change', runCode);
jsEditor.on('change', runCode);

function downloadCode() {
    const htmlCode = htmlEditor.getValue();
    const cssCode = cssEditor.getValue();
    const jsCode = jsEditor.getValue();

    const blob = new Blob([`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>${cssCode}</style>
        </head>
        <body>
            ${htmlCode}
            <script>${jsCode}<\/script>
        </body>
        </html>
    `], { type: 'text/html' });

    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'code.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

document.getElementById('theme-selector').addEventListener('change', (event) => {
    const selectedTheme = event.target.value;
    document.body.className = ''; // Clear all theme classes
    if (selectedTheme !== 'default') {
        document.body.classList.add(selectedTheme + '-theme');
    }
    localStorage.setItem('theme', selectedTheme);
});

// Load the saved theme on page load
window.onload = () => {
    if (localStorage.getItem('htmlCode')) htmlEditor.setValue(localStorage.getItem('htmlCode'));
    if (localStorage.getItem('cssCode')) cssEditor.setValue(localStorage.getItem('cssCode'));
    if (localStorage.getItem('jsCode')) jsEditor.setValue(localStorage.getItem('jsCode'));

    const savedTheme = localStorage.getItem('theme') || 'default';
    if (savedTheme !== 'default') {
        document.body.classList.add(savedTheme + '-theme');
    }
    document.getElementById('theme-selector').value = savedTheme;

    // Show placeholder in console on load
    showConsolePlaceholder();
};

// Rest of your existing JavaScript code...






// Load file and set its content to the appropriate editor
function loadFile(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const content = e.target.result;

        // Determine the file type and set the content to the appropriate editor
        const fileType = file.type;

        if (fileType.includes('html')) {
            htmlEditor.setValue(content);
        } else if (fileType.includes('css')) {
            cssEditor.setValue(content);
        } else if (fileType.includes('javascript')) {
            jsEditor.setValue(content);
        } else {
            alert('Unsupported file type. Please open HTML, CSS, or JavaScript files.');
        }
    };

    reader.readAsText(file);
}

// Existing event listeners and other code...



function playMusic() {
    const musicPlayer = document.getElementById('music-player');
    if (musicPlayer.paused) {
        musicPlayer.play();
    } else {
        musicPlayer.pause();
    }
}
function showCheatSheet() {
    const cheatSheetModal = new bootstrap.Modal(document.getElementById('cheatSheetModal'));
    cheatSheetModal.show();
}


const documentation = {
    html: {
        'div': 'The <div> tag is a block-level container used to group other elements.',
        'span': 'The <span> tag is an inline container used to group other inline elements.',
        'a': 'The <a> tag defines a hyperlink that links to another page or resource.',
    },
    css: {
        'color': 'The color property sets the color of text.',
        'background-color': 'The background-color property sets the background color of an element.',
        'margin': 'The margin property sets the space outside the border of an element.',
    },
    javascript: {
        'function': 'A function is a block of code designed to perform a particular task.',
        'var': 'The var keyword declares a variable that can be re-assigned.',
        'let': 'The let keyword declares a block-scoped variable that can be re-assigned.',
    }
};

// Function to show tooltip
function showTooltip(event, content) {
    const tooltip = document.getElementById('tooltip');
    tooltip.textContent = content;
    tooltip.style.left = `${event.pageX + 10}px`;
    tooltip.style.top = `${event.pageY + 10}px`;
    tooltip.style.display = 'block';
}

// Function to hide tooltip
function hideTooltip() {
    const tooltip = document.getElementById('tooltip');
    tooltip.style.display = 'none';
}

// Add documentation listeners to editors
function addDocumentationListeners(editor, mode) {
    editor.on('cursorActivity', function() {
        const cursor = editor.getCursor();
        const token = editor.getTokenAt(cursor);
        const word = token.string.trim();

        // Check if the word exists in documentation
        const doc = documentation[mode][word];
        if (doc) {
            showTooltip(event, doc);
        } else {
            hideTooltip();
        }
    });

    editor.getWrapperElement().addEventListener('mouseout', hideTooltip);
}

// Add documentation listeners for each editor
addDocumentationListeners(htmlEditor, 'html');
addDocumentationListeners(cssEditor, 'css');
addDocumentationListeners(jsEditor, 'javascript');




//notes
// Existing CodeMirror initialization and other code...

// Initialize the Notes editor (will be done when the section is shown)
let notesEditor;

function toggleNotes() {
    const notesSection = document.getElementById('notes-section');
    if (notesSection.style.display === 'none') {
        notesSection.style.display = 'block';
        if (!notesEditor) {
            notesEditor = CodeMirror.fromTextArea(document.getElementById('notes'), {
                mode: 'plaintext',
                theme: 'material-darker',
                lineNumbers: true,
            });
            notesEditor.on('change', () => localStorage.setItem('notes', notesEditor.getValue()));
            if (localStorage.getItem('notes')) {
                notesEditor.setValue(localStorage.getItem('notes'));
            }
        }
    } else {
        notesSection.style.display = 'none';
    }
}

function downloadNotes() {
    const notes = notesEditor ? notesEditor.getValue() : '';

    const blob = new Blob([notes], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'notes.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Existing event listeners and other code...



//quiz and challenge

function showQuiz() {
    $('#quizModal').modal('show');
}

const quizzes = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "High Text Markup Language", "Hyper Tabular Markup Language", "None of these"],
        answer: "Hyper Text Markup Language"
    },
    {
        question: "What does CSS stand for?",
        options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
        answer: "Cascading Style Sheets"
    },
    {
        question: "What does JS stand for?",
        options: ["JavaStyle", "JavaSource", "JavaScript", "JustScript"],
        answer: "JavaScript"
    },
    {
        question: "Which HTML element is used to define the title of a document?",
        options: ["<title>", "<head>", "<meta>", "<link>"],
        answer: "<title>"
    },
    {
        question: "Which CSS property is used to change the text color of an element?",
        options: ["text-color", "fgcolor", "color", "font-color"],
        answer: "color"
    },
    {
        question: "Which HTML element is used to define a hyperlink?",
        options: ["<link>", "<a>", "<href>", "<hyperlink>"],
        answer: "<a>"
    },
    {
        question: "Which JavaScript method is used to write a message in the console?",
        options: ["console.print()", "console.log()", "console.write()", "console.output()"],
        answer: "console.log()"
    },
    {
        question: "Which CSS property is used to control the space between lines of text?",
        options: ["line-height", "spacing", "text-height", "line-spacing"],
        answer: "line-height"
    },
    {
        question: "Which HTML attribute is used to define inline styles?",
        options: ["style", "styles", "class", "font"],
        answer: "style"
    },
    {
        question: "Which JavaScript keyword is used to declare a variable?",
        options: ["var", "let", "const", "All of these"],
        answer: "All of these"
    },
    {
        question: "Which HTML tag is used to create an unordered list?",
        options: ["<ul>", "<ol>", "<li>", "<list>"],
        answer: "<ul>"
    },
    {
        question: "Which CSS property is used to create space between the element's border and inner content?",
        options: ["margin", "padding", "spacing", "border-spacing"],
        answer: "padding"
    },
    {
        question: "Which JavaScript function is used to parse a JSON string into a JavaScript object?",
        options: ["JSON.parse()", "JSON.stringify()", "JSON.convert()", "JSON.decode()"],
        answer: "JSON.parse()"
    },
    {
        question: "Which HTML attribute is used to specify an alternate text for an image, if the image cannot be displayed?",
        options: ["alt", "src", "title", "longdesc"],
        answer: "alt"
    },
    {
        question: "Which CSS property is used to change the background color of an element?",
        options: ["background-color", "color", "bgcolor", "background"],
        answer: "background-color"
    },
    {
        question: "Which JavaScript method is used to join two or more arrays?",
        options: ["concat()", "merge()", "combine()", "join()"],
        answer: "concat()"
    },
    {
        question: "Which HTML element is used to define a table?",
        options: ["<table>", "<tab>", "<tbl>", "<t>"],
        answer: "<table>"
    },
    {
        question: "Which CSS property is used to make the text bold?",
        options: ["font-weight", "text-weight", "font-style", "text-style"],
        answer: "font-weight"
    },
    {
        question: "Which JavaScript method is used to select an HTML element by its ID?",
        options: ["getElementById()", "querySelector()", "getElementByClass()", "getElementByName()"],
        answer: "getElementById()"
    }
];


function showQuiz() {
    const quizContent = document.getElementById('quiz-content');
    quizContent.innerHTML = '';

    quizzes.forEach((quiz, index) => {
        const quizBlock = document.createElement('div');
        quizBlock.className = 'quiz-block my-3';

        const question = document.createElement('h5');
        question.innerText = `${index + 1}. ${quiz.question}`;
        quizBlock.appendChild(question);

        quiz.options.forEach(option => {
            const optionBlock = document.createElement('div');
            optionBlock.className = 'form-check';

            const input = document.createElement('input');
            input.className = 'form-check-input';
            input.type = 'radio';
            input.name = `quiz${index}`;
            input.value = option;

            const label = document.createElement('label');
            label.className = 'form-check-label';
            label.innerText = option;

            optionBlock.appendChild(input);
            optionBlock.appendChild(label);
            quizBlock.appendChild(optionBlock);
        });

        quizContent.appendChild(quizBlock);
    });

    const quizModal = new bootstrap.Modal(document.getElementById('quizModal'));
    quizModal.show();
}

function checkAnswers() {
    let score = 0;
    quizzes.forEach((quiz, index) => {
        const selectedOption = document.querySelector(`input[name="quiz${index}"]:checked`);
        if (selectedOption && selectedOption.value === quiz.answer) {
            score++;
        }
    });

    alert(`You scored ${score} out of ${quizzes.length}`);
}
