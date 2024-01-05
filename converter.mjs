import { join } from 'node:path';
import { readFileSync  } from 'node:fs';

const index = JSON.parse(readFileSync('./index.json'));

Object.entries(index).forEach(([category, instruments]) => {
	Object.entries(instruments).forEach(([instrument, files]) => {
		files.forEach(f => {
			const ogg = join(category, instrument, f + '.ogg');
			console.log(ogg);
		});
	});
});
