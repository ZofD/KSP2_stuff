class CelestialBodyStore {
    constructor(environmentStore) {
        this._celestialBodies = new Map();
        this.loadCelestialBodiesFromMock(environmentStore);
    }

    addCelestialBody(celestialBody) {
        if (celestialBody instanceof CelestialBody && !this.hasCelestialBody(celestialBody.name)) {
            this._celestialBodies.set(celestialBody.name, celestialBody);
        } else {
            throw new Error("Obiekt musi być instancją CelestialBody");
        }
    }

    getCelestialBody(celestialBodyName) {
        return this._celestialBodies.get(celestialBodyName) || null;
    }

    removeBody(celestialBodyName) {
        return this._celestialBodies.delete(celestialBodyName);
    }

    hasCelestialBody(celestialBodyName) {
        return this._celestialBodies.has(celestialBodyName);
    }

    getAllCelestialBodies() {
        return Array.from(this._celestialBodies.values());
    }

    loadCelestialBodiesFromMock(environmentStore) {
        celestialBodyMock.forEach(element => {
            this.addCelestialBody(CelestialBody.fromObject(element, environmentStore));
        });
    }

    getCelestialBodiesSelect() {
        let output = '<option></option>';
        this.getAllCelestialBodies().forEach(celestialBody => {
            output += '<option value="'+celestialBody.name+'" data-image="img/celestial_bodies/'+celestialBody.image+'">'+celestialBody.name+'</option>';
        });
        return output;
    }
}