const resultDisplay = document.getElementById('result');
        const buttons = document.querySelectorAll('button');
        let expression = '';

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.textContent;

                if (button.id === 'clr') {
                    // Clear all
                    expression = '';
                    resultDisplay.value = '0';
                } else if (button.id === 'del') {
                    // Delete last character
                    expression = expression.slice(0, -1);
                    resultDisplay.value = expression || '0';
                } else if (button.id === 'eql') {
                    // Calculate result
                    try {
                        const result = eval(expression);
                        resultDisplay.value = result;
                        expression = result.toString();
                    } catch (error) {
                        resultDisplay.value = 'Error';
                        expression = '';
                    }
                } else if (button.classList.contains('number')) {
                    // Add number or decimal
                    expression += value;
                    resultDisplay.value = expression;
                } else if (button.classList.contains('operator')) {
                    // Add operator
                    if (expression && !isNaN(expression[expression.length - 1])) {
                        expression += value;
                        resultDisplay.value = expression;
                    }
                }
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            if (e.key >= '0' && e.key <= '9') {
                expression += e.key;
                resultDisplay.value = expression;
            } else if (e.key === '.') {
                expression += e.key;
                resultDisplay.value = expression;
            } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
                if (expression && !isNaN(expression[expression.length - 1])) {
                    expression += e.key;
                    resultDisplay.value = expression;
                }
            } else if (e.key === 'Enter' || e.key === '=') {
                try {
                    const result = eval(expression);
                    resultDisplay.value = result;
                    expression = result.toString();
                } catch (error) {
                    resultDisplay.value = 'Error';
                    expression = '';
                }
            } else if (e.key === 'Backspace') {
                expression = expression.slice(0, -1);
                resultDisplay.value = expression || '0';
            } else if (e.key === 'Escape') {
                expression = '';
                resultDisplay.value = '0';
            }
        });