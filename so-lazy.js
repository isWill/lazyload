var lazyload = {
    imgWrapper: document.getElementsByClassName('img-wrapper'), //图片的包装元素
    src: '', //图片的链接
    setImg: function (index) { //添加img标签到包装元素中
        if (this.imgWrapper[index].dataset) { //考虑到浏览器的兼容性问题，如果浏览器支持元素的自定义属性
            this.src = this.imgWrapper[index].dataset.src;
        } else {
            this.src = this.imgWrapper[index].getAttribute('data-src');
        }

        var img = document.createElement('img');
        img.src = this.src;
        if (this.imgWrapper[index].children.length === 0) {
            this.imgWrapper[index].appendChild(img);
        }
        this.resetStyle(index);
    },
    getHeight: function (obj) {  //返回当前元素在当前页面中的高度
        var height = 0;
        if (obj) {
            height += obj.offsetTop;
        }
        return height;
    },
    setAttr: function () {
        for (var i = 0, len = this.imgWrapper.length; i < len; i++) {
            this.imgWrapper[i].style.position = 'relative';
            this.imgWrapper[i].style.paddingTop = '50%';
        }
    },
    resetStyle: function (n) {
        this.imgWrapper[n].style.paddingTop = '0';
    }
};

window.onscroll = function () {
    var imgWrp = lazyload.imgWrapper;
    for (var i = 0, len = imgWrp.length; i < len; i++) {
        var sub = imgWrp[i];
        var top = document.documentElement.clientHeight + (document.documentElement.scrollTop || document.body.scrollTop); //document.documentElement.clientHeight为当前页面视口的高度，document.documentElement.scrollTop || document.body.scrollTop为当前页面超过视口的高度
        var subHeight = lazyload.getHeight(sub);
        if (subHeight < top) {
            setTimeout("lazyload.setImg(" + i + ")", 500);
        }
    }
};

window.onload = function () {
    lazyload.setAttr();
    window.onscroll();
};