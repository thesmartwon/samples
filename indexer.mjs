import { join } from 'node:path';
import { readdirSync, statSync, writeFileSync  } from 'node:fs';

const stripExt = f => f.replace(/\..*/, '');

const index = {
	'percussion': {
		// folder: [files without ext],
	},
	'strings': {
		'splendid-grand-piano': readdirSync('./strings/splendid-grand-piano').map(stripExt),
	}
};

readdirSync('percussion').forEach(p => {
	const maybeFolder = join('percussion', p);
	if (statSync(maybeFolder).isDirectory()) {
		index.percussion[p] = readdirSync(maybeFolder).map(stripExt);
	}
});


// categories.forEach(c => {
// 	const files = readdirSync(c);
// 	index[categories] =
// }

writeFileSync('index.json', JSON.stringify(index, null, 2));
