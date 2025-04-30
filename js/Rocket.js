class Rocket {
    static ENGINE_MAX_COUUNT = 6;
    static BOOSTER_MAX_COUUNT = 6;

    constructor(
        name,
        engine,
        booster,
        environment,
        celestialBody,
        requiredDelta = 1,
        cargoMass = 1,
        twr = 1
    ) {
        this.name = name;
        this.engine = engine;
        if (booster) {
            this.booster = booster;
        } else {
            this.booster = null;
        }
        this.booster = booster;
        this.cargoMass = cargoMass;
        this.environment = environment;
        this.celestialBody = celestialBody;
        this.requiredDelta = requiredDelta;
        this.twr = twr;

        this.engineCount = 1;
        this.boosterCount = 0;
        this.extraMassGrowth = 0.11;
        this.dryMass = 0;
        this.wetMass = 0;
        this.fuelMass = 0;
        this.trust = 0;
    }

    findOptimalEngineCount() {
        while ( this.engineCount <= Rocket.ENGINE_MAX_COUUNT && !this.calculateMass(this.engineCount, this.boosterCount)) {
            console.log({
                "engineCount": this.engineCount,
                "boosterCount": this.boosterCount,
                "boosterMaxCount": Rocket.BOOSTER_MAX_COUUNT
            });
            if (this.booster) {
                if (this.boosterCount < Rocket.BOOSTER_MAX_COUUNT) {
                    this.increaseBoosterCount();
                } else {
                    this.increaseEngineCount();
                    this.boosterCount = 0;
                }
            } else {
                this.increaseEngineCount();
            }
        }
    }

    increaseEngineCount() {
        this.engineCount++;
        if (this.engineCount > Rocket.ENGINE_MAX_COUUNT) {
            throw new Error("Nie można zwiększyć liczby silników powyżej maksymalnej wartości!");
        }
    }

    increaseBoosterCount() {
        if (this.boosterCount < Rocket.BOOSTER_MAX_COUUNT) {
            this.boosterCount++;
        } else {
            throw new Error("Nie można zwiększyć liczby boosterów powyżej maksymalnej wartości!");
        }
    }

    calculateCurentTrust(engineCount, boosterCount) {
        return engineCount * this.engine.getTrustForEnvironment(this.environment) + boosterCount * this.booster.getTrustForEnvironment(this.environment, this.celestialBody);
    }

    // jakoś jeszcze trzeba przewidzieć masę silników
    calculateMass(engineCount, boosterCount) {
        let massProportion = this.engine.calculateMassProportion(this.celestialBody, this.environment, this.requiredDelta);
        let extraMass = 0;
        let oldExtraMass = extraMass;

        do {
            this.dryMass = this.cargoMass + extraMass;
            this.wetMass = this.dryMass * massProportion; //fuelMass is calculating "automaticly"
            oldExtraMass = extraMass;
            this.calculateRequiredTrust();
            if (this.trust > this.calculateCurentTrust(engineCount, boosterCount)) {
                return false; // curent trust is too low
            }
            extraMass = this.fuelMass * this._extraMassGrowth + this.engine.countEngines(this.trust, this.environment) * this.engine.weight;
            if (extraMass == Infinity) {
                return false; 
                // throw new Error("Daleko na tym nie zalecisz");
            }
            
            console.log({
                "massProportion": massProportion,
                "dryMass": this.dryMass,
                "wetMass": this.wetMass,
                "fuelMass": this.fuelMass,
                "trust": this.trust,
                "engines count": this.engine.countEngines(this.trust, this.environment),
                "extraMass": extraMass,
                "oldExtraMass": oldExtraMass,
                "extraMass - oldExtraMass": (extraMass-oldExtraMass),
            });
        } while ( extraMass - oldExtraMass > 50 );

        return true;
    }

    calculateRequiredTrust() {
        this.trust = (this.twr * this.wetMass * this.celestialBody.surfaceGravity)/1000; //w kN
    }

    printResults() {
        let output = '<tr>';
        output += '<th>'+this.name+'</th>';
        output += '<td>'+Math.round(this.wetMass).toLocaleString("pl-PL")+' kg</td>';
        output += '<td>'+Math.round(this.fuelMass).toLocaleString("pl-PL")+' kg</td>';
        output += '<td>'+Math.round(this.dryMass).toLocaleString("pl-PL")+' kg</td>';
        // output += '<td>'+this.trust.toFixed(1)+' kN</td>';
        output += '<td>'+this.engine.name+'</td>';
        output += '<td>'+this.engineCount+'</td>';
        output += '<td>'+this.booster.name+'</td>';
        output += '<td>'+this.boosterCount+'</td>';
        output += '<td>'+this.environment+'</td>';
        output += '</tr>';
        return output;
    }
    
    get name() {
        return this._name;
    }

    set name( name ) {
        if (typeof name !== "string" && name !== "") {
            throw new Error("name musi być niepustym ciągiem znaków!");
        }
        this._name = name;
    }

    get engine() {
        return this._engine;
    }

    set engine( engine ) {
        if (!(engine instanceof Engine)) {
            throw new Error("engine musi być instancją klasy Engine!");
        }
        this._engine = engine;
    }

    get booster() {
        return this._booster;
    }

    set booster( booster ) {
        if (!(booster instanceof Engine)) {
            throw new Error("booster musi być instancją klasy Engine!");
        }
        this._booster = booster;
    }

    get cargoMass() {
        return this._cargoMass;
    }

    set cargoMass( cargoMass ) {
        if (typeof cargoMass !== "number" || cargoMass < 0) {
            throw new Error("cargoMass musi być liczbą nieujemną!");
        }
        this._cargoMass = cargoMass;
    }

    get dryMass() {
        return this._dryMass;
    }

    set dryMass(dryMass) {
        if (typeof dryMass !== "number" || dryMass < 0) {
            throw new Error("dryMass musi być liczbą nieujemną!");
        }
        this._dryMass = dryMass;
    }

    get wetMass() {
        return this._wetMass;
    }

    set wetMass(wetMass) {
        if (typeof wetMass !== "number" || wetMass < this._dryMass) {
            throw new Error("wetMass musi być liczbą większą lub równą dryMass!");
        }
        this._wetMass = wetMass;
        this._fuelMass = this._wetMass - this._dryMass; // Automatyczna aktualizacja fuelMass
    }

    get fuelMass() {
        return this._fuelMass;
    }

    set fuelMass(fuelMass) {
        if (typeof fuelMass !== "number" || fuelMass < 0 || fuelMass > this._wetMass - this._dryMass) {
            throw new Error("fuelMass musi być między 0 a różnicą wetMass - dryMass!");
        }
        this._fuelMass = fuelMass;
        this._wetMass = this._dryMass + this._fuelMass; // Automatyczna aktualizacja wetMass
    }

    get environment() {
        return this._environment;
    }

    set environment(environment) {
        if (typeof environment !== "string" && environment !== "") {
            throw new Error("environment musi być nie pustym stringiem");
        }
        this._environment = environment;
    }

    get celestialBody() {
        return this._celestialBody;
    }

    set celestialBody(celestialBody) {
        if (!(celestialBody instanceof CelestialBody)) {
            throw new Error("celestialBody musi być instancją CelestialBody");
        }
        this._celestialBody = celestialBody;
    }

    get requiredDelta() {
        return this._requiredDelta;
    }

    set requiredDelta(requiredDelta) {
        if (typeof requiredDelta !== "number" && requiredDelta > 0) {
            throw new Error("requiredDelta musi być liczbą większą lub równą 0");
        }
        this._requiredDelta = requiredDelta;
    }

    get twr() {
        return this._twr;
    }

    set twr(twr) {
        if (typeof twr !== "number" && twr > 0) {
            throw new Error("twr musi być liczbą większą lub równą 0");
        }
        this._twr = twr;
    }

    get extraMassGrowth() {
        return this._extraMassGrowth;
    }

    set extraMassGrowth(extraMassGrowth) {
        if (typeof extraMassGrowth !== "number" && extraMassGrowth > 0) {
            throw new Error("extraMassGrowth musi być liczbą większą 0");
        }
        this._extraMassGrowth = extraMassGrowth;
    }

    get trust() {
        return this._trust;
    }

    set trust(trust) {
        if (typeof trust !== "number" && trust > 0) {
            throw new Error("trust musi być liczbą większą 0");
        }
        this._trust = trust;
    }
    get engineCount() {
        return this._engineCount;
    }

    set engineCount(engineCount) {
        if (typeof engineCount !== "number" || engineCount < 1 || engineCount > Rocket.ENGINE_MAX_COUUNT) {
            throw new Error(`engineCount musi być liczbą między 1 a ${Rocket.ENGINE_MAX_COUUNT}!`);
        }
        this._engineCount = engineCount;
    }

    get boosterCount() {
        return this._boosterCount;
    }

    set boosterCount(boosterCount) {
        if (typeof boosterCount !== "number" || boosterCount < 0 || boosterCount > Rocket.BOOSTER_MAX_COUUNT) {
            throw new Error(`boosterCount musi być liczbą między 0 a ${Rocket.BOOSTER_MAX_COUUNT}!`);
        }
        this._boosterCount = boosterCount;
    }
}