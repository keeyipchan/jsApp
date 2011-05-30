var stack = new CommandStack([
		{
			name: 'add',

			do: function(data) {
			},

			undo: function(data) {
			}
		}
]);

stack.do('add',
	{
		source: {},
		dest: {x:0, y:0}
	},

	function(error, result) {
		if (error) {
		}
	}
);

stack.prev();
stack.next();

