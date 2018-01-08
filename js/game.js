window.addEvent('domready', function(){
    //new Welcome();
    new Genius();
});

Welcome = new Class({
    Implements: Options,
    options: {

    },

    initialize: function(options) {
        this.setOptions(options);
    },

    setElements: function(){
        new Element('h2')
    }
});

Genius = new Class({

    Implements: Options,
    options: {

    },

    initialize: function(options){
        this.setOptions(options);
        this.setElements();
        this.random();
        this.press();
        this.round = 0;
        this.currentSequencia = [];
        this.randomSequence = [];
    },

    random: function(){
        this.math = parseInt(Math.random() * 10);
        $$('.math').set('value', this.math);
    },

    sequence: function(current, random){
        this.random();
        this.round++;
        this.currentSequencia.push(current);
        this.randomSequence.push(random);
    },

    clear: function(){
        $('sequence').set('value', '');
        this.currentSequencia = [];
    },

    press: function(){
        $('sequence').addEvent('keyup', function(ev){
            if(ev.key.match(/^([0-9])$/)) {
                this.currentSequencia.push(ev.key);
                console.log(this.currentSequencia);
            }
        }.bind(this));
    },

    check: function(){
        let error = false;
        for(let a = 0; a < this.randomSequence.length; a++) {
            if(this.randomSequence[a] === this.currentSequencia[a]){
                error = false;
            }else{
                error = true;
            }
        }

        if(error === true){
            this.gameOver();
        }
        this.clear();
    },

    setElements: function(){

        this.random();

        this.current = new Element('input', {
            'class': 'math',
            'value': this.math
        }).inject($$('body')[0], 'top');

        new Element('div', {
            'class': 'math'
        }).inject($$('body')[0]);

        this.input = new Element('div').adopt(
            new Element('p', {
                'text': 'Digite a sequência'
            }),

            new Element('input', {
                'id': 'sequence'
            }),

            new Element('button', {
                'text': 'ok',
                'events': {
                    'click': function(){
                        this.sequence($('sequence').get('value'), $$('.math')[0].get('value'));
                        this.check();
                    }.bind(this)
                }
            }),
        )

        this.input.inject($$('body')[0]);
    },

    restart: function(){
        this.currentSequencia = [];
        this.randomSequence = [];
        this.clear();
        this.content.dispose();
    },

    gameOver: function(){
        this.content = new Element('div').adopt(
            new Element('p', {
                'text': 'Game Over'
            }),

            new Element('button', {
                'text': 'Reiniciar',
                'events': {
                    'click': function(){
                        this.restart();
                    }.bind(this)
                }
            })
        );

        this.content.inject($$('body')[0]);
    }

});
