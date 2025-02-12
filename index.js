const url = "https://words.dev-apis.com/word-of-the-day"
const box = document.querySelector('.box')
let word = ''
let userWord = ''
const WORD_LENGHT = 5
const ROUNDS = 30
let num = 0

init()
let inp = document.querySelectorAll('.inp')


function init(){
    for(let i = 0; i < 30; i++){
        
            let temp = document.createElement('input');
            temp.className = 'inp' ;
            box.appendChild(temp);
        
    }
    document.addEventListener('keydown',function (event){
        event.preventDefault()
        let letter = event.key
        if(isLetter(letter)){
            handleLetter(letter)
        }else if(letter === 'Backspace'){
            handleBackspace()
        }else {
            // do nothing just chill    
        }
    })
    fetchWord(url)
}


async function fetchWord(url){
    let promise = await fetch(url)
    let res = await promise.json()
    word = res.word
}

    
function handleLetter(letter){
    
    if(userWord.length < WORD_LENGHT & num < 30){
        userWord += letter;
        inp[num++].value = letter.toUpperCase()
        if(userWord.length === WORD_LENGHT) {
            checkWord()
        }
    }
}

function handleBackspace(){
    if(userWord.length > 0){
        userWord = userWord.substring(0,(userWord.length-1))
        inp[--num].value = ''
    }
}

async function checkWord(){
    if(userWord === word){
        for(let j = -5 ; j < 0 ; j++){
            if(userWord.charAt(j+WORD_LENGHT) === word.charAt(j+WORD_LENGHT)){
                inp[num + j].style.backgroundColor = 'green'
            }
        }
        
        setTimeout(afterWinLose(`You Win the Word is "${word}"`),1000)

        
    }else {
        for(let j = -5 ; j < 0 ; j++){

            if(userWord.charAt(j+WORD_LENGHT) === word.charAt(j+WORD_LENGHT)){
                inp[num + j].style.backgroundColor = 'green'
                continue 
            }
            inp[num + j].style.backgroundColor = 'pink'
        }
        userWord = ""
        if(num == ROUNDS){
         
           setTimeout( afterWinLose(`You Lose The Word was "${word}"`),1000)
            
        }
    }
}

function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
}

function afterWinLose(message){
    num = 0
    userWord = ""
    alert(message)
    fetchWord(url+'?random=1')
    for(let i = 0; i < ROUNDS; i++){
        inp[i].value = ""
        inp[i].style.backgroundColor = 'white'
    }
}