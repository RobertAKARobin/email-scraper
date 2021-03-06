document.addEventListener('DOMContentLoaded', ()=>{
	const uploader = document.getElementById('uploader')
	const output = document.getElementById('output')
	const emailMatcher = /[a-z0-9_-]+(?:\.[a-z0-9_-]+)*@[a-z0-9_-]+(?:\.[a-z0-9]+)+/
	const emailFinder = new RegExp(`(?:OPFContactEmailAddressAddress="|mailto:)(${emailMatcher.source})`, 'gi')

	uploader.addEventListener('change', (event)=>{
		try{
			handleUpload()
		}catch(error){
			output.value = `Error: ${error.message}`
		}
	})

	function handleUpload(){
		const file = uploader.files[0]
		if (file) {
			const tempUrl = URL.createObjectURL(uploader.files[0])
			fetch(tempUrl).then(async (res) => {
				const response = res.clone()
				const text = await response.text()
				const emails = {}
				text.replace(emailFinder, (nil, email)=>{
					emails[email] = 1
				})
				const result = Object.keys(emails).sort((a,b)=>{
					return a.toLowerCase().localeCompare(b.toLowerCase())
				})
				output.value = result.join('\n')
			})
		}
	}
})
