// Declaración de variables
let accessToken = ""; // Almacena el token de acceso
const clientID = "e4429e2e217b4c8b8fd6c5e3fae665d3"; // ID de cliente de la aplicación en Spotify
const redirectUrl = "http://localhost:3000/"; // URL de redireccionamiento después de la autorización en Spotify

// Objeto Spotify que contiene métodos para interactuar con la API de Spotify
const Spotify = {
	// Método para obtener el token de acceso
	getAccessToken() {
		// Primero verifica si el token de acceso ya está presente
		if (accessToken) return accessToken;

		// Extrae el token de acceso y el tiempo de expiración de la URL actual
		const tokenInURL = window.location.href.match(/access_token=([^&]*)/);
		const expiryTime = window.location.href.match(/expires_in=([^&]*)/);

		// Segunda verificación para el token de acceso
		if (tokenInURL && expiryTime) {
			// Establece el token de acceso y el tiempo de expiración
			accessToken = tokenInURL[1];
			const expiresIn = Number(expiryTime[1]);

			// Establece el tiempo de expiración del token de acceso
			window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
			// Limpia la URL después de que el token de acceso expire
			window.history.pushState("Access token", null, "/");
			return accessToken;
		}

		// Tercera verificación para el token de acceso si las dos primeras fallan
		const redirect = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUrl}`;
		window.location = redirect; // Redirige al usuario a la página de autorización de Spotify para obtener el token
	},

	// Método para buscar canciones en la API de Spotify
	search(term) {
		accessToken = Spotify.getAccessToken(); // Obtiene el token de acceso
		return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
			method: "GET",
			headers: { Authorization: `Bearer ${accessToken}` }, // Incluye el token de acceso en el encabezado de la solicitud
		})
			.then((response) => response.json()) // Convierte la respuesta a JSON
			.then((jsonResponse) => {
				if (!jsonResponse) {
					console.error("Response error"); // Imprime un mensaje de error si la respuesta es falsa
				}
				// Mapea los datos de las canciones de la respuesta JSON y los devuelve
				return jsonResponse.tracks.items.map((t) => ({
					id: t.id,
					name: t.name,
					artist: t.artists[0].name,
					album: t.album.name,
					uri: t.uri,
				}));
			});
	},

	// Método para guardar una lista de reproducción en la cuenta del usuario en Spotify
	savePlaylist(name, trackUris) {
		if (!name || !trackUris) return; // Verifica que haya un nombre y URI de canciones proporcionados
		const aToken = Spotify.getAccessToken(); // Obtiene el token de acceso
		const header = { Authorization: `Bearer ${aToken}` }; // Encabezado de autorización
		let userId;

		// Obtiene el ID de usuario del usuario autenticado
		return fetch(`https://api.spotify.com/v1/me`, { headers: header })
			.then((response) => response.json()) // Convierte la respuesta a JSON
			.then((jsonResponse) => {
				userId = jsonResponse.id; // Obtiene el ID de usuario
				let playlistId;

				// Crea una nueva lista de reproducción en la cuenta del usuario
				return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
					headers: header,
					method: "post",
					body: JSON.stringify({ name: name }), // Nombre de la lista de reproducción
				})
					.then((response) => response.json()) // Convierte la respuesta a JSON
					.then((jsonResponse) => {
						playlistId = jsonResponse.id; // Obtiene el ID de la nueva lista de reproducción
						// Añade las canciones a la lista de reproducción recién creada
						return fetch(
							`https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
							{
								headers: header,
								method: "post",
								body: JSON.stringify({ uris: trackUris }), // URI de las canciones
							}
						);
					});
			});
	},
};

export { Spotify }; // Exporta el objeto Spotify para su uso en otros archivos
