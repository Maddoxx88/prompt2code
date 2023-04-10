<script>
	import { tick } from 'svelte';

	let text = `Select some text and hit the tab key to toggle uppercase`;

	async function handleKeydown(event) {
		if (event.key !== 'Tab') return;

		let userParamName = '';
		event.preventDefault();

		let paramName = prompt('Please enter your name:', 'Harry Potter');
		if (paramName == null || paramName == '') {
			userParamName = 'defaultParam';
		} else {
			userParamName = paramName;
		}

		const { selectionStart, selectionEnd, value } = this;
		const selection = value.slice(selectionStart, selectionEnd);

		console.log(selection);

		const replacement = /[a-z]/.test(selection)
			? '${' + userParamName + '}'
			: selection.toLowerCase();

		text = value.slice(0, selectionStart) + replacement + value.slice(selectionEnd);

		await tick();
		this.selectionStart = selectionStart;
		this.selectionEnd = selectionEnd;
	}
</script>

<textarea value={text} on:keydown={handleKeydown} />

<style>
	textarea {
		width: 100%;
		height: 200px;
	}
</style>
