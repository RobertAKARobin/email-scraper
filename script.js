document.addEventListener('DOMContentLoaded', ()=>{
	const uploader = document.getElementById('uploader')

	uploader.addEventListener('input', (event)=>{
		const file = uploader.files[0]
		if(file){
			const tempUrl = URL.createObjectURL(uploader.files[0])
			fetch(tempUrl).then(async (res)=>{
				const response = res.clone()
				const text = await response.text()
				debugger
			})
		}
	})
})
