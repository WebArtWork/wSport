export const sportactivityFormComponents = {
	formId: 'sportactivity',
	title: 'Sportactivity',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill sportactivity title',
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
					value: 'fill sportactivity description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
