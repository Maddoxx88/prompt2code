<script>
	import { tick } from 'svelte';
	import { params } from '../stores/params';

	let paramsList;

	// count.subscribe(value => {
	// 	countValue = value;
	// });

	let text = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularized in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

	async function handleKeydown(event) {
		if (event.key !== 'Tab') return;

		let userParamName = '';
		event.preventDefault();

		let paramName = prompt('Please enter name of the parameter:', '');
		let paramType = prompt('Please enter data type of the parameter: (string, list, number, object)', '');

		$params = [...$params, {
			id: $params.length + 1,
			name: paramName ?? '',
			type: paramType ?? ''
		}];

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

<ul>
	{#each $params as prm (prm.id) }
	<li>{prm.name} - {prm.type}</li>
{/each}
	
</ul>

<style>
	textarea {
		width: 75%;
		height: 200px;
		font-size: 18px;
	}
</style>
