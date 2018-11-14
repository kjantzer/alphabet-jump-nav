/*
	Alphabet Jump Nav
	
	@author Kevin Jantzer, Blackstone Publishing
*/

module.exports = class AlphabetJumpNav {
	
	constructor(el){
		
		this.el = el || document.createElement('div')
		this.el.classList.add('alphabet-jump-nav')
		
		let letters = this.letters.map(letter=>`<div class="letter">${letter}</div>`)
		
		this.el.innerHTML = '<div class="bar">'+letters.join("\n")+'</div>'
							+'<div class="preview"></div>'
		
		this.el.querySelectorAll('.letter').forEach(el=>{
			el.addEventListener('click', this.onClick.bind(this))
		})
		
		this.preview = this.el.querySelector('.preview')
		
		this.onTouchMove = this.onTouchMove.bind(this)
		this.el.addEventListener('touchstart', this.onTouchMove)
		this.el.addEventListener('touchmove', _.throttle(this.onTouchMove, 50))
		this.el.addEventListener('touchend', this.onTouchEnd.bind(this))
	}
	
	linkTo(el){
	
		this.listEl = el
		this.starterRows = {}
		
		let starterRows = {}
		
		el.childNodes.forEach(el=>{
			let char = el.dataset.title&&el.dataset.title[0]
			if( !char ) return
			
			char = char.toLowerCase()
			let charCode = char.charCodeAt(0) - 97
			
			if( charCode < 0 || charCode >= 26 )
				char = '#';
			
			if( !starterRows[char] )
				starterRows[char] = el
		})
		
		let last = null
		
		// fill in missing rows
		this.letters.reverse().forEach(letter=>{
			if( !starterRows[letter] )
				starterRows[letter] = last
			else
				last = starterRows[letter]
		})
		
		this.starterRows = starterRows
		return this
	}
	
	appendTo(el){
		el.appendChild(this.el)
		return this
	}
	
	onClick(e){
		this.scrollTo(e.currentTarget)
	}
	
	onTouchEnd(e){
		this.isTouching = false
	
		setTimeout(()=>{
			this.preview.style.visibility = 'hidden'
		}, 100)
	}
	
	onTouchMove(e){
		
		e.stopPropagation()
		e.preventDefault()
		
		this.isTouching = true
		
		let xPos = this.el.offsetLeft + (this.el.offsetWidth/2)
		let yPos = e.touches[0].pageY;
		let el = document.elementFromPoint(xPos, yPos)
		
		this.preview.style.visibility = 'visible'
		this.preview.style.top = (yPos - this.el.getBoundingClientRect().top - (this.preview.offsetHeight/2)) +'px'
		
		this.scrollTo(el)
		
		return false;
	}
	
	scrollTo(el){
		if( !el || el == this.el || !this.el.contains(el) ) return;
		
		let val = el.innerText.toLowerCase()
		
		this.preview.innerHTML = val;
		
		if( this.lastTouched == val ) return;
		
		this.lastTouched = val
		
		if( !this.starterRows || !this.listEl ) return
		
		if( this.starterRows[this.lastTouched] )
			this.starterRows[this.lastTouched].scrollIntoView()
		else
			this.listEl.lastElementChild.scrollIntoView()
		
		if( !this.isTouching )
			this.lastTouched = null
	}
	
	get letters(){
		return ['#'].concat(Array
			.apply(null, {length: 26})
			.map((x, i) => String.fromCharCode(97 + i))
		)
	}
}