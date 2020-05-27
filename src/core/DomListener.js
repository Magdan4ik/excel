import { capitalize } from './utils'

export class DomListener {
	constructor($root, listeners = []) {
		if(!$root) {
			throw new Error('No $root provided for DOMListener!')
		}
		this.$root = $root
		this.listeners = listeners
	}

	initDOMListeners() {
		this.listeners.forEach(listenter => {
			const method = getMethodName(listenter)
			if(!this[method]) {
				throw new Error(
					`Method ${method} is not inplemented in ${this.name} Component`
				)
			}
			// AddEventListenter
			this[method] = this[method].bind(this);
			this.$root.on(listenter, this[method])
		})
	}

	removeDOMListenters() {
		this.listeners.forEach(listenter => {
			const method = getMethodName(listenter)
			this.$root.off(listenter, this[method]);
		})
	}
}

function getMethodName(eventName) {
	return 'on' + capitalize(eventName)
}
