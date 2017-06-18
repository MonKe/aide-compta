// lib: import pensé pour artidevis
const

  parse = string =>
    string
      .trim().split('\n').filter(row => !!row)
      .map(row => row.trim().split(',')),

  makeRegular = raw => raw.length ?
    [raw[0], ...addCol(raw[0][4], 4, raw.slice(1))] : [],

  addCol = (content, pos, rows) =>
    rows.map(row =>
      [...row.slice(0, pos), content, ...row.slice(pos)]
    ),

  transform = table =>
    table.map((row, i) => [
      parseDate(row[1], 'm'),
      parseDate(row[1], 'dmy'),
      'VE',
      row[2],
      row[6],
      row[4],
      row[5],
      row[7],
      i ? 'C' : 'D',
      parseDate(row[9], 'd/m/cy')
    ]),

  // from cymd format to custom format
  parseDate = (string, format) =>
    string.split(/(.{2})/).filter(n => !!n).reduce((acc, x, i) =>
      acc.replace(['c', 'y', 'm', 'd'][i], x),
      format
    ),

  toCSV = table =>
    table.map(row => row.join(',') + ',').join('\n'),

  process = string => toCSV(transform(makeRegular(parse(string))))

// init
let
  csvInput = document.getElementById('csv-input'),
  csvOutput = document.getElementById('csv-output'),
  transformBtn = document.getElementById('csv-transform')

transformBtn.addEventListener('click', _ => {
  csvOutput.value = process(csvInput.value)
  csvOutput.focus()
})
