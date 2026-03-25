// p5.js sketch for control flow animation
let sketch = function(p) {
    let flowChart = [];
    
    p.setup = function() {
        let canvas = p.createCanvas(400, 300);
        canvas.parent('conditional-animation');
        p.background(240);
        
        // Simple flowchart for if-else
        flowChart.push(new FlowBox(p, 100, 50, 200, 60, "Is x > 10?", "diamond"));
        flowChart.push(new FlowBox(p, 100, 130, 200, 50, "Yes: Print 'Greater'", "rectangle"));
        flowChart.push(new FlowBox(p, 100, 200, 200, 50, "No: Print 'Not greater'", "rectangle"));
        
        // Arrows (we'll draw them in display)
    };
    
    p.draw = function() {
        p.background(240);
        
        // Draw title
        p.fill(0);
        p.textSize(18);
        p.textAlign(p.CENTER, p.TOP);
        p.text("Conditional Flowchart", p.width/2, 10);
        
        // Draw flowchart elements
        for (let i = 0; i < flowChart.length; i++) {
            flowChart[i].display();
        }
        
        // Draw arrows
        p.stroke(0);
        p.strokeWeight(2);
        p.fill(0);
        // From diamond to yes rectangle
        p.line(200, 110, 200, 130);
        p.triangle(195, 125, 205, 125, 200, 115);
        // From diamond to no rectangle
        p.line(200, 110, 200, 180);
        p.triangle(195, 175, 205, 175, 200, 185);
    };
    
    // Flowchart box class
    class FlowBox {
        constructor(p, x, y, w, h, text, type) {
            this.p = p;
            this.x = x;
            this.y = y;
            this.w = w;
            this.h = h;
            this.text = text;
            this.type = type; // "rectangle" or "diamond"
            this.hover = false;
        }
        
        update() {
            // Check if mouse is over the box
            let inside = false;
            if (this.type === "rectangle") {
                inside = (this.p.mouseX > this.x && 
                         this.p.mouseX < this.x + this.w && 
                         this.p.mouseY > this.y && 
                         this.p.mouseY < this.y + this.h);
            } else if (this.type === "diamond") {
                // Simple bounding box for diamond
                inside = (this.p.mouseX > this.x && 
                         this.p.mouseX < this.x + this.w && 
                         this.p.mouseY > this.y && 
                         this.p.mouseY < this.y + this.h);
            }
            this.hover = inside;
        }
        
        display() {
            this.p.push();
            this.p.translate(this.x, this.y);
            
            // Update hover state
            this.update();
            
            if (this.type === "rectangle") {
                // Draw rectangle
                this.p.stroke(0);
                this.p.strokeWeight(2);
                if (this.hover) {
                    this.p.fill(200, 220, 255);
                } else {
                    this.p.fill(255);
                }
                this.p.rect(0, 0, this.w, this.h, 8);
                
                // Draw text
                this.p.fill(0);
                this.p.textSize(16);
                this.p.textAlign(this.p.CENTER, p.CENTER);
                this.p.text(this.text, this.w/2, this.h/2);
            } else if (this.type === "diamond") {
                // Draw diamond
                this.p.stroke(0);
                this.p.strokeWeight(2);
                if (this.hover) {
                    this.p.fill(200, 220, 255);
                } else {
                    this.p.fill(255);
                }
                this.p.beginShape();
                this.p.vertex(this.w/2, 0);           // top
                this.p.vertex(this.w, this.h/2);      // right
                this.p.vertex(this.w/2, this.h);      // bottom
                this.p.vertex(0, this.h/2);           // left
                this.p.endShape(p.CLOSE);
                
                // Draw text
                this.p.fill(0);
                this.p.textSize(16);
                this.p.textAlign(this.p.CENTER, p.CENTER);
                this.p.text(this.text, this.w/2, this.h/2);
            }
            
            this.p.pop();
        }
    }
};

// Create the p5 instance
let controlFlowSketch = new p5(sketch);