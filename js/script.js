
//VARIABLES

var plateau;					//plateau de jeu
var score = 0;					//score du joueur
var nbLignes = 0;				//nombre de lignes validées par le joueur
var typePiece = randomPiece();	//type de la pièce 

//FONCTIONS

function randomX(){
//retourne un nombre aléatoire entre 0 et 10
	var min = Math.ceil(0);
	var max = Math.floor(10);
	return Math.floor(Math.random() * (max - min)) + min;
}

function randomPiece(){
//retourne un nombre aléatoire entre 1 et 7
	var min = Math.ceil(1);
	var max = Math.floor(8);
	return Math.floor(Math.random() * (max - min)) + min;
}

function initializePlateau(){
//Fonction qui va initialiser le tableau de jeu
	plateau = new Array(10);
	for(var i = 0; i < 10; i++){
		plateau[i] = new Array(20);
		for(var j = 0; j < 20; j++){
			plateau[i][j] = 0;
		}
	}
}

function verifPieceBloque(){
//Fonction qui renvoie true si la pièce est bloqué par en dessous
	var resultat = false;
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 20; j++){
			if(j == 19 | (plateau[i][j] == 1 & plateau[i][j+1] == 2)) {
				resultat = true;
			}
		}
	}
	return resultat;
}

function moveDownPiece(){
//Fonction qui déplace la pièce d'une case vers le bas
	for(var i = 0; i < 10; i++){
		for(var j = 19; j >= 0; j--){
			if(plateau[i][j] == 1){
				plateau[i][j] = 0;
				plateau[i][j+1] = 1;
			}
		}
	}
}

function estVide(i, j) {
	var verif = false;
	if(plateau[i][j] == 0) {
		verif = true;
	}
	return verif;
}

function genererPiece(i,j,typePiece) {
//Fonction qui génére la prochaine pièce en haut de la grille	
	var i = 0; //position de départ ligne
	var j = 5; //position de départ colonne
	switch(typePiece) {
    case 1: //la pièce est de type barre
        if (estVide(i,j) {
			plateau[i][j] == 1
			plateau[i+1][j] == 1;
			plateau[i+2][j] == 1;
        break;
        
    case 2:
        code block
        break;
        
	case 3:
        code block
        break;
        
    case 4:
        code block
        break;
        
    case 5:
        code block
        break;
        
    case 6:
        code block
        break;
        
    case 7:
        code block
        break;
}
} 

// les différentes valeures de typesPiece :
/*  1 : barre
 
	*
	*
	*
	* 
*/ 

// Pour l'initialisation, gestion des touches , lorsque une touche valide à été pressé, on lance render ( rendu ) et on dit à la "map" quelle touche a été préssé



/*  2 : carre
 
	* *
	* *
*/ 
/*  3 : L
 
	*
	*
	* *
*/ 
/*  4 : L à l'envers
 
	  *
	  *
    * *
*/ 
/*  5 : S
 
	  * *
    * *
*/ 
/*  6 : S à l'envers
 
	* *
	  * *
*/ 
/*  7 : T
 
	* * *
	  *
*/ 



function loaded() 
    {

        document.body.onkeydown = function( e ) 
        {
            // les touches directionnelles sont prises en compte
            var keys = {
                37: 'left',
                39: 'right',
                40: 'down',
                38: 'rotate'
            };

            if ( typeof keys[ e.keyCode ] != 'undefined' ) 
            {
                switch ( key ) 
        {
            case 'left':
                moveLeftPiece();
                break;

            case 'right':
                moveRightPiece();
                break;

            case 'down':
                moveDownPiece();
                break;

            case 'rotate':
                // à voir
                break;
        }
            }
        };



    };


