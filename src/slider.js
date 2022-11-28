function getTemplate(state) {
    return `
    <div class="slider__before" style="width: ${state.width}px; background-image: url('${state.before}')">
        <div class="slider__resize" data-type="resize">

        </div>
    </div>
    <div class="slider__after" style="background-image: url('${state.after}')"></div>
    `;
}

class Slider {
    constructor(selector, state) {
        this.slider = document.querySelector(selector);
        this.state = {
            ...state,
            width: state.width || 512
        };
        this.#render(this.state);
        this.#listen()
    }

    #render(state) {
        this.slider.innerHTML = getTemplate(state);
    }

    #listen() {
        this.mouseHandler = this.mouseHandler.bind(this);
        this.slider.addEventListener('mousedown', this.mouseDownHandler.bind(this));
        this.slider.addEventListener('mouseup', this.mouseUpHandler.bind(this))
    }

    #updateState(x) {
        this.state.width = +this.state.width - x;
        this.#render(this.state);
    }

    mouseDownHandler(event) {
        if (event.target.dataset.type === 'resize') {
            this.slider.addEventListener('mousemove', this.mouseHandler);
            this.currentClientX = event.clientX;
        }
    }

    mouseUpHandler() {
        this.slider.removeEventListener('mousemove', this.mouseHandler);
    }

    mouseHandler(event) {
        let newClientX = this.currentClientX - event.clientX;
        this.currentClientX = event.clientX;
        this.#updateState(newClientX);
    }
}

export default Slider;