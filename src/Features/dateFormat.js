/**
 * Fonction qui formate une date au format MM/JJ/AAAA.
 * @param {Date | string} dateInput - La date à formater 
 * @returns {string} La date formatée.
 */
export default function dateFormat(dateInput) {
  /**
   * Fonction interne pour formater un nombre avec un zéro en préfixe si nécessaire.
   * @param {number} num - Le nombre à formater.
   * @returns {string} Le nombre formaté.
   */
  function formatNumberWithZero(num) {
    return num < 10 ? `0${num}` : `${num}`;
  }

  // Création d'une instance de Date à partir de la date d'entrée
  const date = new Date(dateInput);

  // Récupération du jour, ajout du zéro si nécessaire
  const day = formatNumberWithZero(date.getDate());

  // Récupération du mois, ajout du zéro si nécessaire (les mois commencent à 0, donc on ajoute 1)
  const month = formatNumberWithZero(date.getMonth() + 1);

  // Récupération de l'année
  const year = date.getFullYear();

  // Construction de la date formatée au format MM/JJ/AAAA
  const formattedDate = `${month}/${day}/${year}`;

  // Retourne la date formatée
  return formattedDate;
}
