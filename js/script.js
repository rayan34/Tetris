
//VARIABLES

var plateau;					//plateau de jeu
var score = 0;					//score du joueur
var nbLignes = 0;				//nombre de lignes validées par le joueur
var typePiece = randomPiece();	//type de la pièce 
var perdu = false;
//document.body.onload = init;
init();

//FONCTIONS

function init(){
	initializePlateau();
	genererPiece(1);
}

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

function VerifLignes(){
	// return la ligne à supprimer ou false ( conditions à mettre dans la boucles principale FONCTION DE GITAN
	var bool = true;
	for(var i = 0; i < 20; i++){
		for(var j = 0; j < 10; j++){
			if(plateau[j][i]== 0){
			   bool = false;
			}
		}
	if(bool= true){
		return i;
	}
	}
	return bool;


}

function SupressionLignes(ligne){
	for(var i = 0; i < 10; i++){
		for(var j = 19; j >= 0; j--){
			if(j==ligne){
			   plateau[i][j]==0;
			}
		}
	}
	moveDownAll(ligne);
				
}

// Pareil que colision down
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
			if(plateau[i][j] == 1 && colisionDown()){
				plateau[i][j] = 0;
				plateau[i][j+1] = 1;
			}
		}
	}
}

function moveDownAll(limite){
//Fonction qui déplace la pièce d'une case vers le bas
	for(var i = 0; i < 10; i++){
		for(var j = limite; j >= 0; j--){
			if(plateau[i][j] == 2 && colisionDown()){
				plateau[i][j] = 0;
				plateau[i][j+1] = 1;
			}
		}
	}
}

function moveLeftPiece(){
//Fonction qui déplace la pièce d'une case la gauche
	for(var i = 0; i < 10; i++){
		for(var j = 0; j <= 19; j++){
			if(plateau[i][j] == 1 && colisionLeft()){
				plateau[i][j] = 0;
				plateau[i-1][j] = 1;
			}
		}
	}
}

function moveRightPiece(){
//Fonction qui déplace la pièce d'une vers la droite
	for(var i = 10; i < 0; i--){
		for(var j = 0; j <= 19; j++){
			if(plateau[i][j] == 1 && colisionRight()){
				plateau[i][j] = 0;
				plateau[i+1][j] = 1;
			}
		}
	}
}

function colisionLeft(){
var bool=true;
	for(var i = 0; i < 10; i++){
		for(var j = 0; j <= 19; j++){
			if(plateau[i][j] == 1 && i==0 ){
				bool=false;
			}
			if(plateau[i][j] == 1 && plateau[i-1][j]==2 ){
				bool=false;
			}
		}
	}
	return bool;	
	


}

function colisionRight(){
var bool=true;
	for(var i = 10; i < 0; i--){
		for(var j = 0; j <= 19; j++){
			if(plateau[i][j] == 1 && i==10 ){
				bool=false;
			}
			if(plateau[i][j] == 1 && plateau[i+1][j]==2 ){
				bool=false;
			}
		}
	}
	return bool;	
	


}

function colisionDown(){
var bool=true;
	for(var i = 0; i < 10; i++){
		for(var j = 19; j >= 0; j--){
			if(plateau[i][j] == 1 && j==19 ){
				bool=false;
			}
			if(plateau[i][j] == 1 && plateau[i][j+1]==2 ){
				bool=false;
			}
		}
	}
	return bool;	
}

/*
function Rotate(){
//Fonction qui permet de tourner la pièce
	for(var i = 0; i < 10; i++){
		for(var j = 0; j >= 19; j++){
			if(plateau[i][j] == 1){
				plateau[i][j] = 0;
				plateau[i][j+1] = 1;
			}
		}
	}
} */

function moveRightPiece(){
}

function estVide(i, j) {
	var verif = false;
	if(i>=0 && i<10 && j>=0 && j<20) {
		if(plateau[i][j] == 0) {
			verif = true;
		}
	}
	return verif;
}

function createCase(i, j){
//Fonction qui crée l'image d'une case à la position[i,j]
	var caseP = document.createElement("div");
	caseP.id = 'case';
	var img = document.createElement("img");
	img.src = './images/Case.png';
	caseP.appendChild(img);
	document.getElementById("pieces").appendChild(caseP);
	caseP.style.left = 24*i;	
	caseP.style.top = 24*j;

}

