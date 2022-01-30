/*

Critères d'évaluation :
- Capacité à résoudre un problème donné
- Voir ce que le candidat peut réaliser en plus de l'énoncé demandé (amélioration du code, lisibilité, gestion des erreurs, etc.)

######################################################################
# AUCUNE LIBRAIRIE EXTERNE NE DOIT ETRE UTILISÉ (pas de JQuery, etc) #
######################################################################

[
  [A, B, C],
  [A, [B, C, A], C],
  [[A, B, C], B, C],
  [C, A, [B, C, A]],
  [[A, B, [C, B, A]], B, C]
  [[A1, 1B, [C, B, A]], B, C]
]

*/

var tab = new Array(
  new Array("A", "B", "C"),
  new Array("A", new Array("B", "C", "A"), "C"),
  new Array(new Array("A", "B", "C"), "B", "C"),
  new Array("C", "A", new Array("B", "C", "A")),
  new Array(new Array("A", "B", new Array("C", "B", "A")), "B", "C"),
  new Array(new Array("A1", "1B", new Array("C", "B", "A")), "B", "C",)
);

//1/ Parcourir le tableau tab ci-dessus et trouver le nombre total de "A" présent
function findA(tab) {
  if (!tab || !Array.isArray(tab)) {
    return "Please Put a Valid Array"
  }
  var mix = [];
  var indices = [];

  mix = tab.join().split(',');
  var idx = mix.indexOf('A');
while (idx != -1) {
  indices.push(idx);
  idx = mix.indexOf('A', idx + 1);
}
return(indices.length);
}

//2/ En adaptant la fonction findA, créer une fonction find, prenant en paramètre un tableau (argument obligatoire) et un second argument (string, non obligatoire)
//si le second argument est renseigné, afficher le nombre d'occurence dans le tableau,
//sinon retourner les différentes occurences du tableau ainsi que le nombre de chaque occurence
//BONUS : la fonction find doit fonctionner avec un tableau peu importe sa dimension
function find(tab, toCompare) {
  if (!tab || !Array.isArray(tab)) {
    return "Please Put a Valid Array"
  }
  var mix = [];
  var indices = [];
  var result = []
  var uniq = []

  mix = tab.join().split(',');
  uniq = [...new Set(mix)];
  if (toCompare === undefined) { 
    for (let index = 0; index < uniq.length; index++) {
      const element = uniq[index];
      var idx = mix.indexOf(element);
      while (idx != -1) {
        indices.push(idx);
        idx = mix.indexOf(element, idx + 1);
      }
      result.push({element, occurence: indices.length})
      indices= []
    }
  }
  else{
      var idx = mix.indexOf(toCompare);
      while (idx != -1) {
        indices.push(idx);
        idx = mix.indexOf(toCompare, idx + 1);
      }
      result = ({element : toCompare, occurence: indices.length})
      indices= []
  }
  return(result)
}

//3/ Sans supprimer la fonction find() précédente, réécriver celle-ci avec le moins de caractère possible
function findOptimize(tab, toCompare) {
  if (!tab || !Array.isArray(tab)) {
    return "Please Put a Valid Array"
  }
  var mix = tab.join().split(',')
  var result = []
  var uniq = [...new Set(mix)]

  function findOccurence(toCompare) {
    var indices = []
    var idx = mix.indexOf(toCompare);
      while (idx != -1) {
        indices.push(idx);
        idx = mix.indexOf(toCompare, idx + 1);
      }
      return {element : toCompare, occurence: indices.length}
  }

  if (toCompare) {
    result.push(findOccurence(toCompare))
  }
  else{
    uniq.forEach((element) => {
      result.push(findOccurence(element))
    });
  }
  return result
}

//Test à exécuter :
console.log(findA(tab));
console.log(find(tab));
console.log(find(tab, 'B'));
console.log(find(tab, 'A1'));
console.log(findOptimize([]));
console.log(findOptimize(tab, 'A'));

//code strong !
//à retourner par email à support@squirrel.fr
//Merci d'indiquer le temps nécessaire à la réalisation de ce test : approx 2h 0min
