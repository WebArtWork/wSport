export const sportmatchFormComponents = {
	formId: 'sportmatch',
	title: 'Sportmatch',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill sportmatch title',
				},
				{
					name: 'Label',
					value: 'Title',
				}
			]
		},
		{
			name: 'Text',
			key: 'description',
			fields: [
				{
					name: 'Placeholder',
					value: 'fill sportmatch description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
