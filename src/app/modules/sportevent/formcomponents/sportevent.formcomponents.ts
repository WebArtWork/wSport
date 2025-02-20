export const sporteventFormComponents = {
	formId: 'sportevent',
	title: 'Sportevent',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill sportevent title',
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
					value: 'fill sportevent description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
