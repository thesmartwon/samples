import { join } from 'node:path';
import { readdirSync, statSync, writeFileSync  } from 'node:fs';

const stripExt = f => f.replace(/\..*/, '');
const isSound = f => ['ogg', 'm4a', 'wav'].some(ext => f.endsWith(ext));

const index = {
	'percussion': {
		// folder: [files without ext],
	},
	'strings': {
	}
};

Object.keys(index).forEach(folder => {
	readdirSync(folder).forEach(p => {
		const subFolder = join(folder, p);
		if (statSync(subFolder).isDirectory()) {
			index[folder][p] = readdirSync(subFolder).filter(isSound).map(stripExt);
		}
	});
});

writeFileSync('index.json', JSON.stringify(index, null, 2));
