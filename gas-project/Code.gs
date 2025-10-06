/**
 * Smart Chart Co-Pilot - Main Server-Side Code
 * @version 0.1.0
 */

/**
 * Runs when the add-on is installed or when a presentation is opened
 */
function onOpen() {
  const ui = SlidesApp.getUi();
  ui.createMenu('Smart Chart Co-Pilot')
    .addItem('Open', 'showSidebar')
    .addToUi();
}

/**
 * Opens the sidebar
 */
function showSidebar() {
  const html = HtmlService.createHtmlOutputFromFile('Sidebar')
    .setTitle('Smart Chart Co-Pilot')
    .setWidth(350);

  SlidesApp.getUi().showSidebar(html);
}

/**
 * Gets OAuth token for Google Picker API
 * @return {string} OAuth token
 */
function getOAuthToken() {
  return ScriptApp.getOAuthToken();
}

/**
 * Imports data from Google Sheets
 * @param {string} fileId - Google Sheets file ID
 * @param {string} range - Range in A1 notation (e.g., "Sheet1!A1:D10")
 * @return {Object} Data object with headers and rows
 */
function importFromSheets(fileId, range) {
  try {
    const spreadsheet = SpreadsheetApp.openById(fileId);
    const data = spreadsheet.getRange(range).getValues();

    if (data.length === 0) {
      throw new Error('No data found in the specified range');
    }

    return {
      success: true,
      data: data,
      headers: data[0],
      rows: data.slice(1)
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Test function - returns "Hello World"
 */
function test() {
  return { status: 'ok', message: 'Apps Script is working!' };
}
