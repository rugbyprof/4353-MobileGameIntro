var boot = {
	preload: function () {
		console.log("boot.js")
		game.load.image('loading_border', 'assets/images/loading_border.png')
		game.load.image('loading', 'assets/images/loading_interior.png')
	},
	create: function () {

		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL

		if (this.isDeviceMobile()) // if mobile
		{
			console.log(this.isDeviceMobile());
			// using outerWidth fixes the scaling problem in mobile devices. FINALLY SOLVED THIS CRAP!
			this.scale.minWidth = window.outerWidth
			this.scale.minHeight = window.outerHeight
			this.scale.maxWidth = window.outerWidth
			this.scale.maxHeight = window.outerHeight

		} else // if on computer
		{
			this.scale.minWidth = game.global.width
			this.scale.minHeight = game.global.height
			this.scale.maxWidth = game.global.width
			this.scale.maxHeight = game.global.height
		}

		this.scale.pageAlignHorizontally = true
		this.scale.pageAlignVertically = true
		this.scale.setScreenSize = true
		game.state.start('preLoad')
	},
	isDeviceMobile: function () {
		var isMobile = {
			Android: function () {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function () {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function () {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function () {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function () {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any: function () {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			}
		}
		return isMobile.any()
	}
}