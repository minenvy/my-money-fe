if ('serviceWorker' in navigator) {
	navigator.serviceWorker.register('/sw.js').catch(() => {
		console.log('Error in register worker!')
	})
}
