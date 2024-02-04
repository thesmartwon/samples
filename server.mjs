import http from "node:http";
import path from 'node:path';
import fs from 'node:fs';

const port = process.argv[2] || 8888;

function requestHandler(request, response) {
	const uri = decodeURIComponent(request.url);
	let filename = path.join(process.cwd(), uri);

	var contentTypesByExtension = {
		'.html': 'text/html',
		'.css':  'text/css',
		'.js':   'text/javascript',
		'.ogg': 'audio/ogg',
	};

	const exists = fs.existsSync(filename);
	if (!exists) {
		response.writeHead(404, {'Content-Type': 'text/plain'});
		response.write('404 Not Found\n');
		response.end();
		return;
	}

	if (fs.statSync(filename).isDirectory()) filename += 'index.html';

	try {
		const file = fs.readFileSync(filename);
		const headers = {
			'access-control-allow-origin': '*',
		};
		const contentType = contentTypesByExtension[path.extname(filename)];
		if (contentType) headers['Content-Type'] = contentType;
		response.writeHead(200, headers);
		response.write(file, 'binary');
		response.end();
	} catch (err) {
		response.writeHead(500, {'Content-Type': 'text/plain'});
		response.write(err + '\n');
		response.end();
	}
}

http.createServer(requestHandler).listen(parseInt(port, 10));
console.log(`listening on http://localhost:${port}`);
