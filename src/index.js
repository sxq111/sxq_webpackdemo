import './style/index.css';
import Matter from  'matter-js';

let nowDemoInstance = null;
function init(){
    nowDemoInstance && nowDemoInstance.stop();
}
var Example = {};
const canvas = document.getElementById("main");
Example.mouseControl = function() {
    init();
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        canvas:canvas,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            wireframes: false,
            background: '#666'
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    // define our categories (as bit fields, there are up to 32 available)
    var redCategory = 0x0002,
        greenCategory = 0x0004,
        blueCategory = 0x0008;

    var redColor = '#C44D58',
        blueColor = '#4ECDC4',
        greenColor = '#C7F464';

    // add floor
    World.add(world, Bodies.rectangle(400, 600, 900, 50, { 
        isStatic: true,
        render: {
            fillStyle: 'transparent',
            lineWidth: 1
        } 
    }));


    // this body will only collide with the walls and the green bodies
    World.add(world,
        Bodies.circle(310, 40, 30, {
            collisionFilter: {
                category:greenCategory
            },
            render: {
                fillStyle: greenColor
            }
        })
    );

    // this body will only collide with the walls and the red bodies
    World.add(world,
        Bodies.circle(400, 40, 30, {
            collisionFilter: {
                category:redCategory
            },
            render: {
                fillStyle: redColor
            }
        })
    );


    World.add(world,
        Bodies.circle(480, 40, 30, {
            collisionFilter: {
                category:blueCategory
            },
            render: {
                fillStyle: blueColor
            }
        })
    );

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.5,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);

    // keep the mouse in sync with rendering
    render.mouse = mouse;

    // red category objects should not be draggable with the mouse
    mouseConstraint.collisionFilter.mask = blueCategory | greenCategory;

    nowDemoInstance = {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};
Example.addBodys = function() {
    init();
    var Engine = Matter.Engine,
        Render = Matter.Render,
        Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        World = Matter.World,
        Bodies = Matter.Bodies;

    // create engine
    var engine = Engine.create(),
        world = engine.world;

    // create renderer
    var render = Render.create({
        // canvas: document.body,
        canvas:canvas,
        engine: engine,
        options: {
            width: 800,
            height: 600,
            wireframes: false,
            background: '#666'
        }
    });

    Render.run(render);

    // create runner
    var runner = Runner.create();
    Runner.run(runner, engine);

    World.add(world, Bodies.rectangle(400, 600, 900, 50, { 
        isStatic: true,
        render: {
            fillStyle: '#222',
            lineWidth: 1
        } 
    }));

    World.add(world,
        Bodies.circle(400, 40, 30, {
            render: {
                fillStyle: 'red'
            }
        })
    );
    World.add(world,
        Bodies.circle(480, 40, 30, {
            render: {
                fillStyle: 'blue'
            }
        })
    );

    // add mouse control
    var mouse = Mouse.create(render.canvas),
        mouseConstraint = MouseConstraint.create(engine, {
            mouse: mouse,
            constraint: {
                stiffness: 0.5,
                render: {
                    visible: false
                }
            }
        });

    World.add(world, mouseConstraint);
    // keep the mouse in sync with rendering
    render.mouse = mouse;
    nowDemoInstance = {
        engine: engine,
        runner: runner,
        render: render,
        canvas: render.canvas,
        stop: function() {
            Matter.Render.stop(render);
            Matter.Runner.stop(runner);
        }
    };
};


window.Example = Example;