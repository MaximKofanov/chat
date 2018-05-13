var app = {};
// модель
app.Message = Backbone.Model.extend({
	defaults: {
		message: ''
	}
});
//Коллекция
app.AllMessage = Backbone.Collection.extend({
	model: app.Message
});

var allMessage = new app.AllMessage;

//Вид чата
app.ViewChat = Backbone.View.extend({
	events: {
		'click #send': 'addMessage'
	},
	initialize: function(){
		//Инициализируем шаблон
		this.template = _.template($('#template').html());
		//Добавляем
		this.$el.html(this.template());
		//Слушаем добавление
		this.listenTo(allMessage, 'add', this.addNewMessage);
	},
	addMessage: function(){
		allMessage.add({
			message: $('#chatField').text()
		});
	},
	addNewMessage: function(model){
		var message = new app.ViewMessage({ model: model });
		this.$('#chatWindow').prepend(message.render());
	}
});
//Вид сообщения
app.ViewMessage = Backbone.View.extend({
	initialize: function(){
		this.listenTo(this.model, 'change', this.render);
	},
	template: _.template($('#templateMessage').html()),
	render: function(){
		this.$el.html(this.template(this.model.toJSON()));
		// console.log(this.$el['0'].innerHTML);
		return this.$el;
	}
});


var b = new app.ViewChat({
	el: '#chatWrapper'
});
