// p5.js sketch for data types animation
let sketch = function(p) {
    let dataTypes = [];
    
    p.setup = function() {
        let canvas = p.createCanvas(400, 300);
        canvas.parent('data-type-animation');
        p.background(240);
        
        // Create data type representations
        dataTypes.push(new DataTypeBox(p, 50, 50, 120, 80, "Integer", 42, "int", "#FF6B6B"));
        dataTypes.push(new DataTypeBox(p, 230, 50, 120, 80, "Float", 3.14, "float", "#4ECDC4"));
        dataTypes.push(new DataTypeBox(p, 50, 170, 120, 80, "String", '"Python"', "str", "#45B7D1"));
        dataTypes.push(new DataTypeBox(p, 230, 170, 120, 80, "Boolean", true, "bool", "#96CEB4"));
    };
    
    p.draw = function() {
        p.background(240);
        
        // Draw title
        p.fill(0);
        p.textSize(18);
        p.textAlign(p.CENTER, p.TOP);
        p.text("Python Data Types", p.width/2, 10);
        
        // Draw and update boxes
        for (let dt of dataTypes) {
            dt.update();
            dt.display();
        }
    };
    
    // Data type box class
    class DataTypeBox {
        constructor(p, x, y, w, h, name, value, type, color) {
            this.p = p;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.name = name;
            this.value = value;
            this.type = type;
            this.color = color;
            this.hover = false;
            this.pulse = 0;
        }
        
        update() {
            // Check if mouse is over the box
            this.hover = (this.p.mouseX > this.x && 
                         this.p.mouseX < this.x + this.w && 
                         this.p.mouseY > this.y && 
                         this.p.mouseY < this.y + this.h);
            
            // Pulse animation
            this.pulse = (this.pulse + 0.05) % (2 * Math.PI);
        }
        
        display() {
            this.p.push();
            this.p.translate(this.x, this.y);
            
            // Draw box with pulse effect on hover
            let pulseSize = this.hover ? 5 * Math.sin(this.pulse) : 0;
            this.p.fill(this.color);
            if (this.hover) {
                // Lighter version on hover
                const rgb = this.hexToRgb(this.color);
                this.p.fill(`rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 0.8)`);
            }
            this.p.noStroke();
            this.p.rect(0, 0, this.w, this.h + pulseSize, 12);
            
            // Draw border
            this.p.stroke(0);
            this.p.strokeWeight(2);
            this.p.noFill();
            this.p.rect(0, 0, this.w, this.h + pulseSize, 12);
            
            // Draw content
            this.p.fill(0);
            this.p.textSize(16);
            this.p.textAlign(this.p.CENTER, p.TOP);
            this.p.text(this.name, this.w/2, 10);
            
            this.p.textSize(14);
            this.p.text(`Value: ${this.value}`, this.w/2, 35);
            this.p.text(`Type: ${this.type}`, this.w/2, 55);
            
            this.p.pop();
        }
        
        // Helper to convert hex to rgb
        hexToRgb(hex) {
            const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
            
            const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
            return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
        }
    }
};

// Create the p5 instance
let dataTypeSketch = new p5(sketch);