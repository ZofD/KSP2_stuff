class Calculator {

    constructor(
    ) {
        this._environments = new EnvironmentStore();
        this._celestialBodies = new CelestialBodyStore(this._environments);
        this._engines = new EngineStore();
        this._rockets = new RocketStore();

        this._curentRocket = {};
    }

    printCelestialBodiesSelect() {
        return this.celestialBodies.getCelestialBodiesSelect();
    }

    printEnginesSelect(metchod = EngineStore.BOTH) {
        return this.engines.getEnginesSelect(metchod);
    }

    printEnvironmentBox(celestialBody) {
        return this.celestialBodies.getCelestialBody(celestialBody).environment.getEnvironmentBox();
    }

    printCelestialBodyDesc(celestialBody) {
        return this.celestialBodies.getCelestialBody(celestialBody).getCelestialBodyDesc();
    }

    printEngineDesc(engine) {
        return this.engines.getEngine(engine).getEngineDesc();
    }

    // do zmiany - ale najpierw trzeba ogarnąć rakiety
    doMatch(
        celestialBody,
        environment,
        engine,
        booster,
        requiredDelta = 1,
        cargoMass = 1,
        twr = 1,
        rocketName
    ) {
        const rocket = new Rocket( 
            rocketName,
            this.getEngine(engine), 
            this.getEngine(booster), 
            environment, 
            this.getCelestialBody(celestialBody), 
            requiredDelta, 
            cargoMass,
            twr
        );
        rocket.findOptimalEngineCount();
        return rocket.printResults();
    }

    // tu jeszcze można dodać metody np. getEngine(engine){return this._engines.getEngine(engine);}
    get celestialBodies() {
        return this._celestialBodies;
    }

    getCelestialBody(celestialBody) {
        return this.celestialBodies.getCelestialBody(celestialBody);
    }

    get engines() {
        return this._engines;
    }

    getEngine(engine) {
        return this.engines.getEngine(engine);
    }

    get environments() {
        return this._environments;
    }
    
    getEnvironment(environment) {
        return this.environments.getEnvironment(environment);
    }

    get rockets() {
        return this._rockets;
    }
    
    getRocket(rocket) {
        return this.rockets.getRocket(rocket);
    }

    get curentRocket() {
        return this._curentRocket;
    }

    set curentRocket(curentRocket) {
        if (!(curentRocket instanceof Rocket)) {
            throw new Error("curentRocket musi być instancją klasy Rocket!");
        }
        this._curentRocket = curentRocket;
    }
}