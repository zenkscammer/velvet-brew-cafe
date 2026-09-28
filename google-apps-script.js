// Google Apps Script code
// 1. Buka https://script.google.com
// 2. Buat project baru
// 3. Paste semua kode ini
// 4. Simpan nama file: SheetSync
// 5. Deploy -> New deployment -> Web app
// 6. Pilih "Execute as: Me" dan "Who has access: Anyone"
// 7. Copy URL web app dan masukkan ke SHEET_WEBAPP_URL pada index.html dan admin.html

const SPREADSHEET_ID = '1Y0mmJABfTWZhvw5yr_EmiSaLzUV22cLa_37EG1zkzgY';
const SHEET_NAME = 'Reservations';
const HEADERS = ['name', 'phone', 'date', 'time', 'guests', 'occasion', 'notes', 'status', 'createdAt', 'source'];

function getSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const missingHeader = HEADERS.some((header, index) => firstRow[index] !== header);

  if (sheet.getLastRow() === 0 || missingHeader) {
    sheet.clear();
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }

  return sheet;
}

function jsonResponse(payload, statusCode = 200) {
  const output = ContentService.createTextOutput(JSON.stringify(payload));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

function doGet() {
  try {
    const sheet = getSheet();
    const values = sheet.getDataRange().getValues();

    if (values.length < 2) {
      return jsonResponse([]);
    }

    const headers = values[0];
    const rows = values.slice(1).filter(row => row.some(Boolean)).map((row) => {
      const item = {};
      headers.forEach((header, index) => {
        item[header] = row[index] ?? '';
      });
      return item;
    });

    return jsonResponse(rows);
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message }, 500);
  }
}

function doPost(e) {
  try {
    const raw = e && e.postData ? e.postData.contents : '{}';
    const payload = JSON.parse(raw || '{}');

    const sheet = getSheet();
    const row = [
      payload.name || '',
      payload.phone || '',
      payload.date || '',
      payload.time || '',
      payload.guests || '',
      payload.occasion || '',
      payload.notes || '',
      payload.status || 'Pending',
      new Date().toISOString(),
      payload.source || 'website'
    ];

    sheet.appendRow(row);

    return jsonResponse({ ok: true, message: 'Reservasi berhasil disimpan ke Google Sheet.' });
  } catch (error) {
    return jsonResponse({ ok: false, error: error.message }, 500);
  }
}

function doOptions() {
  return jsonResponse({ ok: true });
}
