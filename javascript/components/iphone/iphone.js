var moveObject = {
    init: function () {
        document.addEventListener('mousedown', this.down, false);
    },
    down: function (e) {
        if (!this.rotateNum) {
            this.rotateNum = {
                x: 16,
                y: 0
            };
        }
        this.startPos = {
            x: e.pageX,
            y: e.pageY
        };
        document.addEventListener('mousemove', moveObject.move, false);
        document.addEventListener('mouseup', moveObject.up, false);
    },
    move: function (e) {
        this.movePos = {
            x: e.pageX,
            y: e.pageY
        };
        this.rotateTemp = {
            x: (this.movePos.x - this.startPos.x) + this.rotateNum.x,
            y: -(this.movePos.y - this.startPos.y) + this.rotateNum.y
        };
        document.getElementById('iphone').style.transform = 'perspective(1000px) rotateX(' + this.rotateTemp.y + 'deg) rotateY(' + this.rotateTemp.x + 'deg)';
    },
    up: function (e) {
        this.rotateNum = {
            x: this.rotateTemp.x,
            y: this.rotateTemp.y
        };
        document.removeEventListener('mousemove', moveObject.move, false);
        document.removeEventListener('mouseup', moveObject.up, false);
    }
};

moveObject.init();