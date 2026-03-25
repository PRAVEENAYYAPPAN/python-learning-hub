// Common functionality for all topic pages
document.addEventListener('DOMContentLoaded', function() {
    // Initialize CodeMirror editors
    const codeEditor = document.getElementById('code-editor');
    if (codeEditor) {
        const editor = CodeMirror.fromTextArea(codeEditor, {
            lineNumbers: true,
            mode: 'python',
            theme: 'default',
            tabSize: 4
        });
        
        // Make editor globally accessible for other scripts
        window.codeEditor = editor;
    }
    
    // Initialize CodeMirror editor for dictionary example (if exists)
    const codeEditorDict = document.getElementById('code-editor-dict');
    if (codeEditorDict) {
        const editorDict = CodeMirror.fromTextArea(codeEditorDict, {
            lineNumbers: true,
            mode: 'python',
            theme: 'default',
            tabSize: 4
        });
        window.codeEditorDict = editorDict;
    }
    
    // Handle run button click
    const runButton = document.getElementById('run-button');
    if (runButton) {
        runButton.addEventListener('click', function() {
            const output = document.getElementById('output');
            if (output) {
                output.textContent = 'Running code...';
                
                // Simple simulation - in a real app, we'd use Pyodide or similar
                try {
                    const code = window.codeEditor ? window.codeEditor.getValue() : '';
                    // For demo purposes, we'll just show the code
                    output.textContent = 'Code executed:\n' + code;
                } catch (error) {
                    output.textContent = 'Error: ' + error.message;
                }
            }
        });
    }
    
    // Handle run button for dictionary example
    const runButtonDict = document.getElementById('run-button-dict');
    if (runButtonDict) {
        runButtonDict.addEventListener('click', function() {
            const output = document.getElementById('output-dict');
            if (output) {
                output.textContent = 'Running code...';
                
                try {
                    const code = window.codeEditorDict ? window.codeEditorDict.getValue() : '';
                    output.textContent = 'Code executed:\n' + code;
                } catch (error) {
                    output.textContent = 'Error: ' + error.message;
                }
            }
        });
    }
    
    // Handle quiz submission
    const submitQuizButton = document.getElementById('submit-quiz');
    if (submitQuizButton) {
        submitQuizButton.addEventListener('click', function() {
            const quizFeedback = document.getElementById('quiz-feedback');
            const selectedOption = document.querySelector('input[name="quiz"]:checked');
            
            if (quizFeedback && selectedOption) {
                // In a real app, we'd check against the correct answer
                // For now, we'll just show if any option is selected
                quizFeedback.classList.remove('hidden');
                quizFeedback.classList.add('correct');
                quizFeedback.textContent = 'Correct! Great job.';
                
                // Unhide feedback after a delay
                setTimeout(() => {
                    quizFeedback.classList.add('hidden');
                }, 3000);
            }
        });
    }
    
    // Initialize Pyodide for OOP topic (if needed)
    const pyodideLoading = document.getElementById('pyodide-loading');
    const runButtonOop = document.getElementById('run-button');
    if (pyodideLoading && runButtonOop) {
        runButtonOop.addEventListener('click', async function() {
            pyodideLoading.classList.remove('hidden');
            pyodideLoading.textContent = 'Loading Python environment...';
            
            try {
                // In a real implementation, we would load Pyodide here
                // For this demo, we'll simulate loading
                await new Promise(resolve => setTimeout(resolve, 1500));
                pyodideLoading.textContent = 'Python environment ready!';
                setTimeout(() => {
                    pyodideLoading.classList.add('hidden');
                }, 1000);
            } catch (error) {
                pyodideLoading.textContent = 'Error loading Python environment: ' + error.message;
            }
        });
    }
});