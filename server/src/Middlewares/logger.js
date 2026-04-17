const logRequest = (req, res, next) => {
	const timestamp = new Date().toISOString();
	const method = req.method;
	const url = req.originalUrl;
	const ip = req.headers['cf-real-ip'] || req.headers['cf-connecting-ip'] || req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'Unknown';
	const userAgent = req.headers['user-agent'] || 'Unknown';
	const referer = req.headers['referer'] || 'Unknown';
	const contentType = req.headers['content-type'] || 'Unknown';
	const contentLength = req.headers['content-length'] || 'Unknown';

	console.log(`[${timestamp}] [${method}] ${url} \nIP: ${ip} \nUser-Agent: ${userAgent}\nReferer: ${referer}\nContent-Type: ${contentType}\nContent-Length: ${contentLength}\n--------------------------------------------------`);

	next();
}

export default logRequest;