import { v4 } from "uuid"
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"
import './style.css'

const taskForm = document.querySelector<HTMLFormElement>("#task-form")!
const tasksList = document.querySelector<HTMLDivElement>("#tasks-list")!

interface Task {
	title: string,
	description: string,
	id: string
}

let tasks: Task[] = []

taskForm.addEventListener("submit", event => {
	event.preventDefault()

	const title = taskForm["title"] as unknown as HTMLInputElement
	const description = taskForm["description"] as unknown as HTMLTextAreaElement

	tasks.push({
		title: title.value,
		description: description.value,
		id: v4()
	})

	localStorage.setItem("tasks", JSON.stringify(tasks))
	Toastify({
		text: "Task added",
	}).showToast()

	taskForm.reset()
	title.focus()
	renderTasks(tasks)
})

document.addEventListener("DOMContentLoaded", () => {
	tasks = JSON.parse(localStorage.getItem("tasks") || "[]")
	renderTasks(tasks)
})

function renderTasks(tasks: Task[]) {
	tasksList.innerHTML = ""

	tasks.forEach(task => {
		const taskElement = document.createElement("div")
		taskElement.className = "bg-zinc-900 p-4 rounded-md hover:bg-zinc-700 hover:cursor-pointer relative"

		const header = document.createElement("header")
		const title = document.createElement("span")
		const description = document.createElement("p")
		const btnDelete = document.createElement("button")
		btnDelete.className = "bg-red-500 hover:bg-red-800 hover:border-red-800 px-1 py-0 text-xs absolute right-1 top-1"

		title.textContent = task.title
		description.textContent = task.description
		btnDelete.textContent = "Del"
		btnDelete.addEventListener("click", () => {
			const index = tasks.findIndex(t => t.id === task.id)
			tasks.splice(index, 1)

			localStorage.setItem("tasks", JSON.stringify(tasks))
			Toastify({
				text: "Task deleted",
				backgroundColor: "red"
			}).showToast()
			renderTasks(tasks)
		})

		header.append(title)
		header.append(btnDelete)
		taskElement.append(header)
		taskElement.append(description)
		tasksList.append(taskElement)
	})
}