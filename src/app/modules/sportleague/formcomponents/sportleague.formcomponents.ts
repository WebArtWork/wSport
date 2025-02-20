export const sportleagueFormComponents = {
	formId: 'sportleague',
	title: 'Sportleague',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill sportleague title',
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
					value: 'fill sportleague description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
