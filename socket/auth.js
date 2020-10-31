const { OAuth2Client } = require('google-auth-library');
const googleClient = new OAuth2Client(process.env.CLIENTID);

module.exports = async (socket, next) => {
	const ticket = await googleClient
		.verifyIdToken({
			idToken: socket.handshake.query.token,
			audience: process.env.CLIENTID
		})
		.catch((err) => {
			socket.disconnect();
		});
	const payload = ticket.getPayload();
	console.log(payload.email)
	socket.disconnect();
	next();
};
