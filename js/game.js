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
        this.round = 1;
        this.currentSequencia = [];
        this.randomSequence = [];
        this.error = false;
        this.buttons();
    },

    random() {
        this.math = parseInt(Math.random() * 4 + 1);
        this.settings();
    },

    settings() {
        $$('.math').set('value', this.math);
        $$('.textMath').set('text', color[this.math]);
        if(typeof (this.round) !== 'undefined') {
            $$('.textRound').set('text', 'Round: ' + this.round++);
        }
    },

    sequence(current, random){
        this.random();
        this.randomSequence.push(random);
    },

    clear() {
        $('sequence').set('value', '');
        this.currentSequencia = [];
    },

    buttons () {
        this.contentButton = new Element('div', {
            'class': 'contentButtons'
        }).inject($$('body')[0]);
        for(let item in color) {
            new Element('div', {
                'id': item,
                'class': 'button ' + color[item],
                'events': {
                    'click': () => {
                        let val = $('sequence').get('value');
                        $('sequence').set('value', val+item);
                        this.currentSequencia.push(item);
                        if(this.currentSequencia.length - 1 == this.randomSequence.length) {
                            this.sequence($('sequence').get('value'), $$('.math')[0].get('value'));
                            this.check();
                        }
                    }
                }
            }).inject(this.contentButton);
        }
    },

    press() {
        $('sequence').addEvent('keyup', function(ev){
            if(ev.key.match(/^([0-9])$/)) {
                this.currentSequencia.push(ev.key);
            }
        }.bind(this));
    },

    check() {
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

    setElements() {

        this.grid = new Element('div').adopt(
            new Element('div', {
                'class': 'textRound'
            }),

            new Element('input', {
                'class': 'math',
                'type': 'hidden'
            }),

            new Element('div', {
                'class': 'textMath'
            }),

            new Element('div').adopt(
                new Element('p', {
                    'text': 'Digite a sequência'
                }),

                new Element('input', {
                    'id': 'sequence',
                    'type': 'hidden'
                }),
            )
        );
        this.grid.inject($$('body')[0]);
    },

    restart(){
        this.currentSequencia = [];
        this.randomSequence = [];
        this.clear();
        this.content.dispose();
        this.round = 0;
        this.settings();
        this.contentButton.setStyle('pointer-events', 'auto');
    },

    gameOver(){
        this.contentButton.setStyle('pointer-events', 'none');
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
