/*!
 * Canvas Gauges library (minified version)
 * You can copy the minified code from https://cdn.jsdelivr.net/npm/canvas-gauges/gauge.min.js
 */

// ------------------------
// Custom OdometerGauge widget
class OdometerGauge extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({mode:'open'});
        const canvas = document.createElement('canvas');
        canvas.width = 260; canvas.height = 260;
        shadow.appendChild(canvas);

        this.value = 0;
        this.minValue = 0;
        this.maxValue = 100;
        this.title = 'KPI';

        // Initialize gauge
        this._gauge = new RadialGauge({
            renderTo: canvas,
            width: 260,
            height: 260,
            minValue: this.minValue,
            maxValue: this.maxValue,
            units: this.title,
            majorTicks: ['0','10','20','30','40','50','60','70','80','90','100'],
            minorTicks: 2,
            strokeTicks: true,
            highlights: [
                {from:this.minValue, to:this.minValue + (this.maxValue-this.minValue)*0.4, color:'rgba(200,50,50,.75)'},
                {from:this.minValue + (this.maxValue-this.minValue)*0.4, to:this.minValue + (this.maxValue-this.minValue)*0.7, color:'rgba(240,230,50,.75)'},
                {from:this.minValue + (this.maxValue-this.minValue)*0.7, to:this.maxValue, color:'rgba(50,200,50,.75)'}
            ],
            colorPlate:'#fff',
            borders:true,
            needleType:'arrow',
            needleWidth:2,
            animationDuration:1200,
            animationRule:'linear',
            value:this.value
        }).draw();
    }

    setValue(val){ 
        this.value = val; 
        if(this._gauge) this._gauge.value = val; 
    }

    setRange(minV,maxV){ 
        this.minValue = minV; 
        this.maxValue = maxV; 
        if(this._gauge){ 
            this._gauge.update({minValue:minV,maxValue:maxV}); 
            this._gauge.draw(); 
        } 
    }
}

// Define custom element
customElements.define('odometer-gauge', OdometerGauge);
