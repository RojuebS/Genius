window.addEvent('domready', () => {
    // new Welcome();
    new Genius();
});

color = {
    1: 'amarelo',
    2: 'verde',
    3: 'azul',
    4: 'vermelho'
};

Welcome = new Class({
    Implements: Options,
    options: {

    },

    initialize(options) {
        this.setOptions(options);
        this.setElements();
        setTimeout(() => {
            this.effect();
        }, 1000)
    },

    setElements(){
        this.hello = new Element('div', {
            'class': 'hello',
            'styles': {
                'background': 'url(images/pergaminho.png) no-repeat'
            }
        }).adopt(
            new Element('div', {
                'class': 'play'
            }).adopt(
                new Element('img', {
                    'src': 'images/play.png'
                })
            )
        );
        this.hello.inject($$('body')[0]);
    },
    effect(){
        this.hello.addClass('active');
    }
});

Genius = new Class({

    Implements: Options,
    options: {

    },

    initialize(options){
        this.setOptions(options);
        this.setElements();
        this.random();
        this.press();
        this.round = 0;
        this.currentSequencia = [];
        this.randomSequence = [];
        this.error = false;
    },

    random() {
        this.math = parseInt(Math.random() * 4 + 1);
        this.setNameColor();
    },

    sequence(current, random){
        this.random();
        this.round++;
        this.currentSequencia.push(current);
        this.randomSequence.push(random);
    },

    clear(){
        $('sequence').set('value', '');
        this.currentSequencia = [];
    },

    press(){
        $('sequence').addEvent('keyup', function(ev){
            if(ev.key.match(/^([0-9])$/)) {
                this.currentSequencia.push(ev.key);
            }
        }.bind(this));
    },

    check(){
        for(let a = 0; a < this.randomSequence.length; a++) {
            if(this.randomSequence[a] === this.currentSequencia[a]){
                this.error = false;
            }else{
                this.gameOver();
                return false;
            }
        }

        this.clear();
    },

    setElements(){

        this.random();

        this.current = new Element('input', {
            'class': 'math'
        }).inject($$('body')[0], 'top');

        new Element('div', {
            'class': 'textMath'
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
                    'click': () => {
                        this.sequence($('sequence').get('value'), $$('.math')[0].get('value'));
                        this.check();
                    }
                }
            }),
        );

        this.input.inject($$('body')[0]);
    },

    setNameColor() {
        $$('.math').set('value', this.math);
        $$('.textMath').set('text', color[this.math]);
    },

    restart(){
        this.currentSequencia = [];
        this.randomSequence = [];
        this.clear();
        this.content.dispose();
    },

    gameOver(){
        this.content = new Element('div').adopt(
            new Element('p', {
                'text': 'Game Over'
            }),

            new Element('button', {
                'text': 'Reiniciar',
                'events': {
                    'click': () => {
                        this.restart();
                    }
                }
            })
        );

        this.content.inject($$('body')[0]);
    }

});
