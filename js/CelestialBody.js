class CelestialBody {
    constructor(
        name,
        environment,
        surfaceGravity,
        image,
        decription
    ) {
        this.name = name;    
        this.environment = environment;
        this.surfaceGravity = surfaceGravity;
        this.image = image;
        this.decription = decription;
    }

    static fromObject(celestialBody, environmentStore) {
        return new CelestialBody(
            celestialBody.name, 
            environmentStore.getEnvironment(celestialBody.environment),
            celestialBody.surfaceGravity, 
            celestialBody.image, 
            celestialBody.decription
        );
    }

    getCelestialBodyDesc() {
        return '<img src="img/celestial_bodies/'+this.image+'">'+this.decription;
    }

    get name() {
        return this._name;
    }

    set name(name) {
        if (typeof name !== "string" || name.trim() === "") {
            throw new Error("Nazwa ciała niebieskiego musi być niepustym stringiem!");
        }
        this._name = name;
    }

    // Getter i Setter dla environment
    get environment() {
        return this._environment;
    }

    set environment(environment) {
        if (!(environment instanceof Environment)) {
            throw new Error("Środowisko musi być instancją klast Environment");
        }
        this._environment = environment;
    }

    // Getter i Setter dla surfaceGravity
    get surfaceGravity() {
        return this._surfaceGravity;
    }

    set surfaceGravity(surfaceGravity) {
        if (typeof surfaceGravity !== "number" || surfaceGravity < 0) {
            throw new Error("Grawitacja powierzchniowa musi być liczbą naturalną!");
        }
        this._surfaceGravity = surfaceGravity;
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

    get decription() {
        return this._decription;
    }

    set decription(decription) {
        if (typeof decription !== "string" || decription == "") {
            throw new Error("Opis musi byś niepustym stringiem!");
        }
        this._decription = decription;
    }
}