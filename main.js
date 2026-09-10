'use strict';

const { Plugin } = require('obsidian');

const pad = (n) => (n < 10 ? '0' : '') + n;

module.exports = class TimestampEntry extends Plugin {
	onload() {
		this.addCommand({
			id: 'insert',
			name: 'Insert timestamp entry',
			editorCallback: (editor) => insertTimestamp(editor),
		});
	}
};

// The line an entry belongs on: blank, and exactly one blank line below the
// last line of content above the cursor. Creates the lines it needs; never
// removes anything.
function entryLine(editor) {
	const from = editor.getCursor();

	let anchor = -1;
	for (let i = from.line; i >= 0; i--) {
		if (editor.getLine(i).trim() !== '') {
			anchor = i;
			break;
		}
	}
	if (anchor === -1) return 0; // no content above the cursor — the top line is the place

	const last = editor.lastLine();
	const start = anchor + 1;

	let blanks = 0;
	while (start + blanks <= last && editor.getLine(start + blanks).trim() === '') blanks++;
	const contentBelow = start + blanks <= last;

	// A blank line above the entry, plus one below it when the entry is being
	// wedged in above existing content.
	const needed = contentBelow ? 3 : 2;
	if (blanks < needed) {
		const at = contentBelow
			? { line: start, ch: 0 }
			: { line: last, ch: editor.getLine(last).length };
		editor.replaceRange('\n'.repeat(needed - blanks), at);
	}
	return start + 1;
}

function insertTimestamp(editor) {
	const line = entryLine(editor);
	const now = new Date();
	const stamp = `**${pad(now.getHours())}:${pad(now.getMinutes())}** — `;

	// The target line is blank, but may hold stray whitespace — replace it whole.
	editor.replaceRange(stamp, { line, ch: 0 }, { line, ch: editor.getLine(line).length });

	const cursor = { line, ch: stamp.length };
	editor.focus(); // keeps the mobile keyboard up when the command is fired from the toolbar
	editor.setCursor(cursor);
	editor.scrollIntoView({ from: cursor, to: cursor }, true);
}
