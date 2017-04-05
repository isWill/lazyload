var lazyload = {
    imgWrapper: document.getElementsByClassName('img-wrapper'),
    src: '',
    setImg: function (index) {
        if (this.imgWrapper[index].dataset) {
            this.src = this.imgWrapper[index].dataset.src;
        } else {
            this.src = this.imgWrapper[index].getAttribute('data-src');
        }

        var img = document.createElement('img');
        img.src = this.src;
        if (this.imgWrapper[index].children.length === 0) {
            this.imgWrapper[index].appendChild(img);
        }
    },
    getHeight: function (obj) {
        var height = 0;
        if (obj) {
            height += obj.offsetTop;
        }
        return height;
    }
};

window.onscroll = function () {
    var imgWrp = lazyload.imgWrapper;
    for (var i = 0, len = imgWrp.length; i < len; i++) {
        var sub = imgWrp[i];
        var top = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop);
        var subHeight = lazyload.getHeight(sub);
        if (subHeight < top) {
            setTimeout("lazyload.setImg(" + i + ")", 500);
        }
    }
};

window.onload = function () {
    window.onscroll();
};