export const sportplayerFormComponents = {
	formId: 'sportplayer',
	title: 'Sportplayer',
	components: [
		{
			name: 'Text',
			key: 'name',
			focused: true,
			fields: [
				{
					name: 'Placeholder',
					value: 'fill sportplayer title',
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
					value: 'fill sportplayer description',
				},
				{
					name: 'Label',
					value: 'Description',
				}
			]
		}
	]
}
