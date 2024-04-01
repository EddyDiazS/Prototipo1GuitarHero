document.addEventListener('DOMContentLoaded', function () {
    
    const guitar = document.getElementById('guitar');
    const scoreContainer = document.getElementById('score-container');
    const scoreDisplay = document.getElementById('score');

    function createNote() {
        const note = document.createElement('div');
        const positions = ['0%', '25%', '50%', '75%'];
        const colors = ['note-a', 'note-s', 'note-j', 'note-k'];
        const randomIndex = Math.floor(Math.random() * positions.length);
        const position = positions[randomIndex];
        const colorClass = colors[randomIndex];
        note.classList.add('note', colorClass);
        note.style.left = position;
        note.style.top = '-20px';
        guitar.appendChild(note);

        setTimeout(() => {
            guitar.removeChild(note);
            score--; // Restar un punto si la nota se elimina por tiempo
            updateScore();
            if (score === -50) {
                clearInterval(noteInterval);
                alert('¡Perdiste!');
            }
        }, 900);
    }

    let score = 0; 
    const noteInterval = setInterval(createNote, 300); 
    const bgMusic = document.getElementById('bg-music'); 
    
    function updateScore() {
        scoreDisplay.innerText = `Puntaje: ${score}`;
    }

    function handleKeyDown(event) {
        const key = event.key.toUpperCase();
        const positions = { 'A': '0%', 'S': '25%', 'J': '50%', 'K': '75%' };

        if (key in positions) {
            const notes = document.querySelectorAll('.note');
            notes.forEach(note => {
                const notePosition = note.style.left;
                if (notePosition === positions[key]) {
                    const audioElement = document.getElementById(`note-${key.toLowerCase()}-audio`);
                    audioElement.play(); 

                    guitar.removeChild(note);

                    score++; // Sumar un punto cuando se toca la nota
                    updateScore();

                    if (score === 100) {
                        clearInterval(noteInterval); 
                        bgMusic.pause(); 
                        alert('GANO, MUY BIEN :D'); 
                    }
                }
            });
        }
    }

    function checkNotePosition() {
        const notes = document.querySelectorAll('.note');
        notes.forEach(note => {
            const notePosition = parseFloat(note.style.top);
            if (notePosition > guitar.offsetHeight) { // Revisar si la nota sobrepasa el límite inferior del recuadro
                guitar.removeChild(note);
                score--; // Restar un punto cuando una nota sobrepasa el límite inferior
                updateScore();
            }
        });
    }

    document.addEventListener('keydown', handleKeyDown);
    setInterval(checkNotePosition, 100); // Comprobar continuamente la posición de las notas

});
