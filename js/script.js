
//VARIABLES

var plateau;					//plateau de jeu
var score = 0;					//score du joueur
var nbLignes = 0;				//nombre de lignes validées par le joueur
var perdu = false;				//devient true quand le joueur a perdu
var tabImg =  [null,null,null,null];	//tableau des images a manipuler (4 pour chaque piece)
var rotation = 0;						//etape de rotation pour chaque piece
var piece = 0;							//type de piece actuel



//lancement de la fonction init() qui initialise la partie
init();

//FONCTIONS

function init(){
//initialise la partie
	document.getElementById('pieces').innerHTML = "";
	initializePlateau();
	genererPiece(randomPiece());
	affichage();
	getScore();
}

function getScore() {
//affiche le score actuel du joueur dans la balise aside
	document.getElementById("currentScore").innerHTML = score;
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
	// retourne la dernière ligne complete, sinon retourne -1
	var bool = true;
	var result = -1;
	for(var j = 0; j < 20; j++){
		for(var i = 0; i < 10; i++){
			if(plateau[i][j]== 0){
			   bool = false;
			}
		}
		if(bool){
			result = j;
		}
		bool = true;
	}
	if (result != -1){
		return result;
	} else {
		return -1;
	}
}



function SupressionLignes(ligne){
//supprime toute la ligne passé en parametre
	for(var i = 0; i < 10; i++){
		plateau[i][ligne] = 0;
		var img = recupImage(i,ligne);
		img.parentNode.removeChild(img);
	}
	moveDownAll(ligne);
	var l = VerifLignes();
	if (l != -1) {
		SupressionLignes(l);
	}		
}

function getPxTop(i){
//retourne le style.top de l'image tabImg[i]
	var str = "";
	for(var a= 0 ; a<5; a++){
		if(tabImg[i].style.top[a]!="p"){
		str= str+tabImg[i].style.top[a];
		}
		else{
		return str;
		}
	} 
}

function getPxLeft(i){
//retourne le style.left de l'image tabImg[i]
	var str = "";
	for(var a= 0 ; a<5; a++){
		if(tabImg[i].style.left[a]!="p"){
		str= str+tabImg[i].style.left[a];
		}
		else{
		return str;
		}
	} 
}

function getPxRight(i){
//retourne le style.right de l'image tabImg[i]
	var str = "";

	for(var a= 0 ; a<5; a++){
		if(tabImg[i].style.left[a]!="p"){
		str= str+tabImg[i].style.left[a];
		}
		else{
		return str;
		}
	} 
}


function verifPieceBloque(){
//Fonction qui renvoie true si la pièce est bloqué par en dessous
	var resultat = false;
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 20; j++){
			if(plateau[i][j] == 1 & (j == 19 || plateau[i][j+1] == 2)) {
				resultat = true;
			}
		}
	}
	return resultat;
}


function moveDownPiece(){
//Fonction qui déplace la pièce d'une case vers le bas
	var a=0;
	if(colisionDown()==false){
		for(var i = 9; i >= 0; i--){
			for(var j = 19; j >= 0; j--){
				if(plateau[i][j] == 1){
					plateau[i][j] = 0;
					plateau[i][j+1] = 1;
					var px=getPxTop(a);
					px=px/24;
					tabImg[a].style.top = 24*(px +1) +"px";
					a++;
				}
			}
		}
	}
	else{
		for(var i = 9; i >= 0; i--){
			for(var j = 19; j >= 0; j--){
				if(plateau[i][j] == 1){
					plateau[i][j]=2;
				}
			}
		}	
	}
	if(a==0){
	return true;
	}
	return false;
	
}

function moveDownAll(limite){
//Fonction qui déplace la pièce d'une case vers le bas
	for(var i = 0; i < 10; i++){
		for(var j = limite; j >= 0; j--){
			if(plateau[i][j] != 0){
				plateau[i][j] = 0;
				plateau[i][j+1] = 2;
				var img = recupImage(i,j);
				img.id = i + "-" + (j+1);
				img.style.top = (j+1)*24 +"px";
			}
		}
	}
}

