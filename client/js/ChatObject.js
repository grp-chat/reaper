class ChatObject {
    constructor(config) {
        this.text = config.message || "Player says hello";
        this.id = config.id;
        this.area = config.area;
        this.allMatrixes = config.allMatrixes;
        this.i = 1;
        this.char = "";
        this.fps = 20;
        this.cellSize = config.cellSize || 27;
        this.padding = config.padding || 2;
        this.chatContext = this.getContext(0, 0, "transparent", false);
        this.matrixLengthXAxis = this.allMatrixes[this.area].gridMatrix[0].length || 34;
        this.matrixLengthYAxis = this.allMatrixes[this.area].gridMatrix.length || 21;
        
        this.x = config.x;
        this.y = config.y;
        //this.chatContext = super.getContext(1000, 580, "transparent", false);
    }

    getCenter(w, h) {
        return {
            x: window.innerWidth / 2 - w / 2 + "px",
            y: window.innerHeight / 2 - h / 2 + "px"
        };
    }
    getTopLeftFromUIContext() {
        return {
            //x: window.innerWidth - (this.chatContext.canvas.width + 300) + "px",
            //y: window.innerHeight - (this.chatContext.canvas.height + 25) + "px"
            x: 0 + "px",
            y: 20 + "px"
        };
    }

    getContext(w, h, color = "#111", isTransparent = false) {
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");
        this.width = this.canvas.width = w;
        this.height = this.canvas.height = h;
        this.canvas.style.position = "absolute";
        this.canvas.style.background = color;
        if (isTransparent) {
            this.canvas.style.backgroundColor = "transparent";
        }
        const center = this.getCenter(w, h);
        this.canvas.style.marginLeft = center.x;
        this.canvas.style.marginTop = center.y;
        document.body.appendChild(this.canvas);

        return this.context;
    }
    chatContextSettings() {
        const w = (this.cellSize + this.padding) * this.matrixLengthXAxis - (this.padding);
        const h = (this.cellSize + this.padding) * this.matrixLengthYAxis - (this.padding);

        this.chatContext.canvas.width = w;
        this.chatContext.canvas.height = h;
        //const center = this.getCenter(w, h);
        const center = this.getTopLeftFromUIContext();
        this.chatContext.canvas.style.marginLeft = center.x;
        this.chatContext.canvas.style.marginTop = center.y;
        this.chatContext.canvas.style.background = "transparent";
        //this.chatContext.canvas.style.border = "2px solid red";
    }

    resetTypeWriter() {
        
    }
    typeWriter(){
        this.chatContextSettings()
        
        this.char = this.text.substr(0, this.i);  
        // Clear the canvas
        this.chatContext.clearRect(0,0,this.chatContext.canvas.width, this.chatContext.canvas.height)

        this.chatContext.font = '11px Courier';
        this.chatContext.fillStyle = 'white';
        this.chatContext.fillText(this.char, this.x * (this.cellSize + this.padding), this.y * (this.cellSize + this.padding));  
        if (this.i<=this.text.length +200){
          setTimeout(this.typeWriter.bind(this), this.fps)
          this.i++;
        }

    }
    justPrint() {

        this.chatContext = this.getContext(0, 0, "transparent", false);
        this.chatContextSettings();
        this.chatContext.font = '11px Courier';
        this.chatContext.fillStyle = 'white';
        this.chatContext.fillText(this.char, this.x * (this.cellSize + this.padding), this.y * (this.cellSize + this.padding));  

    }
}