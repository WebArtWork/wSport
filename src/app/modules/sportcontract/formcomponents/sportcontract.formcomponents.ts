export const sportcontractFormComponents = {
	formId: 'sportcontract',
	title: 'Sportcontract',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill sportcontract title',
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
					value: 'fill sportcontract description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
