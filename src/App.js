import { useEffect, useState } from 'react';
import './App.css';
import SingleCards from './components/SingleCards';



const cardImage = [
    {"src": "/img/aragon.png", matched:false },
    {"src": "/img/gandalf.png", matched:false},
    {"src": "/img/legolas.png", matched:false},
    {"src": "/img/frodo.png", matched:false},
    {"src": "/img/saruman.png", matched:false},
    {"src": "/img/sauron.png", matched:false}
]


function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  // function start game automatically
  useEffect(() => {
    shuffleCards()

  }, [])

  //function for shuffle cards
  const shuffleCards = () =>{
    const shuffledCards = [...cardImage, ...cardImage]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random() }))

      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(shuffledCards)
      setTurns(0)
      document.getElementById("nt_win").style.display = "none";
  }
  // function handle a choice
  const handleChoice = (card) =>{
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }
  //function compare two card
  useEffect(() =>{
    if(choiceOne && choiceTwo){
      setDisabled(true)
      if(choiceOne.src === choiceTwo.src){
       setCards(prevCards => {
        return prevCards.map(card =>{
          if(card.src === choiceOne.src){
            return {...card, matched:true}
          }else{return card}
        })
       })
        resetTurn()
      }else{
        setTimeout(() => resetTurn(),1000 ) 
      }
    }
  }, [choiceOne, choiceTwo])

      // if is true all cards, YOU WIN!
      const isTrueCard =  cards.filter(item => item.matched === true);
      console.log(isTrueCard,"IS TRUE CARDDDDD")
      if(isTrueCard.length == 12){
        console.log("COMPLETE GAME")
        document.getElementById("nt_win").style.display = "block";
      }



  //function reset choices
  const resetTurn = () =>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns + 1)
    setDisabled(false);
  } 
  // console.log(cards, turns);
  return (
    <div className="App">
        <h1>LORD OF THE RINGS MEMORY GAME</h1>
         <p>Turns: {turns}</p>
         <div className="not_win" id="nt_win">
            <div className='if_win' id="alert_win">
               <h2>YOU WIN</h2>
            </div>
            <button onClick={shuffleCards}>New Game</button>
          </div>
        <div className="card-grid">
            {cards.map(card =>(
              <SingleCards key={card.id} card={card} handleChoice={handleChoice} 
              flipped={card === choiceOne || card === choiceTwo || card.matched}
              disabled={disabled} />
            ))}
        </div>
    </div>
  );
}

export default App;
