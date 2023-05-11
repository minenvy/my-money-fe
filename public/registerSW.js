if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('http://127.0.0.1:3000/sw.js').catch(() => {
		console.log('Error in register worker!')
	})
}
