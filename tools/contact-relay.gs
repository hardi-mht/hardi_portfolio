/**
 * @OnlyCurrentDoc
 *
 * Contact relay — Google Apps Script.
 *
 * The annotation above matters: without it, Apps Script asks for permission to
 * "see, edit, create and delete all your Google Sheets spreadsheets" — every
 * sheet in the account. With it, the grant is limited to the one spreadsheet
 * this script is bound to, which is all it ever touches.
 *
 * The portfolio is a static export, so it has no server of its own. This
 * script is the server: the form POSTs here, and this appends the message to
 * a Google Sheet and pushes it to Telegram.
 *
 * It exists so the Telegram bot token never reaches the browser. Calling the
 * Telegram API straight from the page would work, but the token would sit in
 * the JavaScript bundle for anyone to read, and a leaked bot token lets a
 * stranger post as the bot and read everything it receives. Here the token
 * lives in Script Properties, server-side.
 *
 * ---------------------------------------------------------------------------
 * SETUP
 *
 * 1. Create a Google Sheet. First row, three columns:
 *       Received | Name | Email | Subject | Message
 *
 * 2. Extensions → Apps Script. Replace the contents with this file.
 *
 * 3. Telegram bot:
 *      - message @BotFather, send /newbot, follow the prompts, copy the token
 *      - message your new bot once (a bot cannot open a chat with you)
 *      - open https://api.telegram.org/bot<TOKEN>/getUpdates and copy
 *        result[0].message.chat.id — that is your chat id
 *
 * 4. In Apps Script: Project Settings → Script Properties → add
 *       TELEGRAM_BOT_TOKEN = <the token from BotFather>
 *       TELEGRAM_CHAT_ID   = <your chat id>
 *    Leave both out and the script still writes to the Sheet.
 *
 * 5. Deploy → New deployment → Web app
 *       Execute as:      Me
 *       Who has access:  Anyone
 *    Copy the /exec URL.
 *
 * 6. In the portfolio, set
 *       NEXT_PUBLIC_CONTACT_ENDPOINT=<that /exec URL>
 *    and rebuild. Without it the form falls back to opening a mail client.
 *
 * Re-deploy (not just save) after editing this file, or the live URL keeps
 * running the previous version.
 * ---------------------------------------------------------------------------
 */

const SHEET_NAME = "Messages";

/** Browsers can reach this in a tab to check the deployment is live. */
function doGet() {
  return json({ ok: true, service: "contact-relay" });
}

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");

    // Honeypot: a real person never sees this field, so anything in it is a
    // bot. Answer as though it worked — telling a scraper it failed only
    // invites it to try again differently.
    if (data.company) return json({ ok: true });

    const name = String(data.name || "").trim();
    const email = String(data.email || "").trim();
    const subject = String(data.subject || "").trim();
    const message = String(data.message || "").trim();

    if (!name || !email || !message) {
      return json({ ok: false, error: "Missing required fields" });
    }

    appendToSheet({ name, email, subject, message });
    notifyTelegram({ name, email, subject, message });

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  }
}

function appendToSheet(msg) {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
  sheet.appendRow([
    new Date(),
    msg.name,
    msg.email,
    msg.subject || "(no subject)",
    msg.message,
  ]);
}

function notifyTelegram(msg) {
  const props = PropertiesService.getScriptProperties();
  const token = props.getProperty("TELEGRAM_BOT_TOKEN");
  const chatId = props.getProperty("TELEGRAM_CHAT_ID");

  // Telegram is optional. With no credentials the Sheet is still the record.
  if (!token || !chatId) return;

  const text = [
    "<b>New message from your portfolio</b>",
    "",
    "<b>From:</b> " + escapeHtml(msg.name),
    "<b>Email:</b> " + escapeHtml(msg.email),
    "<b>Subject:</b> " + escapeHtml(msg.subject || "(no subject)"),
    "",
    escapeHtml(msg.message),
  ].join("\n");

  UrlFetchApp.fetch("https://api.telegram.org/bot" + token + "/sendMessage", {
    method: "post",
    contentType: "application/json",
    payload: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: "HTML",
      disable_web_page_preview: true,
    }),
    // A Telegram outage must not lose the message: the Sheet row is already
    // written, and throwing here would return an error to a visitor whose
    // message did in fact arrive.
    muteHttpExceptions: true,
  });
}

/** Visitor-supplied text goes into an HTML-parsed Telegram message. */
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function json(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
