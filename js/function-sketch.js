// p5.js sketch for function animation
let sketch = function(p) {
    let functionMachine = [];
    
    p.setup = function() {
        let canvas = p.createCanvas(400, 300);
        canvas.parent('function-animation');
        p.background(240);
        
        // Create function machine visualization
        functionMachine.push(new FunctionBox(p, 50, 50, 120, 80, "Input", 5));
        functionMachine.push(new FunctionBox(p, 230, 50, 120, 80, "Output", 25)); // 5*5
    };
    
    p.draw = function() {
        p.background(240);
        
        // Draw title
        p.fill(0);
        p.textSize(18);
        p.textAlign(p.CENTER, p.TOP);
        p.text("Function Machine: square(x) = x*x", p.width/2, 10);
        
        // Draw function machine components
        for (let i = 0; i < functionMachine.length; i++) {
            functionMachine[i].display();
        }
        
        // Draw the function processing
        p.stroke(0);
        p.strokeWeight(3);
        p.fill(100, 149, 237, 100);
        p.beginShape();
        p.vertex(170, 90);  // bottom of input box
        p.vertex(170, 130); // process start
        p.vertex(230, 110); // middle of process
        p.vertex(170, 90);  // back to start (this creates a triangle)
        p.endShape(p.CLOSE);
        
        // Draw label for the function
        p.fill(0);
        p.textSize(14);
        p.textAlign(p.CENTER, p.BOTTOM);
        p.text("square", 200, 85);
        
        // Draw arrow from input to function
        p.stroke(0);
        p.strokeWeight(2);
        p.line(170, 90, 170, 110);
        p.triangle(165, 105, 175, 105, 170, 100);
        
        // Draw arrow from function to output
        p.line(230, 110, 230, 90);
        p.triangle(225, 95, 235, 95, 230, 90);
    };
    
    // Function box class
    class FunctionBox {
        constructor(p, x, y, w, h, label, value) {
            this.p = p;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.label = label;
            this.value = value;
            this.hover = false;
        }
        
        update() {
            // Check if mouse is over the box
            this.hover = (this.p.mouseX > this.x && 
                         this.p.mouseX < this.x + this.w && 
                         this.p.mouseY > this.y && 
                         this.p.mouseY < this.y + this.h);
        }
        
        display() {
            this.p.push();
            this.p.translate(this.x, this.y);
            
            // Draw box
            this.p.stroke(0);
            this.p.strokeWeight(2);
            if (this.hover) {
                this.p.fill(200, 220, 255);
            } else {
                this.p.fill(255);
            }
            this.p.rect(0, 0, this.w, this.h, 8);
            
            // Draw label
            this.p.fill(0);
            this.p.textSize(16);
            this.p.textAlign(this.p.CENTER, p.TOP);
            this.p.text(this.label, this.w/2, 10);
            
            // Draw value
            this.p.textSize(14);
            this.p.textAlign(this.p.CENTER, p.BOTTOM);
            this.p.text(this.value, this.w/2, this.h-10);
            
            this.p.pop();
        }
    }
};

// Create the p5 instance
let functionSketch = new p5(sketch);