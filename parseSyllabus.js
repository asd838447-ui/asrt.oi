const fs = require('fs');
const path = require('path');

const csvPath = 'C:/Users/asd83/Desktop/Convert/КТП_Химия_7-11класс_ЕНТ_Год.csv';
if (!fs.existsSync(csvPath)) {
  console.error('CSV file not found at: ' + csvPath);
  process.exit(1);
}

const csvContent = fs.readFileSync(csvPath, 'utf-8');

function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        current += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      result.push(current.trim());
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current.trim());
  return result;
}

const lines = csvContent.split(/\r?\n/).filter(line => line.trim().length > 0);
const lessons = [];

for (let i = 0; i < lines.length; i++) {
  const row = parseCSVLine(lines[i]);
  if (row.length < 5) continue;
  const idStr = row[0];
  const id = parseInt(idStr, 10);
  if (isNaN(id)) continue; 

  const title = row[1];
  const reference = row[2];
  const hours = parseInt(row[3], 10) || 1;
  const weekDay = row[4];
  const content = row[5] || '';

  // Map textbook
  let textbookPdf = '';
  if (reference.includes('Химия 7 кл')) {
    textbookPdf = 'Химия_7класс_Мектеп_Оспанова.pdf';
  } else if (reference.includes('Химия 8 кл')) {
    textbookPdf = 'Химия_8класс_Атамура_Усманова.pdf';
  } else if (reference.includes('Химия 9 кл')) {
    textbookPdf = 'Химия_9класс_Атамура.pdf';
  } else if (reference.includes('Химия 10 кл')) {
    textbookPdf = 'himiya_ospanova_mk_chast_1_10.pdf';
  } else if (reference.includes('Химия 11 кл')) {
    textbookPdf = 'himiya_ospanova_mk_chast_2_10.pdf';
  } else {
    if (reference.includes('7 кл') || reference.includes('7класс')) textbookPdf = 'Химия_7класс_Мектеп_Оспанова.pdf';
    else if (reference.includes('8 кл') || reference.includes('8класс')) textbookPdf = 'Химия_8класс_Атамура_Усманова.pdf';
    else if (reference.includes('9 кл') || reference.includes('9класс')) textbookPdf = 'Химия_9класс_Атамура.pdf';
    else if (reference.includes('10 кл') || reference.includes('10класс')) textbookPdf = 'himiya_ospanova_mk_chast_1_10.pdf';
    else if (reference.includes('11 кл') || reference.includes('11класс')) textbookPdf = 'himiya_ospanova_mk_chast_2_10.pdf';
  }

  // Set default video for Lesson 1, empty for others
  let videoUrl = '';
  if (id === 1) {
    videoUrl = 'C:\\Users\\asd83\\Downloads\\Основы_химии.mp4';
  }

  lessons.push({
    id,
    title,
    hours,
    weekDay,
    content,
    videoUrl,
    textbookPdf,
    isUnlocked: true // All lessons unlocked by default as requested!
  });
}

// Inject the human textbook content for Lesson 1 from the Google Doc text we found
if (lessons.length > 0 && lessons[0].id === 1) {
  lessons[0].content = `Глава I. Введение в химию. Чистые вещества и смеси (§1–3)
- Определение: Химия — это наука о веществах, их свойствах и превращениях в другие вещества.
- Физическое тело vs Вещество: Физическое тело (например, гвоздь или айсберг) состоит из определенного вещества (железо или вода).
- Свойства: Каждое вещество обладает индивидуальными свойствами (агрегатное состояние, плотность, цвет, запах, температуры кипения/плавления, электро- и теплопроводность, растворимость).
- Смеси:
  * Гетерогенные (неоднородные): частицы разделены видимыми границами.
  * Гомогенные (однородные): частицы нельзя увидеть.
- Методы разделения:
  * Фильтрование и отстаивание — для разделения гетерогенных смесей (жидкость + нерастворимое твердое вещество).
  * Действие магнитом — если один из компонентов обладает магнитными свойствами (например, разделение смеси порошков железа и серы).
  * Выпаривание и кристаллизация — для выделения растворенного твердого вещества из гомогенного раствора.
  * Дистилляция (перегонка) — разделение жидких гомогенных смесей с разными температурами кипения.
- В ЕНТ: Вопросы часто проверяют отличие физического тела от вещества или выбор правильного метода разделения смеси (например, фракционная перегонка нефти или отделение железа магнитом).

Глава II. Изменения состояния веществ (§4, §6)
- Физические явления: изменяется агрегатное состояние или форма, но новые вещества не образуются (испарение воды, плавление льда, ковка металла).
- Химические явления (реакции): разрушаются старые и образуются новые вещества (горение, гниение, ржавление).
- Признаки химических реакций: выделение газа, изменение окраски, образование осадка, выделение/поглощение тепла и света.
- В ЕНТ: Классификация явлений (например, скисание молока, таяние снега, горение дров). Любые фазовые переходы на графиках нагревания — это физические явления.

Глава III. Атомы. Молекулы. Вещества (§7–9)
- Простые вещества: образованы атомами одного химического элемента (двухатомные молекулы: H2, N2, O2, F2, Cl2, Br_2, I2).
- Сложные вещества: образованы атомами разных элементов (H2O, NH3, CH4, CO2).
- Строение атома: Ядро (протоны p+ и нейтроны n0) + электронная оболочка (e-).
  * Число протонов = Число электронов = Порядковый номер элемента (Z).
  * Число нейтронов (N) = Ar - Z.
- Изотопы: разновидности атомов одного элемента с одинаковым числом протонов, но разным числом нейтронов (например, протий 1H, дейтерий 2H, тритий 3H).
- В ЕНТ: Вычисление числа суб-атомных частиц (нейтронов/электронов) для атомов или ионов (например, нейтроны хлора-37: 37 - 17 = 20).

Глава IV. Воздух. Реакция горения (§10–12)
- Состав воздуха (по объему): Азот N2 (78.08%), Кислород O2 (20.95% ~ 21%), благородные газы (0.94%), углекисмый газ CO2 (0.03%).
- Состав воздуха (по массе): Кислород (~23.10%), Азот (~75.50%).
- Горение: реакция взаимодействия с кислородом с выделением тепла и света (всегда образуются оксиды). Неполное сгорание может давать угарный газ CO или сажу.
- В ЕНТ: Определение долей газов в воздухе по объёму или массе. Горение служит основой для стехиометрических задач.`;
}

const outContent = `export const lessonsData = ${JSON.stringify(lessons, null, 2)};`;
fs.writeFileSync('src/lessonsData.js', outContent, 'utf-8');
console.log('Successfully generated src/lessonsData.js with ' + lessons.length + ' lessons.');
