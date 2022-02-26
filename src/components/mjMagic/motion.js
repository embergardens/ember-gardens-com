/* eslint-disable no-unused-expressions */
/* eslint-disable arrow-body-style */
const ease = {
   exponentialIn: t=>t === 0 ? t : 2 ** ( 10 * (t - 1) ),
   exponentialOut: t=>t === 1 ? t : 1 - ( 2 ** ( -10 * t ) ),
   exponentialInOut: t=>t == 0 || t == 1 ? t : t < .5 ? .5 * Math.pow(2, 20 * t - 10) : -.5 * Math.pow(2, 10 - 20 * t) + 1,
   sineOut: t=>{
       return Math.sin(1.5707963267948966 * t)
   }
   ,
   circularInOut: t=>t < .5 ? .5 * (1 - Math.sqrt(1 - 4 * t * t)) : .5 * (Math.sqrt((3 - 2 * t) * (2 * t - 1)) + 1),
   cubicIn: t=>t * t * t,
   cubicOut: t=>{
      const e = t - 1;
      return e * e * e + 1
   }
   ,
   cubicInOut: t=>t < .5 ? 4 * t * t * t : .5 * Math.pow(2 * t - 2, 3) + 1,
   quadraticOut: t=>-t * (t - 2),
   quarticOut: t=>Math.pow(t - 1, 3) * (1 - t) + 1
}

class ShapeOverlays {
	constructor(el) {
		this.elm = el
		this.path = el.querySelectorAll("path")
		this.numPoints = 4
		this.duration = 600
		this.delayPointsArray = []
		this.delayPointsMax = 420
		this.delayPerPath = 90
		this.timeStart = Date.now()
		this.isOpened = false
		this.isAnimating = false
	}

	toggle() {
		this.isAnimating = true;
		for (let i = 0; i < this.numPoints; i += 1) {
			this.delayPointsArray[i] = Math.random() * this.delayPointsMax;
		}
		this.isOpened === false ? this.open() : this.close()
	}

	open() {
		this.isOpened = true
		this.elm.classList.add("is-opened")
		this.timeStart = Date.now()
		this.renderLoop()
	}

	close() {
		this.isOpened = false
		this.elm.classList.remove("is-opened")
		this.timeStart = Date.now()
		this.renderLoop()
	}

	updatePath1(t) {
		const e = [];
			for (let s = 0; s < this.numPoints; s += 1)
					e[s] = 100 * (1 - ease.cubicInOut(Math.min(Math.max(t - this.delayPointsArray[s], 0) / this.duration, 1)));
			let i = "";
			i += this.isOpened ? `M 0 0 V ${e[0]}` : `M 0 ${e[0]}`;
			for (let s = 0; s < this.numPoints - 1; s += 1) {
					const t = (s + 1) / (this.numPoints - 1) * 100
					const a = t - 1 / (this.numPoints - 1) * 100 / 2;
					i += `C ${a} ${e[s]} ${a} ${e[s + 1]} ${t} ${e[s + 1]} `
			}
			return i += this.isOpened ? "V 100 H 0" : "V 0 H 0"
		}

	updatePath2(t) {
		const e = [];
		for (let s = 0; s < this.numPoints + 1; s += 1)
			e[s] = 100 * ease.cubicInOut(Math.min(Math.max(t - this.delayPointsArray[s], 0) / this.duration, 1));
		let i = "";
		i += this.isOpened ? `M 0 0 V ${e[0]} ` : `M 0 ${e[0]} `;
		for (let s = 0; s < this.numPoints - 1; s += 1) {
			const t = (s + 1) / (this.numPoints - 1) * 100
				; const a = t - 1 / (this.numPoints - 1) * 100 / 2;
			i += `C ${a} ${e[s]} ${a} ${e[s + 1]} ${t} ${e[s + 1]} `
		}
		return i += this.isOpened ? "V 0 H 0" : "V 100 H 0"
	}

	render() {
		if (this.isOpened)
			for (let t = 0; t < this.path.length; t += 1)
				this.path[t].setAttribute("d", this.updatePath2(Date.now() - (this.timeStart + this.delayPerPath * t)));
		else
			for (let t = 0; t < this.path.length; t += 1)
				this.path[t].setAttribute("d", this.updatePath1(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - t - 1))))
	}

	renderLoop() {
		this.render()
		Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax ? requestAnimationFrame(()=>{
			this.renderLoop()
		}
		) : this.isAnimating = false
	}
}

export default ShapeOverlays