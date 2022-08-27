import './style.css'

const taskForm = document.querySelector<HTMLFormElement>("#task-form")!

taskForm.addEventListener("submit", event => {
	event.preventDefault()

	const title = taskForm["title"] as unknown as HTMLInputElement
	const description = taskForm["description"] as unknown as HTMLTextAreaElement

	console.log(title.value)
	console.log(description.value)
})