class InputComponent extends Component
{
    constructor(parentEntity)
    {
        super(parentEntity);
        this.inputVector = new Vector(0,0,0);
        this.needsUpdate = true;

        this.mouseCoordX = 0;
        this.mouseCoordY = 0;

        this.actionInput = false;
        this.clickInput = false;
        
        // wasd qe "is pressed down"
		this.W = false;
		this.A = false;
		this.S = false;
		this.D = false;
		this.Q = false;
		this.E = false;

		// arrow keys "is pressed down"
		this.L = false;
		this.U = false;
		this.R = false;
		this.Do = false;

		// keycodes wasd qe
		this.keycodeW = 87;
		this.keycodeA = 65;
		this.keycodeS = 83;
		this.keycodeD = 68;
		this.keycodeQ = 81;
        this.keycodeE = 69;
        
        this.keycodeSpace = 32;

		// keycodes arrow keys
		this.keycodeL = 37;
		this.keycodeU = 38;
		this.keycodeR = 39;
		this.keycodeDo = 40;
        //basic Input Functions for game built from fps implementation
        //wanted to be more customizable but time constraints, so its specific for the player controller

        //KEY
        window.addEventListener("keydown", event => this.onKeyDown(event));
        window.addEventListener("keyup", event => this.onKeyUp(event));
        window.addEventListener("keypress", event => this.onKeyPress(event));

        //MOUSE
        window.addEventListener("mousedown", event => this.onMouseLeftClick(event));
        window.addEventListener("mousemove", event => this.mouseMotion(event));
    }

    onKeyDown(event)
	{
        
		switch (event.keyCode)
		{
			case this.keycodeW:
				this.W = true;
				break;
			case this.keycodeA:
				this.A = true;
				break;
			case this.keycodeS:
				this.S = true;
				break;
			case this.keycodeD:
				this.D = true;
				break;
			case this.keycodeQ:
				this.Q = true;
				break;
			case this.keycodeE:
				this.E = true;
				break;
			case this.keycodeL:
				this.L = true;
				break;
			case this.keycodeU:
				this.U = true;
				break;
			case this.keycodeR:
				this.R = true;
				break;
			case this.keycodeDo:
				this.Do = true;
				break;
			default:
				break;
		}
	}

	onKeyUp(event)
	{
		switch (event.keyCode)
		{
			case this.keycodeW:
				this.W = false;
				break;
			case this.keycodeA:
				this.A = false;
				break;
			case this.keycodeS:
				this.S = false;
				break;
			case this.keycodeD:
				this.D = false;
				break;
			case this.keycodeQ:
				this.Q = false;
				break;
			case this.keycodeE:
				this.E = false;
				break;
			case this.keycodeL:
				this.L = false;
				break;
			case this.keycodeU:
				this.U = false;
				break;
			case this.keycodeR:
				this.R = false;
				break;
			case this.keycodeDo:
				this.Do = false;
				break;
			default:
				break;
		}
    }
    
    setInputVector()
	{
		this.inputVector.setVector(new Vector(0,0,0));
		// left/right
		if (this.A)
		{
			this.inputVector.x += -1;
		}
		if (this.D)
		{
			this.inputVector.x += 1;
		}

		// forward/back
		if (this.W)
		{
			this.inputVector.z += -1;
		}
		if (this.S)
		{
			this.inputVector.z += 1;
		}

		this.inputVector.normalize();

    }
    
    initComponent()
    {
        this.needsUpdate = true;
    }

    updateComponent(delta)
    {
        this.setInputVector();
    }

    onKeyPress(event)
    {
        
        if(event.keyCode == this.keycodeSpace)
        {
            this.spaceActionOneShot();
        }
    }

    //Override in attached entity to use space bar for input
    spaceActionOneShot(){}

    onMouseLeftClick(event)
    {
        this.mouseButtonPress();
    }

    //Override in attached entity to use left mouse button for input
    mouseButtonPress(){}

    mouseMotion(event)
    {
        this.mouseCoordX = event.ClientX;
        this.mouseCoordY = event.ClientY;
    }


}