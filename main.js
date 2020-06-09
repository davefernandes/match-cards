document.addEventListener("DOMContentLoaded", () => {
	
    const matchgrid = document.querySelector(".matchgrid");
    const score = document.querySelector("#score");
    const total = document.querySelector("#total");
    const results = document.querySelector("#results");
    let cardScore = 0;
    let cardCount = 6;
	let allCards = [];
	let selectedCards = [];
    let matchedCards = [];
    
    score.textContent = cardScore;
    total.textContent = cardCount;
	
	for( let i = 0; i < cardCount; i++ ) {

        //Add one Card and another card to match
		allCards.push({
			'data-value': i
		});
		allCards.push({
			'data-value': i
        });
        
    }
    
    //Randomise the cards
    allCards.sort( () => Math.random() - 0.5 );
    
    //Add all cards to the grid
    function startGame() {
        for( let i=0; i < cardCount*2; i++ ) {
            let card = document.createElement("div");
            matchgrid.appendChild(card);
            card.setAttribute('id',i);
            card.classList.add('card','blank');
            card.addEventListener("click",clickCard);
        }
    }
    
    //Show the card selected
	function clickCard() {
        let selected = this.getAttribute('id');
        selectedCards.push(selected);
       
        this.classList.remove('blank');
        this.classList.add('flipped');

        this.innerHTML = '<div class="flip-back">'+allCards[selected]['data-value']+'</div>';
		this.removeEventListener("click",clickCard);
		
		if( selectedCards.length === 2 ) {

            // Stop clicking anymore cards until match is checked
            Array.from(document.getElementsByClassName('blank')).forEach(element => {
                element.removeEventListener("click",clickCard);
            });
            
            //Set a delay and check if match exists
            setTimeout(checkMatches,500);
		}		
	}
    
    // Check if it is a match
	function checkMatches() {
		let first = selectedCards[0];
        let second = selectedCards[1];
        let firstCard = document.getElementById(first);
        let secondCard = document.getElementById(second);
        if( allCards[first]["data-value"] === allCards[second]["data-value"] ) {
            firstCard.innerHTML = '';
            secondCard.innerHTML = '';

            firstCard.classList.remove('blank','flipped');
			firstCard.classList.add('matched');
			secondCard.classList.remove('blank','flipped');
            secondCard.classList.add('matched');
            
            firstCard.removeEventListener("click",clickCard);
			secondCard.removeEventListener("click",clickCard);
			
			matchedCards.push(first);
            matchedCards.push(second);
            
            cardScore++;
            score.textContent = cardScore;
            
            //Check if all card matches are successful
			if( matchedCards.length === cardCount*2 ) {
				setTimeout(youWon,200);
			} else {
                Array.from(document.getElementsByClassName('blank')).forEach(element => {
                    element.addEventListener("click",clickCard);
                });
            }
            
            //Reset the cards to match
            selectedCards = [];
            
        } else {

            //Reset the cards to match
            selectedCards = [];
            
            firstCard.innerHTML = '';
            secondCard.innerHTML = '';
            
            firstCard.classList.add('blank','red-out');
			secondCard.classList.add('blank','red-out');
            firstCard.classList.remove('flipped');
            secondCard.classList.remove('flipped');
            
            setTimeout( function() {
                firstCard.classList.remove('red-out');
                secondCard.classList.remove('red-out');
            },300);

            // Add Click event back again
            Array.from(document.getElementsByClassName('blank')).forEach(element => {
                element.addEventListener("click",clickCard);
            });

        }		
	}
    
    // Process successful matches
	function youWon() {
		results.textContent = 'Congratulations !! You win.';
	}
    
    startGame();

});