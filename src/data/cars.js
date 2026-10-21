/**
 * Завдання «Машини та марки».
 * wiki  — назва статті англійської Вікіпедії: з неї автоматично береться головне фото
 *         (Wikimedia Commons, вільна ліцензія).
 * photo — (необов'язково) власне фото: файл у public/photos/ (наприклад 'photos/toyota.jpg') або URL.
 *         Якщо задано — Вікіпедія не використовується, і фото працює без інтернету.
 * credit — (необов'язково) посилання на автора власного фото.
 * @type {import('../types.js').Car[]}
 */
export const CARS = [
  { id: 'toyota',   brand: 'Toyota',        model: 'Corolla',         wiki: 'Toyota_Corolla',        country: 'Японія',    fact: 'Corolla — одна з найпопулярніших машин у світі.' },
  { id: 'vw',       brand: 'Volkswagen',    model: 'Beetle («Жук»)',  wiki: 'Volkswagen_Beetle',     country: 'Німеччина', fact: 'Цю машину прозвали «Жуком» через круглу форму.' },
  { id: 'tesla',    brand: 'Tesla',         model: 'Model 3',         wiki: 'Tesla_Model_3',         country: 'США',       fact: 'Це електромобіль: він їздить на батареї, а не на бензині.' },
  { id: 'ford',     brand: 'Ford',          model: 'Mustang',         wiki: 'Ford_Mustang',          country: 'США',       fact: 'На емблемі Mustang — кінь, що мчить галопом.' },
  { id: 'fiat',     brand: 'Fiat',          model: '500',             wiki: 'Fiat_500_(2007)',       country: 'Італія',    fact: 'Маленька міська машинка — її легко паркувати.' },
  { id: 'skoda',    brand: 'Škoda',         model: 'Octavia',         wiki: 'Škoda_Octavia',         country: 'Чехія',     fact: 'Škoda — одна з найстаріших автомобільних марок.' },
  { id: 'mercedes', brand: 'Mercedes-Benz', model: 'G-Class',         wiki: 'Mercedes-Benz_G-Class', country: 'Німеччина', fact: 'Цей позашляховик схожий на коробку і їздить бездоріжжям.' },
  { id: 'bmw',      brand: 'BMW',           model: '3 Series',        wiki: 'BMW_3_Series',          country: 'Німеччина', fact: 'BMW означає «Баварські моторні заводи».' }
];
