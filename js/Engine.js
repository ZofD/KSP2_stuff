class Engine {
    constructor(
        name,
        image,
        trustAtmo,
        trustVacu,
        ispAtmo,
        ispVacu,
        weight,
        size,
        fuel
    ) {
        this.name = name;
        this.image = image;
        this.trustAtmo = trustAtmo;
        this.trustVacu = trustVacu;
        this.ispAtmo = ispAtmo;
        this.ispVacu = ispVacu;
        this.weight = weight;
        this.size = size;
        this.fuel = fuel;
    }

    static fromObject(engine) { 
        return new Engine(
            engine.name, 
            engine.image, 
            engine.trustAtmo, 
            engine.trustVacu, 
            engine.ispAtmo,
            engine.ispVacu,
            engine.weight,
            engine.size,
            engine.fuel
        );
    }

    calculateMassProportion(celestialBody, environment, requiredDelta) {
        if (!(celestialBody instanceof CelestialBody) && celestialBody.environment.checkEnvironment(environment)) {
            throw new Error("celestialBody musi być typu CelestialBody i environment musi być ośrodkiem prawidłowym dla celestialBody");
        }
        let temp = "isp"+environment;
        return Math.E**(requiredDelta/(this[temp]*9.81/* celestialBody.surfaceGravity */));
    }

    countEngines(trust, environment) {
        let temp = "trust"+environment;
        return Math.ceil(trust / this[temp]);
    }

    getTrustForEnvironment(environment) {
        let temp = "trust"+environment;
        return this[temp];
    }

    getEngineDesc() {
        let output = '<pre>{'+"\r\n";
        Object.entries(this).forEach(([key, value]) => {
            output += key+': '+value+"\r\n";
        });
        output += '}</pre>';
        return output;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        if (typeof name !== "string" || name.trim() === "") {
            throw new Error("name musi być niepustym stringiem!");
        }
        this._name = name;
    }

    get image() {
        return this._image;
    }

    set image(image) {
        if (typeof image !== "string" || image.trim() === "") {
            throw new Error("image musi być niepustym stringiem!");
        }
        this._image = image;
    }

    get trustAtmo() {
        return this._trustAtmo;
    }

    set trustAtmo(trustAtmo) {
        if (typeof trustAtmo !== "number" || trustAtmo < 0) {
            throw new Error("trustAtmo musi być liczbą nieujemną!");
        }
        this._trustAtmo = trustAtmo;
    }

    get trustVacu() {
        return this._trustVacu;
    }

    set trustVacu(trustVacu) {
        if (typeof trustVacu !== "number" || trustVacu < 0) {
            throw new Error("trustVacu musi być liczbą nieujemną!");
        }
        this._trustVacu = trustVacu;
    }

    get ispAtmo() {
        return this._ispAtmo;
    }

    set ispAtmo(ispAtmo) {
        if (typeof ispAtmo !== "number" || ispAtmo <= 0) {
            throw new Error("ispAtmo musi być liczbą większą od 0!");
        }
        this._ispAtmo = ispAtmo;
    }

    get ispVacu() {
        return this._ispVacu;
    }

    set ispVacu(ispVacu) {
        if (typeof ispVacu !== "number" || ispVacu <= 0) {
            throw new Error("ispVacu musi być liczbą większą od 0!");
        }
        this._ispVacu = ispVacu;
    }

    get weight() {
        return this._weight;
    }

    set weight(weight) {
        if (typeof weight !== "number" || weight <= 0) {
            throw new Error("weight musi być liczbą większą od 0!");
        }
        this._weight = weight;
    }

    get size() {
        return this._size;
    }

    set size(size) {
        if (typeof size !== "string" || size.trim() === "") {
            throw new Error("size musi być niepustym stringiem!");
        }
        this._size = size;
    }

    get fuel() {
        return this._fuel;
    }

    set fuel(fuel) {
        if (typeof fuel !== "string" || fuel.trim() === "") {
            throw new Error("fuel musi być niepustym stringiem!");
        }
        this._fuel = fuel;
    }
}