function moveLeftPiece(){
//Fonction qui déplace la pièce d'une case vers la gauche
	var a=0;
	if(colisionLeft()==false){				
	for(var i = 0; i < 10; i++){
		for(var j = 0; j <= 19; j++){
			if(plateau[i][j] == 1){
				plateau[i][j] = 0;
				plateau[i-1][j] = 1;
				var px=getPxLeft(a);
				px=px/24;
				tabImg[a].style.left = 24*(px-1) +"px";
				a++;
			}
		}
	}
	}
}

function moveRightPiece(){ 
//Fonction qui déplace la pièce d'une case vers la droite
	var a=0;
	if(colisionRight()==false){
		for(var i = 9; i >= 0; i--){
			for(var j = 0; j <= 19; j++){
				if(plateau[i][j] == 1){
					plateau[i][j] = 0;
					plateau[i+1][j] = 1;
					var px=getPxRight(a);
					px=px/24;
					tabImg[a].style.left = 24*(px+1) +"px";
					a++;
				}
			}
		}
	}
}

function colisionLeft(){
//retourne true si il y a une colision à gauche de la piece
var bool=false;
	for(var i = 0; i <= 9; i++){
		for(var j = 0; j <= 19; j++){
			if(plateau[i][j] == 1 && i==0 ){
				bool=true;
			}
			if(plateau[i][j] == 1 && plateau[i-1][j]==2 ){
				bool=true;
			}
		}
	}
	return bool;	
	


}

function colisionRight(){
//retourne true si il y a une colision à droite de la piece
var bool=false;
	for(var i = 9; i >= 0; i--){
		for(var j = 0; j <= 19; j++){
			if(plateau[i][j] == 1 && i==9 ){
				bool=true;
			}
			if(plateau[i][j] == 1 && plateau[i+1][j]==2 ){
				bool=true;
			}
		}
	}
	return bool;	
}

function colisionDown(){
	//retourne true si il y a une colision en dessous de la piece
var bool=false;
var compt = 0;
	for(var i = 0; i < 10; i++){
		for(var j = 19; j >= 0; j--){
			if(plateau[i][j] == 1 && (j==19 | plateau[i][j+1]==2)){
				if(bool == false){
					score = score+10;
				}
				plateau[i][j] == 2;
				compt++;
				for(var k = 0; k < 4; k++){
					tabImg[k].id = getPositionString(k);
				}
				var ligne = VerifLignes();
				if (ligne != -1){
					if(bool == false){
						score = score+100;
					}
					SupressionLignes(ligne);
				}
				bool=true;
			}
		}
	}
	getScore();
	return bool;	
}

function estVide(i, j) {
//retourne vrai si la case plateau[i][j] est egaleà 0
	var verif = false;
	if(i>=0 && i<10 && j>=0 && j<20) {
		if(plateau[i][j] == 0) {
			verif = true;
		}
	}
	return verif;
}

function createCase(i, j, couleur){
//Fonction qui crée l'image d'une case à la position[i,j] et va choisir sa couleur en fonction de son typePiece
	var img = document.createElement("img");
	img.src = './images/Case'+ couleur +'.png';
	document.getElementById("pieces").appendChild(img);
	img.style.left = 24*i +"px";	
	img.style.top = 24*j +"px";
	return img;
}

