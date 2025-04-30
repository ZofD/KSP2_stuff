class EngineStore {
    static ONLY_ENGINES = 1;
    static ONLY_BOOSTERS = 2;
    static BOTH = 3;

    constructor() {
        this._engines = new Map();
        this.loadEnginesFromMock();
    }

    addEngine(engine) {
        if (engine instanceof Engine && !this.hasEngine(engine.name)) {
            this._engines.set(engine.name, engine);
        } else {
            throw new Error("Obiekt musi być instancją Engine");
        }
    }

    getEngine(engineName) {
        return this._engines.get(engineName) || null;
    }

    removeEngine(engineName) {
        return this._engines.delete(engineName);
    }

    hasEngine(engineName) {
        return this._engines.has(engineName);
    }

    getAllEngines() {
        return Array.from(this._engines.values());
    }
    
    loadEnginesFromMock() {
        engineMock.forEach(element => {
            if (element.fuel == 'Booster') {
                this.addEngine(Booster.fromObject(element));
            } else {
                this.addEngine(Engine.fromObject(element));
            }
        });
    }

    getEnginesByFuelIndex() {
        let engines = {};
        this.getAllEngines().forEach(engine => {
            if (!engines[engine.fuel]) {
                engines[engine.fuel] = {};
            }
            engines[engine.fuel][engine.name] = engine;
        });
        return engines;
    }

    getEnginesSelect(metchod = EngineStore.BOTH) {
        let skip = [];
        if (metchod == EngineStore.ONLY_ENGINES) {
            skip = ['Booster'];
        } else if (metchod == EngineStore.ONLY_BOOSTERS) {
            skip = ['Nuclear','Xenon','Monopropellant','Metaloks'];
        }
        
        let output = '<option></option>';
        Object.entries(this.getEnginesByFuelIndex()).forEach(([fuel, engines]) => {
            if (skip.includes(fuel)) {
                return;
            }
            output += '<optgroup label="'+fuel+'">';
            Object.entries(engines).forEach(([name, engine]) => {
                output += '<option value="'+name+'" data-image="img/engines/'+engine.fuel+'/'+engine.image+'">'+name+'</option>';
            });
            output += '</optgroup>';
        });
        return output;
    }
}