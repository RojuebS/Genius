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
        this.round = 1;
        this.elSequencia = [];
        this.randomSequence = [];
        this.error = false;
    },

    setElements() {

        this.currentRandom = [];
        this.grid = new Element('div', {

        }).adopt(
            new Element('div', {
                'class': 'textRound'
            }),

            new Element('input', {
                'class': 'math',
                'type': 'hidden'
            }),

            new Element('div', {
                'class': 'textMath',
                'styles': {
                    'display': 'none'
                }
            }),

            new Element('div').adopt(
                new Element('input', {
                    'id': 'sequence',
                    'type': 'hidden'
                }),
            )
        );
        this.grid.inject($$('body')[0]);

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
                        this.elSequencia.push(item);
                        if(this.elSequencia.length - 1 == this.randomSequence.length) {
                            this.sequence($('sequence').get('value'), $$('.math')[0].get('value'));
                            this.check();
                        }
                    }
                }
            }).inject(this.contentButton);
        }
    },

    loadelSequencia() {
        let count = 1;
        this.currentRandom.each( (n, m) => {
            setTimeout( () => {
                $$('.contentButtons div')[n - 1].addClass('active');
            }, 1000 * count++);

            setTimeout( () => {
                $$('.contentButtons div')[n - 1].removeClass('active');
            }, 1000 * count++);
        });
    },

    random() {
        this.math = parseInt(Math.random() * 4 + 1);
        this.currentRandom.push(this.math);
        this.settings();
    },

    settings() {
        $$('.math').set('value', this.math);
        $$('.textMath').set('text', color[this.math]);
        if(typeof (this.round) !== 'undefined') {
            $$('.textRound').set('text', 'Round: ' + this.round++);
        }
        this.loadelSequencia();
    },

    sequence(el, random){
        this.random();
        this.randomSequence.push(random);
    },

    clear() {
        $('sequence').set('value', '');
        this.elSequencia = [];
    },

    check() {
        this.error = false;
        for(let a = 0; a < this.randomSequence.length; a++) {
            if(this.randomSequence[a] !== this.elSequencia[a]){
                this.error = true;
            }
        }

        if(this.error === false) {
            this.clear();
            // this.start();
        }else{
            this.gameOver();
        }

    },

    start() {
        this.loadelSequencia();
    },

    restart(){
        this.elSequencia = [];
        this.randomSequence = [];
        this.content.dispose();
        this.round = 0;
        this.settings();
        this.contentButton.setStyle('pointer-events', 'auto');
        this.clear();
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
    },
});
