// les différentes valeures de typesPiece :
/*  1 : barre
 
	*
	*
	*
	* 
*/ 

<<<<<<< HEAD
var j = { size: 3, blocks: [0x44C0, 0x8E00, 0x6440, 0x0E20], color: 'blue'   }; /* 
																					*
																					*
																				  * * 
																				*/ 

var l = { size: 3, blocks: [0x4460, 0x0E80, 0xC440, 0x2E00], color: 'orange' }; /*  
																					*
																					*
																					* *
																				*/ 
																				
var o = { size: 2, blocks: [0xCC00, 0xCC00, 0xCC00, 0xCC00], color: 'yellow' }; /*  
																					* *
																					* *
																				*/ 

var s = { size: 3, blocks: [0x06C0, 0x8C40, 0x6C00, 0x4620], color: 'green'  }; /*  
																					  * *
																					* *
																				*/ 

var t = { size: 3, blocks: [0x0E40, 0x4C40, 0x4E00, 0x4640], color: 'purple' }; /*  
																					* * *
																					  *
																				*/ 

var z = { size: 3, blocks: [0x0C60, 0x4C80, 0xC600, 0x2640], color: 'red'    }; /*  
																					* *
																					  * *
																				*/ 

//size : largeur ou longueur max de la pièce
//blocks : une pièce est constituée de 4 blocs, chaque bloc est défini en hexa
//color : couleur de la pièce



// Pour l'initialisation, gestion des touches , lorsque une touche valide à été pressé, on lance render ( rendu ) et on dit à la "map" quelle touche a été préssé

/* function loaded() 
    {
        console.log("Tetris : fichiers audio chargés.");

        oMap.newGame();

    
         * Gestion des touches directionnelles
         * 
         * @param  {[type]} e [description]
         * @return {[type]}   [description]
         
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
                oMap.keyPress( keys[ e.keyCode ] );
                oGame.render();
            }
        };


        setInterval( oGame.render, 30 );
    };
*/
=======
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
var typePiece = 1; 
function genererPiece(i,j,typePiece);
>>>>>>> 391d959b759cdaca87b4d55f402a7d272151562c