function genererPiece(typePiece) {
//Fonction qui génére la prochaine pièce en haut de la grille	
	var i = 5; //ligne de départ de la pièce
	var j = 0; //colonne de départ de la pièce
	switch(typePiece) {
    case 1: //la pièce est de type I
        if (estVide(i,j) && estVide(i, j+1) && estVide(i, j+2) && estVide(i, j+3)) {
			//on test si toutes les cases nécéssaires à la création de la pièce sont vide
			plateau[i][j] = 1;
			plateau[i][j+1] = 1;
			plateau[i][j+2] = 1;
			plateau[i][j+3] = 1;
			tabImg[0] = createCase(i,j,1);
			tabImg[1] = createCase(i,j+1,1);
			tabImg[2] = createCase(i,j+2,1);
			tabImg[3] = createCase(i,j+3,1);
			piece = 1;
			rotation = 1;
			return true; // on retourne vrai si on a réussi à créer la pièce
		}
		else {
			return false; // on retourne faux si au moins une des cases était déjà occupée
		}
        break;
        
    case 2: //la pièce est de type O
       if (estVide(i,j) && estVide(i+1, j) && estVide(i, j+1) && estVide(i+1, j+1)) {
			//on test si toutes les cases nécéssaires à la création de la pièce sont vide

			plateau[i][j] = 1;
			plateau[i+1][j] = 1;
			plateau[i][j+1] = 1;
			plateau[i+1][j+1] = 1;
			tabImg[0] = createCase(i,j,2);
			tabImg[1] = createCase(i+1,j,2);
			tabImg[2] = createCase(i,j+1,2);
			tabImg[3] = createCase(i+1,j+1,2);
			piece = 2;
			rotation = 1;
			return true; // on retourne vrai si on a réussi à créer la pièce
		}
		else {
			return false; // on retourne faux si au moins une des cases était déjà occupée
		}
        break;
        
	case 3: //la pièce est de type L
        if (estVide(i,j) && estVide(i, j+1) && estVide(i, j+2) && estVide(i+1, j+2)) {
			//on test si toutes les cases nécéssaires à la création de la pièce sont vide

			plateau[i][j] = 1;
			plateau[i][j+1] = 1;
			plateau[i][j+2] = 1;
			plateau[i+1][j+2] = 1;
			tabImg[0] = createCase(i,j,3);
			tabImg[1] = createCase(i,j+1,3);
			tabImg[2] = createCase(i,j+2,3);
			tabImg[3] = createCase(i+1,j+2,3);
			piece = 3;
			rotation = 1;
			return true; // on retourne vrai si on a réussi à créer la pièce
		}
		else {
			return false; // on retourne faux si au moins une des cases était déjà occupée
		}
        break;
        
    case 4: //la pièce est de type J
        if (estVide(i,j) && estVide(i, j+1) && estVide(i, j+2) && estVide(i-1, j+2)) {
			//on test si toutes les cases nécéssaires à la création de la pièce sont vide

			plateau[i][j] = 1;
			plateau[i][j+1] = 1;
			plateau[i][j+2] = 1;
			plateau[i-1][j+2] = 1;
			tabImg[0] = createCase(i,j,4);
			tabImg[1] = createCase(i,j+1,4);
			tabImg[2] = createCase(i,j+2,4);
			tabImg[3] = createCase(i-1,j+2,4);
			piece = 4;
			rotation = 1;
			return true; // on retourne vrai si on a réussi à créer la pièce
		}
		else {
			return false; // on retourne faux si au moins une des cases était déjà occupée
		}
        break;
        
    case 5: //la pièce est de type S
        if (estVide(i,j) && estVide(i, j+1) && estVide(i-1, j+1) && estVide(i+1, j)) {
			//on test si toutes les cases nécéssaires à la création de la pièce sont vide

			plateau[i][j] = 1;
			plateau[i][j+1] = 1;
			plateau[i-1][j+1] = 1;
			plateau[i+1][j] = 1;
			tabImg[0] = createCase(i,j,5);
			tabImg[1] = createCase(i,j+1,5);
			tabImg[2] = createCase(i-1,j+1,5);
			tabImg[3] = createCase(i+1,j,5);
			piece = 5;
			rotation = 1;
			return true; // on retourne vrai si on a réussi à créer la pièce
		}
		else {
			return false; // on retourne faux si au moins une des cases était déjà occupée
		}
        break;
        
    case 6: //la pièce est de type Z
        if (estVide(i,j) && estVide(i-1, j) && estVide(i, j+1) && estVide(i+1, j+1)) {
			//on test si toutes les cases nécéssaires à la création de la pièce sont vide

			plateau[i][j] = 1;
			plateau[i-1][j] = 1;
			plateau[i][j+1] = 1;
			plateau[i+1][j+1] = 1;
			tabImg[0] = createCase(i,j,6);
			tabImg[1] = createCase(i-1,j,6);
			tabImg[2] = createCase(i,j+1,6);
			tabImg[3] = createCase(i+1,j+1,6);
			piece = 6;
			rotation = 1;
			return true; // on retourne vrai si on a réussi à créer la pièce
		}
		else {
			return false; // on retourne faux si au moins une des cases était déjà occupée
		}
        break;
        
    case 7: //la pièce est de type T
        if (estVide(i,j) && estVide(i+1, j) && estVide(i-1, j) && estVide(i, j+1)) {
			//on test si toutes les cases nécéssaires à la création de la pièce sont vide

			plateau[i][j] = 1;
			plateau[i+1][j] = 1;
			plateau[i-1][j] = 1;
			plateau[i][j+1] = 1;
			tabImg[0] = createCase(i,j,7);
			tabImg[1] = createCase(i+1,j,7);
			tabImg[2] = createCase(i-1,j,7);
			tabImg[3] = createCase(i,j+1,7);
			piece = 7;
			rotation = 1;
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
//fonction qui va lancer la bonne fonction de déplacement selon la touche pressé
var codeTouche = event.keyCode;
       var key = ' ';
       if (codeTouche == 40){
		key = 'down';
		moveDownPiece();
	}
	if (codeTouche == 39){
		key = 'right';
		moveRightPiece();
        }
	if (codeTouche == 37){
		key = 'left';
		moveLeftPiece();

        }
	if (codeTouche == 38){
		key = 'rotate';
		rotate();
        }
	else{
	    key ='undefined';
	}
}

function affichage(){
//fonction qui va faire descendre la piece actuel toutes les 500 millisecondes
	setInterval(function(){
	  if(moveDownPiece()==true){
		if(genererPiece(randomPiece()) == false){
			alert("Perdu!! Voulez-vous rejouer?");
			location.reload();
		}
	  } 

	}, 500);
}

function getPositionString(nbImg){
//Retourne la position de l'image sous la forme "i-j"
	var abs = getPxLeft(nbImg)/24;
	var ord = getPxTop(nbImg)/24;
	var str = abs + "-" + ord;
	return str;
}

function recupImage(axeI, axeJ){
//Retourne l'image avec les coordonnées [axeI, axeJ]
	var img = document.getElementById(axeI+"-"+axeJ);
	return img;
}

function modifyPositionImage(img, axeI, axeJ){
//fonction qui va modifier l'enplacement de l'image img
	img.style.left = axeI*24+"px";
	img.style.top = axeJ*24+"px"
}

function getValeurTab(i, j){
//retourne la valeur de la case plateau[i][j]
	return plateau[i][j];
}

function rotate(){
//va tourner la piece selon le type de piece et son etat de rotation
	var i = getPxLeft(0)/24;
	var j = getPxTop(0)/24;
	switch(piece){
		case 1:
			if(rotation == 1 && i <= 6 && (estVide(i+1, j) && estVide(i+2,j) && estVide(i+3,j))){
				deleteOnes();
				plateau[i][j]=1;
				plateau[i+1][j]=1;
				plateau[i+2][j]=1;
				plateau[i+3][j]=1;
				modifyPositionImage(tabImg[0], i, j);
				modifyPositionImage(tabImg[1], i+1, j);
				modifyPositionImage(tabImg[2], i+2, j);
				modifyPositionImage(tabImg[3], i+3, j);
				rotation = 2;
			} else if (rotation == 2 && j <= 16 && (estVide(i, j+1) && estVide(i,j+2) && estVide(i,j+3))){
				deleteOnes();
				plateau[i][j]=1;
				plateau[i][j+1]=1;
				plateau[i][j+2]=1;
				plateau[i][j+3]=1;
				modifyPositionImage(tabImg[1], i, j+1);
				modifyPositionImage(tabImg[2], i, j+2);
				modifyPositionImage(tabImg[3], i, j+3);
				rotation = 1;
			}
			break;
		case 3:
			if(rotation == 1 && i > 0 && (estVide(i-1, j+2) && estVide(i+1,j+1))){
				deleteOnes();
				plateau[i-1][j+2]=1;
				plateau[i][j+2]=1;
				plateau[i+1][j+2]=1;
				plateau[i+1][j+1]=1;
				modifyPositionImage(tabImg[0], i-1, j+2);
				modifyPositionImage(tabImg[1], i, j+2);
				modifyPositionImage(tabImg[2], i+1, j+2);
				modifyPositionImage(tabImg[3], i+1, j+1);
				rotation = 2;
			} else if(rotation == 2 && j > 1 && (estVide(i+1, j-2) && estVide(i+2,j-2))){
				deleteOnes();
				plateau[i+2][j]=1;
				plateau[i+2][j-1]=1;
				plateau[i+2][j-2]=1;
				plateau[i+1][j-2]=1;
				modifyPositionImage(tabImg[0], i+2, j);
				modifyPositionImage(tabImg[1], i+2, j-1);
				modifyPositionImage(tabImg[2], i+2, j-2);
				modifyPositionImage(tabImg[3], i+1, j-2);
				rotation = 3;
			} else if(rotation = 3 && i > 1 && (estVide(i-2, j-1) && estVide(i-1,j-1) && estVide(i-2,j))){
				deleteOnes();
				plateau[i][j-1]=1;
				plateau[i-1][j-1]=1;
				plateau[i-2][j-1]=1;
				plateau[i-2][j]=1;
				modifyPositionImage(tabImg[0], i, j-1);
				modifyPositionImage(tabImg[1], i-1, j-1);
				modifyPositionImage(tabImg[2], i-2, j-1);
				modifyPositionImage(tabImg[3], i-2, j);
				rotation = 4;
			} else if(rotation = 4 && j > 0 && (estVide(i-1, j-1) && estVide(i-1,j+1) && estVide(i,j+1))){
				deleteOnes();
				plateau[i-1][j-1]=1;
				plateau[i-1][j]=1;
				plateau[i-1][j+1]=1;
				plateau[i][j+1]=1;
				modifyPositionImage(tabImg[0], i-1, j-1);
				modifyPositionImage(tabImg[1], i-1, j);
				modifyPositionImage(tabImg[2], i-1, j+1);
				modifyPositionImage(tabImg[3], i, j+1);
				rotation = 1;
			} 
			break;
		case 4:
			if(rotation == 1 && i > 1 && (estVide(i-2, j+2) && estVide(i-2,j+1))){
				deleteOnes();
				plateau[i][j+2]=1;
				plateau[i-1][j+2]=1;
				plateau[i-2][j+2]=1;
				plateau[i-2][j+1]=1;
				modifyPositionImage(tabImg[0], i, j+2);
				modifyPositionImage(tabImg[1], i-1, j+2);
				modifyPositionImage(tabImg[2], i-2, j+2);
				modifyPositionImage(tabImg[3], i-2, j+1);
				rotation = 2;
			} else if(rotation == 2 && j > 1 && (estVide(i-2, j-2) && estVide(i-1,j-2))){
				deleteOnes();
				plateau[i-2][j]=1;
				plateau[i-2][j-1]=1;
				plateau[i-2][j-2]=1;
				plateau[i-1][j-2]=1;
				modifyPositionImage(tabImg[0], i-2, j);
				modifyPositionImage(tabImg[1], i-2, j-1);
				modifyPositionImage(tabImg[2], i-2, j-2);
				modifyPositionImage(tabImg[3], i-1, j-2);
				rotation = 3;
			} else if(rotation = 3 && i < 18 && (estVide(i+1, j-1) && estVide(i+2,j-1) && estVide(i+2,j))){
				deleteOnes();
				plateau[i][j-1]=1;
				plateau[i+1][j-1]=1;
				plateau[i+2][j-1]=1;
				plateau[i+2][j]=1;
				modifyPositionImage(tabImg[0], i, j-1);
				modifyPositionImage(tabImg[1], i+1, j-1);
				modifyPositionImage(tabImg[2], i+2, j-1);
				modifyPositionImage(tabImg[3], i+2, j);
				rotation = 4;
			} else if(rotation = 4 && j > 0 && (estVide(i+1, j-1) && estVide(i+1,j+1) && estVide(i,j+1))){
				deleteOnes();
				plateau[i+1][j-1]=1;
				plateau[i+1][j]=1;
				plateau[i+1][j+1]=1;
				plateau[i][j+1]=1;
				modifyPositionImage(tabImg[0], i+1, j-1);
				modifyPositionImage(tabImg[1], i+1, j);
				modifyPositionImage(tabImg[2], i+1, j+1);
				modifyPositionImage(tabImg[3], i, j+1);
				rotation = 1;
			} 
			break;
		case 5:
			if(rotation == 1 && j > 0 && (estVide(i-1, j) && estVide(i+1, j+1))){
				deleteOnes();
				plateau[i][j]=1;
				plateau[i+1][j]=1;
				plateau[i+1][j+1]=1;
				plateau[i][j-1]=1;
				modifyPositionImage(tabImg[0], i, j);
				modifyPositionImage(tabImg[1], i+1, j);
				modifyPositionImage(tabImg[2], i+1, j+1);
				modifyPositionImage(tabImg[3], i, j-1);
				rotation = 2;
			} else if(rotation == 2 && i > 0 && (estVide(i, j+1) && estVide(i-1, j+1))){
				deleteOnes();
				plateau[i][j]=1;
				plateau[i][j+1]=1;
				plateau[i-1][j+1]=1;
				plateau[i+1][j]=1;
				modifyPositionImage(tabImg[0], i, j);
				modifyPositionImage(tabImg[1], i, j+1);
				modifyPositionImage(tabImg[2], i-1, j+1);
				modifyPositionImage(tabImg[3], i+1, j);
				rotation = 1;
			}
			break;
		case 6:
			if(rotation == 1 && j > 0 && (estVide(i+1, j) && estVide(i+1, j-1))){
				deleteOnes();
				plateau[i][j]=1;
				plateau[i][j+1]=1;
				plateau[i+1][j]=1;
				plateau[i+1][j-1]=1;
				modifyPositionImage(tabImg[0], i, j);
				modifyPositionImage(tabImg[1], i, j+1);
				modifyPositionImage(tabImg[2], i+1, j);
				modifyPositionImage(tabImg[3], i+1, j-1);
				rotation = 2;
			} else if(rotation == 2 && i > 0 && (estVide(i, j-1) && estVide(i-1, j-1))){
				deleteOnes();
				plateau[i][j]=1;
				plateau[i-1][j]=1;
				plateau[i][j+1]=1;
				plateau[i+1][j+1]=1;
				modifyPositionImage(tabImg[0], i, j);
				modifyPositionImage(tabImg[1], i-1, j);
				modifyPositionImage(tabImg[2], i, j+1);
				modifyPositionImage(tabImg[3], i+1, j+1);
				rotation = 1;
			}
			break;
		case 7:
			if(rotation == 1 && j > 0 && estVide(i, j-1)){
				deleteOnes();
				plateau[i][j]=1;
				plateau[i][j-1]=1;
				plateau[i][j+1]=1;
				plateau[i+1][j]=1;
				modifyPositionImage(tabImg[0], i, j);
				modifyPositionImage(tabImg[1], i, j-1);
				modifyPositionImage(tabImg[2], i, j+1);
				modifyPositionImage(tabImg[3], i+1, j);
				rotation = 2;
			} else if(rotation == 2 && i > 0 && estVide(i-1, j)){
				deleteOnes();
				plateau[i][j]=1;
				plateau[i-1][j]=1;
				plateau[i+1][j]=1;
				plateau[i][j-1]=1;
				modifyPositionImage(tabImg[0], i, j);
				modifyPositionImage(tabImg[1], i-1, j);
				modifyPositionImage(tabImg[2], i+1, j);
				modifyPositionImage(tabImg[3], i, j-1);
				rotation = 3;
			} else if(rotation == 3 && j < 19 && estVide(i, j+1)){
				deleteOnes();
				plateau[i][j]=1;
				plateau[i][j+1]=1;
				plateau[i][j-1]=1;
				plateau[i-1][j]=1;
				modifyPositionImage(tabImg[0], i, j);
				modifyPositionImage(tabImg[1], i, j+1);
				modifyPositionImage(tabImg[2], i, j-1);
				modifyPositionImage(tabImg[3], i-1, j);
				rotation = 4;
			} else if(rotation == 4 && i < 10 && estVide(i+1, j)){
				deleteOnes();
				plateau[i][j]=1;
				plateau[i+1][j]=1;
				plateau[i-1][j]=1;
				plateau[i][j+1]=1;
				modifyPositionImage(tabImg[0], i, j);
				modifyPositionImage(tabImg[1], i+1, j);
				modifyPositionImage(tabImg[2], i-1, j);
				modifyPositionImage(tabImg[3], i, j+1);
				rotation = 1;
			} 
			break;
		default:
			break;
	}
}

function deleteOnes(){
//supprime tout les 1 du plateau
	for(var i = 0; i < 10; i++){
		for(var j = 0; j < 20; j++){
			if(plateau[i][j] == 1){
				plateau[i][j] = 0;
			}
		}
	}
}

function showTableau(){
//affiche toutes les cases du tableau plateau
	var str = "";
	for(var j = 0; j < 20; j++){
		for(var i = 0; i < 10; i++){
			str += plateau[i][j] + " ";
		}
		str +="<br>";
	}
	document.getElementById('score').innerHTML = str;
}


var b = document.body;
//ajout du listener sur le body quand une touche est presé
b.addEventListener('keydown',move);
