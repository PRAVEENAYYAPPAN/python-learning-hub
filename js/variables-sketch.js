// p5.js sketch for variables animation
let sketch = function(p) {
    let boxes = [];
    
    p.setup = function() {
        let canvas = p.createCanvas(400, 200);
        canvas.parent('variable-animation');
        p.background(240);
        
        // Create variable boxes
        boxes.push(new VariableBox(p, 50, 50, 100, 60, "x", 5, "integer"));
        boxes.push(new VariableBox(p, 250, 50, 100, 60, "y", '"Hello"', "string"));
    };
    
    p.draw = function() {
        p.background(240);
        
        // Draw labels
        p.fill(0);
        p.textSize(14);
        p.textAlign(p.CENTER, p.CENTER);
        p.text("Variable Name", 50, 30);
        p.text("Variable Name", 250, 30);
        p.text("Value", 100, 30);
        p.text("Value", 300, 30);
        p.text("Type", 150, 30);
        p.text("Type", 350, 30);
        
        // Update and draw boxes
        for (let box of boxes) {
            box.update();
            box.display();
        }
    };
    
    // Variable box class
    class VariableBox {
        constructor(p, x, y, w, h, name, value, type) {
            this.p = p;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.name = name;
            this.value = value;
            this.type = type;
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
            
            // Draw content
            this.p.fill(0);
            this.p.textSize(16);
            this.p.textAlign(this.p.LEFT, this.p.TOP);
            this.p.text("Name: " + this.name, 10, 10);
            this.p.text("Value: " + this.value, 10, 35);
            this.p.text("Type: " + this.type, 10, 60);
            
            this.p.pop();
        }
    }
};

// Create the p5 instance
let variablesSketch = new p5(sketch);