function genererPiece(type) {
//Fonction qui génére la prochaine pièce en haut de la grille	
	var i = 5; //ligne de départ de la pièce
	var j = 0; //colonne de départ de la pièce
	switch(type) {
    case 1: //la pièce est de type I
        if (estVide(i,j) && estVide(i+1, j) && estVide(i+2, j) && estVide(i+3, j)) {
			//on test si toutes les cases nécéssaires à la création de la pièce sont vide
			plateau[i][j] == 1;
			plateau[i+1][j] == 1;
			plateau[i+2][j] == 1;
			plateau[i+3][j] == 1;
			createCase(i,j);
			createCase(i+1,j);
			createCase(i+2,j);
			createCase(i+3,j);
			
			return true; // on retourne vrai si on a réussi à créer la pièce
		}
		else {
			return false; // on retourne faux si au moins une des cases était déjà occupée
		}
        break;
        
    case 2: //la pièce est de type O
       if (estVide(i,j) && estVide(i+1, j) && estVide(i, j+1) && estVide(i, j+2)) {
			//on test si toutes les cases nécéssaires à la création de la pièce sont vide
			plateau[i][j] == 1;
			plateau[i+1][j] == 1;
			plateau[i][j+1] == 1;
			plateau[i][j+2] == 1;
			return true; // on retourne vrai si on a réussi à créer la pièce
		}
		else {
			return false; // on retourne faux si au moins une des cases était déjà occupée
		}
        break;
        
	case 3: //la pièce est de type L
        if (estVide(i,j) && estVide(i+1, j) && estVide(i+2, j) && estVide(i+2, j+1)) {
			//on test si toutes les cases nécéssaires à la création de la pièce sont vide
			plateau[i][j] == 1;
			plateau[i+1][j] == 1;
			plateau[i+2][j] == 1;
			plateau[i+2][j+1] == 1;
			return true; // on retourne vrai si on a réussi à créer la pièce
		}
		else {
			return false; // on retourne faux si au moins une des cases était déjà occupée
		}
        break;
        
    case 4: //la pièce est de type J
        if (estVide(i,j) && estVide(i+1, j) && estVide(i+2, j) && estVide(i+2, j-1)) {
			//on test si toutes les cases nécéssaires à la création de la pièce sont vide
			plateau[i][j] == 1;
			plateau[i+1][j] == 1;
			plateau[i+2][j] == 1;
			plateau[i][j-1] == 1;
			return true; // on retourne vrai si on a réussi à créer la pièce
		}
		else {
			return false; // on retourne faux si au moins une des cases était déjà occupée
		}
        break;
        
    case 5: //la pièce est de type S
        if (estVide(i,j) && estVide(i+1, j) && estVide(i+1, j-1) && estVide(i, j+1)) {
			//on test si toutes les cases nécéssaires à la création de la pièce sont vide
			plateau[i][j] == 1;
			plateau[i+1][j] == 1;
			plateau[i+1][j-1] == 1;
			plateau[i][j+1] == 1;
			return true; // on retourne vrai si on a réussi à créer la pièce
		}
		else {
			return false; // on retourne faux si au moins une des cases était déjà occupée
		}
        break;
        
    case 6: //la pièce est de type Z
        if (estVide(i,j) && estVide(i, j+1) && estVide(i+1, j+1) && estVide(i+1, j+2)) {
			//on test si toutes les cases nécéssaires à la création de la pièce sont vide
			plateau[i][j] == 1;
			plateau[i+1][j] == 1;
			plateau[i+1][j-1] == 1;
			plateau[i][j+1] == 1;
			return true; // on retourne vrai si on a réussi à créer la pièce
		}
		else {
			return false; // on retourne faux si au moins une des cases était déjà occupée
		}
        break;
        
    case 7: //la pièce est de type T
        if (estVide(i,j) && estVide(i+1, j) && estVide(i+2, j) && estVide(i+1, j+1)) {
			//on test si toutes les cases nécéssaires à la création de la pièce sont vide
			plateau[i][j] == 1
			plateau[i][j+1] == 1;
			plateau[i][j+2] == 1;
			plateau[i+1][j+1] == 1;
			return true; // on retourne vrai si on a réussi à créer la pièce
		}
		else {
			return false; // on retourne faux si au moins une des cases était déjà occupée
		}
        break;
	}
} 

// les différentes valeures de typesPiece :
/*  1 : I
 
	*
	*
	*
	* 
*/ 

// Pour l'initialisation, gestion des touches , lorsque une touche valide à été pressé, on lance render ( rendu ) et on dit à la "map" quelle touche a été préssé



/*  2 : O
 
	* *
	* *
*/ 
/*  3 : L
 
	*
	*
	* *
*/ 
/*  4 : J
 
	  *
	  *
        * *
*/ 
/*  5 : S
 
	  * *
        * *
*/ 
/*  6 : Z
 
	* *
	  * *
*/ 
/*  7 : T
 
	* * *
	  *
*/ 

function move(event) {
       var key = ' ';
       if (codeTouche == 40){
		key = 'down';
	}
	if (codeTouche == 39){
		key = 'right';
        }
	if (codeTouche == 37){
		key = 'left';
        }
	if (codeTouche == 38){
		key = 'rotate';
        }
	else{
	    key ='undefined';
	}
            // les touches directionnelles sont prises en compte
    

            if (key != 'undefined' ) {
                switch ( key ){
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
        }


/*
genererPiece(1);
var b = document.body;
b.addEventListener('keydown',move);
*/
